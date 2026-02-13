import React, { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@mui/material";
import { X } from "lucide-react";

import {
  useCreateModuleMutation,
  useUpdateModuleMutation,
  useGetModulesQuery,
} from "../redux/rbac/modulesApi";

const makeKeyFromName = (name = "") =>
  name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-_]/g, "")
    .replace(/\s+/g, "_");

const AddMenuModal = ({ open, onClose, editMenu }) => {
  const [hasParent, setHasParent] = useState("yes");
  const [menuName, setMenuName] = useState("");
  const [parentId, setParentId] = useState("");

  // Parents dropdown should show only top-level menus (parent = null)
  const { data: modulesRes } = useGetModulesQuery();
  const modules = modulesRes?.data || [];
  const parentOptions = modules.filter((m) => !m.parent);

  const [createModule, { isLoading: creating }] = useCreateModuleMutation();
  const [updateModule, { isLoading: updating }] = useUpdateModuleMutation();

  // Prefill when editing
  useEffect(() => {
    if (editMenu) {
      setMenuName(editMenu?.name || "");
      if (editMenu?.parent?._id || editMenu?.parent) {
        setHasParent("yes");
        setParentId(editMenu?.parent?._id || editMenu?.parent || "");
      } else {
        setHasParent("no");
        setParentId("");
      }
    } else {
      setMenuName("");
      setHasParent("yes");
      setParentId("");
    }
  }, [editMenu, open]);

  const handleSave = async () => {
    const name = menuName.trim();
    if (!name) return alert("Menu name is required");

    // If hasParent=yes, parentId must exist
    if (hasParent === "yes" && !parentId) {
      return alert("Please select parent");
    }

    const payload = {
      name,
      key: makeKeyFromName(name),
      parent: hasParent === "yes" ? parentId : null,
    };

    try {
      if (editMenu?._id) {
        await updateModule({ id: editMenu._id, body: payload }).unwrap();
      } else {
        await createModule(payload).unwrap();
      }
      onClose();
    } catch (e) {
      alert(e?.data?.message || "Something went wrong");
    }
  };

  const isBusy = creating || updating;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "16px",
          padding: "0",
          maxWidth: "450px",
        },
      }}
    >
      <DialogContent sx={{ padding: 0 }}>
        <div className="bg-white rounded-2xl">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 bg-[#4318FF] rounded-t-2xl">
            <h2 className="text-[18px] font-bold text-white">
              {editMenu ? "Edit Menu" : "Add New Menu"}
            </h2>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Form */}
          <div className="px-6 py-6 space-y-5">
            {/* Menu Name */}
            <div>
              <label className="block text-[13px] font-medium text-[#2B3674] mb-2">
                Menu Name
              </label>
              <input
                type="text"
                value={menuName}
                onChange={(e) => setMenuName(e.target.value)}
                placeholder="Enter Menu Name"
                className="w-full border border-[#E0E5F2] rounded-lg px-4 py-2.5 text-[13px] text-[#2B3674] placeholder:text-[#A3AED0] focus:outline-none focus:ring-2 focus:ring-[#4318FF]/20 focus:border-[#4318FF]"
              />
            </div>

            {/* Have Parent */}
            <div>
              <label className="block text-[13px] font-medium text-[#2B3674] mb-3">
                Have Parent
              </label>
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="hasParent"
                    value="yes"
                    checked={hasParent === "yes"}
                    onChange={(e) => setHasParent(e.target.value)}
                    className="w-4 h-4 accent-[#4318FF] cursor-pointer"
                  />
                  <span className="text-[13px] text-[#2B3674]">Yes</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="hasParent"
                    value="no"
                    checked={hasParent === "no"}
                    onChange={(e) => setHasParent(e.target.value)}
                    className="w-4 h-4 accent-[#4318FF] cursor-pointer"
                  />
                  <span className="text-[13px] text-[#2B3674]">No</span>
                </label>
              </div>
            </div>

            {/* Select Parent */}
            <div>
              <label className="block text-[13px] font-medium text-[#2B3674] mb-2">
                Select Parent
              </label>

              <select
                disabled={hasParent === "no"}
                value={hasParent === "no" ? "" : parentId}
                onChange={(e) => setParentId(e.target.value)}
                className="w-full border border-[#E0E5F2] rounded-lg px-4 py-2.5 text-[13px] text-[#A3AED0] focus:outline-none focus:ring-2 focus:ring-[#4318FF]/20 focus:border-[#4318FF] cursor-pointer appearance-none bg-white disabled:opacity-50"
              >
                <option value="">Select Parent</option>
                {parentOptions.map((p) => (
                  <option key={p._id} value={p._id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-4">
              <button
                onClick={onClose}
                disabled={isBusy}
                className="px-6 py-2.5 border border-[#E0E5F2] text-[#FF6B6B] text-[13px] font-bold rounded-lg hover:bg-[#FF6B6B]/5 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isBusy}
                className="px-6 py-2.5 bg-[#4318FF] text-white text-[13px] font-bold rounded-lg hover:bg-[#3311DD] transition-colors disabled:opacity-50"
              >
                {isBusy ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddMenuModal;
