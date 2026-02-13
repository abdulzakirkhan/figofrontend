import React, { useMemo, useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

import {
  useGetRolesQuery,
  useGetModulesTreeQuery,
  useGetRolePermissionsQuery,
  useUpdateRolePermissionsMutation,
} from "../redux/rbac/rbacApi"; // adjust path




const UI_ACTIONS = [
  { label: "Create", key: "create" },
  { label: "View", key: "view" },
  { label: "Edit", key: "update" }, // Edit uses update in backend
  { label: "Delete", key: "delete" },
];

const AssignPermissionTab = () => {
  const { data: rolesRes, isLoading: rolesLoading } = useGetRolesQuery();
  const { data: modulesRes, isLoading: modulesLoading } = useGetModulesTreeQuery();

  const roles = rolesRes?.data || [];
  const tree = modulesRes?.data || [];

  const [selectedRoleId, setSelectedRoleId] = useState("");

  // set default role
  useEffect(() => {
    if (!selectedRoleId && roles?.length) setSelectedRoleId(roles[0]._id);
  }, [roles, selectedRoleId]);

  const { data: permsRes, isLoading: permsLoading } = useGetRolePermissionsQuery(
    selectedRoleId,
    { skip: !selectedRoleId }
  );

  const [updatePerms, { isLoading: saving }] = useUpdateRolePermissionsMutation();

  // expanded nodes
  const [expanded, setExpanded] = useState(new Set());

  // local permission state: Map<moduleKey, Set(actions)>
  const [permMap, setPermMap] = useState(new Map());

  // build quick maps: nodeMap, parentMap, childrenMap
  const { nodeMap, parentMap, childrenMap } = useMemo(() => {
    const nodeMap = new Map();
    const parentMap = new Map();
    const childrenMap = new Map();

    const walk = (nodes, parent = null) => {
      for (const n of nodes) {
        nodeMap.set(n.key, n);
        parentMap.set(n.key, parent);
        childrenMap.set(n.key, (n.children || []).map((c) => c.key));
        if (n.children?.length) walk(n.children, n.key);
      }
    };
    walk(tree);

    return { nodeMap, parentMap, childrenMap };
  }, [tree]);

  // load role permissions into permMap
  useEffect(() => {
    const list = permsRes?.permissions || [];
    const m = new Map();
    for (const p of list) {
      if (!p.moduleKey) continue;
      m.set(p.moduleKey, new Set(p.actions || []));
    }
    setPermMap(m);

    // auto expand first level for better UX
    if (tree?.length) {
      setExpanded(new Set([tree[0].key]));
    }
  }, [permsRes, tree]);

  const getDescendants = (key) => {
    const result = [];
    const stack = [...(childrenMap.get(key) || [])];
    while (stack.length) {
      const k = stack.pop();
      result.push(k);
      const kids = childrenMap.get(k) || [];
      stack.push(...kids);
    }
    return result;
  };

  const getAncestors = (key) => {
    const res = [];
    let cur = parentMap.get(key);
    while (cur) {
      res.push(cur);
      cur = parentMap.get(cur);
    }
    return res;
  };

  const hasAnyPermission = (key, map) => {
    const s = map.get(key);
    return s && s.size > 0;
  };

  // ✅ checkbox checked state
  const isChecked = (key, action) => {
    return permMap.get(key)?.has(action) || false;
  };

  // ✅ indeterminate logic for a given node/action
  const isIndeterminate = (key, action) => {
    const kids = childrenMap.get(key) || [];
    if (!kids.length) return false;

    let any = false;
    let all = true;

    for (const c of kids) {
      const checked = permMap.get(c)?.has(action) || false;
      const ind = isIndeterminate(c, action);
      if (checked || ind) any = true;
      if (!checked || ind) all = false;
    }

    return any && !all;
  };

  const toggleExpand = (key) => {
    setExpanded((prev) => {
      const n = new Set(prev);
      if (n.has(key)) n.delete(key);
      else n.add(key);
      return n;
    });
  };

  // ✅ MAIN TOGGLE: cascades down & updates parents
  const toggleAction = (key, action, checked) => {
    setPermMap((prev) => {
      const map = new Map(prev);

      const setAction = (k, a, val) => {
        const set = new Set(map.get(k) || []);
        if (val) set.add(a);
        else set.delete(a);

        // if any create/update/delete => ensure view also
        if (val && a !== "view") set.add("view");
        // if removing view => remove all actions (optional)
        if (!val && a === "view") {
          set.delete("create");
          set.delete("update");
          set.delete("delete");
        }

        if (set.size) map.set(k, set);
        else map.delete(k);
      };

      // 1) apply to self
      setAction(key, action, checked);

      // 2) apply to all descendants
      const desc = getDescendants(key);
      for (const d of desc) setAction(d, action, checked);

      // 3) ensure parents are selected when child selected (your requirement)
      const ancestors = getAncestors(key);

      for (const p of ancestors) {
        const kids = childrenMap.get(p) || [];

        // if ANY child has ANY permission => parent must have view
        const anyChildHasAny = kids.some((c) => hasAnyPermission(c, map));
        if (anyChildHasAny) setAction(p, "view", true);
        else setAction(p, "view", false);

        // if ALL children have this action checked => parent gets it, else remove it
        const allChildrenChecked = kids.length
          ? kids.every((c) => map.get(c)?.has(action))
          : false;

        if (allChildrenChecked) setAction(p, action, true);
        else setAction(p, action, false);
      }

      return map;
    });
  };

  const onSave = async () => {
    if (!selectedRoleId) return;

    const payload = Array.from(permMap.entries()).map(([moduleKey, set]) => ({
      moduleKey,
      actions: Array.from(set),
    }));

    await updatePerms({ roleId: selectedRoleId, permissions: payload }).unwrap();
    alert("Permissions updated ✅");
  };

  const loading = rolesLoading || modulesLoading || permsLoading;

  const renderNode = (node, depth = 0) => {
    const key = node.key;
    const kids = node.children || [];
    const expandedNow = expanded.has(key);

    return (
      <div key={key} className="border-b border-[#E0E5F2]">
        {/* Row */}
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-3" style={{ paddingLeft: depth * 18 }}>
            {kids.length > 0 ? (
              <button
                onClick={() => toggleExpand(key)}
                className="w-5 h-5 rounded-full bg-[#4318FF] flex items-center justify-center shrink-0 hover:bg-[#3311DD] transition-colors cursor-pointer"
              >
                <span className="text-white text-[14px] font-bold leading-none">
                  {expandedNow ? "−" : "+"}
                </span>
              </button>
            ) : (
              <div className="w-5 h-5" />
            )}
            <span className="text-[13px] text-[#2B3674]">{node.name}</span>
          </div>
        </div>

        {/* Permissions */}
        <div className="flex items-center gap-8 py-3 px-8 bg-[#F4F7FE]/30">
          {UI_ACTIONS.map((a, idx) => {
            const ind = isIndeterminate(key, a.key);

            return (
              <label key={`${key}-${idx}`} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isChecked(key, a.key)}
                  ref={(el) => {
                    if (el) el.indeterminate = ind;
                  }}
                  onChange={(e) => toggleAction(key, a.key, e.target.checked)}
                  className="w-4 h-4 accent-[#4318FF] cursor-pointer rounded"
                />
                <span className="text-[12px] text-[#2B3674]">{a.label}</span>
              </label>
            );
          })}
        </div>

        {/* Children */}
        {kids.length > 0 && expandedNow && (
          <div>
            {kids.map((c) => renderNode(c, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg p-6">
      {/* Roles Dropdown */}
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h3 className="text-[14px] font-semibold text-[#2B3674] mb-3">Roles</h3>

          <div className="relative max-w-xs">
            <select
              value={selectedRoleId}
              onChange={(e) => setSelectedRoleId(e.target.value)}
              className="appearance-none bg-white border border-[#E0E5F2] rounded-lg px-4 py-2.5 pr-10 text-[13px] text-[#2B3674] w-full focus:outline-none focus:ring-2 focus:ring-[#4318FF]/20 focus:border-[#4318FF] cursor-pointer"
            >
              {roles.map((r) => (
                <option key={r._id} value={r._id}>
                  {r.name}
                </option>
              ))}
            </select>
            <ChevronDown
              className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#A3AED0]"
              size={16}
            />
          </div>
        </div>

        <button
          disabled={saving || loading}
          onClick={onSave}
          className="bg-[#4318FF] text-white px-4 py-2 rounded-lg text-[13px] hover:bg-[#3311DD] disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      {/* Modules Section */}
      <div>
        <h3 className="text-[14px] font-semibold text-[#2B3674] mb-4">Modules</h3>

        {loading ? (
          <div className="text-[13px] text-[#2B3674]">Loading modules...</div>
        ) : (
          <div className="space-y-0">
            {tree.map((node) => renderNode(node, 0))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AssignPermissionTab;
