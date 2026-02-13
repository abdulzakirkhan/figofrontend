import React, { useMemo, useState } from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";

import TableMui from "../components/TableMui";
import AddRoleModal from "../models/AddRoleModal";

import {
  useGetRolesListQuery,
  useDeleteRoleMutation,
} from "../redux/rbac/rolesApi";

const RolesTab = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [openAddRoleModal, setOpenAddRoleModal] = useState(false);
  const [editRole, setEditRole] = useState(null);

  // table controls
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");

  const { data, isLoading } = useGetRolesListQuery({
    page,
    limit,
    search,
  });

  const [deleteRole] = useDeleteRoleMutation();

  const roles = data?.data || [];
  const meta = data?.meta || { pages: 1 };

  /* ===============================
     Selection
  =============================== */
  const handleCheckboxChange = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  /* ===============================
     Table Headers
  =============================== */
  const tableHeaders = {
    checkbox: "",
    sl: "S.L",
    roleName: "Role Name",
    action: "Action",
  };

  /* ===============================
     Table Fields
  =============================== */
  const customFields = useMemo(
    () => [
      {
        name: "checkbox",
        data: (_, row) => (
          <input
            type="checkbox"
            checked={selectedRows.includes(row._id)}
            onChange={() => handleCheckboxChange(row._id)}
            className="w-4 h-4 accent-[#4318FF] cursor-pointer rounded"
          />
        ),
      },
     {
  name: "sl",
  data: (_, row) => {
    const index = roles.findIndex((r) => r._id === row._id);
    const sl = String((page - 1) * limit + index + 1).padStart(2, "0");
    return <span className="text-[13px] text-[#2B3674]">{sl}</span>;
  },
},

      {
        name: "roleName",
        data: (_, row) => (
          <span className="text-[13px] text-[#2B3674]">{row.name}</span>
        ),
      },
      {
        name: "action",
        data: (_, row) => (
          <div className="flex items-center gap-2">
            {/* View (optional) */}
            <button className="w-6 h-6 rounded-full bg-[#85C1E2]/20 flex items-center justify-center hover:bg-[#85C1E2]/30">
              <Eye size={13} className="text-[#85C1E2]" />
            </button>

            {/* Edit */}
            <button
              onClick={() => {
                setEditRole(row);
                setOpenAddRoleModal(true);
              }}
              className="w-6 h-6 rounded-full bg-[#22C55E]/20 flex items-center justify-center hover:bg-[#22C55E]/30"
            >
              <Pencil size={13} className="text-[#22C55E]" />
            </button>

            {/* Delete */}
            <button
              onClick={async () => {
                if (!window.confirm("Delete this role?")) return;
                await deleteRole(row._id).unwrap();
              }}
              className="w-6 h-6 rounded-full bg-[#EF4444]/20 flex items-center justify-center hover:bg-[#EF4444]/30"
            >
              <Trash2 size={13} className="text-[#EF4444]" />
            </button>
          </div>
        ),
      },
    ],
    [selectedRows, page, limit, deleteRole]
  );

  return (
    <div className="bg-white rounded-lg">
      {/* Header */}
      <div className="flex justify-between items-center px-5 py-3.5 border-b border-[#E0E5F2]">
        <div className="flex items-center gap-3">
          <span className="text-[13px] text-[#2B3674] font-medium">Show</span>

          <select
            value={limit}
            onChange={(e) => {
              setLimit(Number(e.target.value));
              setPage(1);
            }}
            className="border border-[#E0E5F2] rounded-lg px-3 py-1.5 text-[12px] bg-white"
          >
            {[10, 25, 50, 100].map((n) => (
              <option key={n}>{n}</option>
            ))}
          </select>

          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search"
            className="border border-[#E0E5F2] rounded-lg pl-3 py-1.5 text-[12px] w-56"
          />
        </div>

        <button
          onClick={() => {
            setEditRole(null);
            setOpenAddRoleModal(true);
          }}
          className="bg-[#4318FF] text-white px-5 py-2 rounded-lg text-[13px] font-bold flex items-center gap-2 hover:bg-[#3311DD]"
        >
          <span className="text-[18px] leading-none">+</span>
          Add Role
        </button>
      </div>

      {/* Table */}
      <TableMui
        th={tableHeaders}
        td={roles}
        customFields={customFields}
        loading={isLoading}
      />

      {/* Pagination */}
      <div className="flex justify-end gap-2 px-5 py-3 border-t">
        <button
          disabled={page <= 1}
          onClick={() => setPage(page - 1)}
          className="px-3 py-1 border rounded text-[12px]"
        >
          Prev
        </button>

        <span className="text-[12px]">
          Page {page} of {meta.pages}
        </span>

        <button
          disabled={page >= meta.pages}
          onClick={() => setPage(page + 1)}
          className="px-3 py-1 border rounded text-[12px]"
        >
          Next
        </button>
      </div>

      {/* Add / Edit Modal */}
      <AddRoleModal
        open={openAddRoleModal}
        editRole={editRole}
        onClose={() => {
          setEditRole(null);
          setOpenAddRoleModal(false);
        }}
      />
    </div>
  );
};

export default RolesTab;
