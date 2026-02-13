import React, { useMemo, useState } from "react";
import { ChevronDown, Eye, Pencil, Trash2 } from "lucide-react";

import TableMui from "../components/TableMui";
import UserNameCell from "../components/UserNameCell";
import AddUserModal from "../models/AddUserModal";

import {
  useGetAdminUsersQuery,
  useAssignRoleToUserMutation,
  useDeleteAdminUserMutation,
} from "../redux/rbac/adminUsersApi";

import { useGetRolesDropdownQuery } from "../redux/rbac/rolesApi";

const UserTab = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [openAddUserModal, setOpenAddUserModal] = useState(false);
  const [editUser, setEditUser] = useState(null);

  const { data: usersRes, isLoading } = useGetAdminUsersQuery();
  const { data: rolesRes, isLoading: rolesLoading, error: rolesError } = useGetRolesDropdownQuery();

  const [assignRole] = useAssignRoleToUserMutation();
  const [deleteUser] = useDeleteAdminUserMutation();

  const users = usersRes?.data || [];
  const roles = rolesRes?.data || [];

  const handleCheckboxChange = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const tableHeaders = {
    checkbox: "",
    sl: "SL",
    userName: "User Name",
    designation: "Designation",
    createdDate: "Created Date",
    roles: "Roles",
    status: "Status",
    action: "Action",
  };

  const customFields = useMemo(
    () => [
      {
        name: "checkbox",
        data: (_, row) => (
          <input
            type="checkbox"
            checked={selectedRows.includes(row._id)}
            onChange={() => handleCheckboxChange(row._id)}
            className="w-4 h-4 accent-[#4318FF] cursor-pointer"
          />
        ),
      },

      {
        name: "sl",
        data: (_, row) => {
          const idx = users.findIndex((u) => u._id === row._id);
          const sl = String(idx + 1).padStart(2, "0");
          return <span className="text-[12px] font-medium text-[#2B3674]">{sl}</span>;
        },
      },

      {
        name: "userName",
        data: (_, row) => <UserNameCell name={row.name} />,
      },

      {
        name: "designation",
        data: (_, row) => (
          <span className="text-[12px] text-[#2B3674]">
            {row.designation || "—"}
          </span>
        ),
      },

      {
        name: "createdDate",
        data: (_, row) => (
          <span className="text-[12px] text-[#2B3674]">
            {row.createdAt ? new Date(row.createdAt).toLocaleDateString() : "—"}
          </span>
        ),
      },

      {
        name: "roles",
        data: (_, row) =>
          row.role ? (
            <span className="inline-block px-3 py-1 rounded-md text-[11px] font-bold bg-[#05CD99]/10 text-[#05CD99]">
              {row.role.name}
            </span>
          ) : null,
      },

      {
        name: "status",
        data: (_, row) => {
          // lock admin role
          if (row.role?.key === "admin") {
            return (
              <span className="text-[11px] text-[#A3AED0]">
                Admin role can not be changed
              </span>
            );
          }

          return (
            <div className="relative">
              <select
                disabled={rolesLoading || !!rolesError}
                value={row.role?._id || ""}
                onChange={(e) =>
                  assignRole({ userId: row._id, roleId: e.target.value })
                }
                className="appearance-none bg-white border border-[#4318FF] text-[#4318FF] text-[11px] font-bold px-3 py-1.5 pr-8 rounded-md cursor-pointer focus:outline-none"
              >
                <option value="">Assign role</option>
                {roles.map((r) => (
                  <option key={r._id} value={r._id}>
                    {r.name}
                  </option>
                ))}
              </select>

              <ChevronDown
                className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-[#4318FF]"
                size={14}
              />
            </div>
          );
        },
      },

      {
        name: "action",
        data: (_, row) => (
          <div className="flex items-center gap-2">
            <button className="w-6 h-6 rounded-full bg-[#85C1E2]/20 flex items-center justify-center hover:bg-[#85C1E2]/30 transition-colors">
              <Eye size={13} className="text-[#85C1E2]" />
            </button>

            <button
              onClick={() => {
                setEditUser(row);
                setOpenAddUserModal(true);
              }}
              className="w-6 h-6 rounded-full bg-[#22C55E]/20 flex items-center justify-center hover:bg-[#22C55E]/30 transition-colors"
            >
              <Pencil size={13} className="text-[#22C55E]" />
            </button>

            <button
              onClick={async () => {
                if (!window.confirm("Delete this user?")) return;
                await deleteUser(row._id).unwrap();
              }}
              className="w-6 h-6 rounded-full bg-[#EF4444]/20 flex items-center justify-center hover:bg-[#EF4444]/30 transition-colors"
            >
              <Trash2 size={13} className="text-[#EF4444]" />
            </button>
          </div>
        ),
      },
    ],
    [selectedRows, users, roles, assignRole, deleteUser, rolesLoading, rolesError]
  );

  return (
    <div className="bg-white rounded-lg">
      {/* Header */}
      <div className="flex justify-between items-center px-5 py-4 border-b border-[#E0E5F2]">
        <div className="flex items-center gap-2">
          <span className="text-[13px] text-[#2B3674] font-medium">Show</span>
          <select className="border border-[#E0E5F2] rounded-lg px-2 py-1 text-[12px] text-[#2B3674] focus:outline-none cursor-pointer">
            <option>10</option>
          </select>

          <div className="ml-4 relative">
            <input
              type="text"
              placeholder="Search"
              className="border border-[#E0E5F2] rounded-lg pl-3 pr-8 py-1.5 text-[12px] text-[#2B3674] placeholder:text-[#A3AED0] focus:outline-none focus:ring-1 focus:ring-[#4318FF]/20 w-64"
            />
          </div>
        </div>

        <button
          onClick={() => {
            setEditUser(null);
            setOpenAddUserModal(true);
          }}
          className="bg-[#4318FF] text-white px-4 py-2 rounded-lg text-[12px] font-bold flex items-center gap-2 hover:bg-[#3311DD] transition-colors"
        >
          <span className="text-[16px]">+</span>
          Add New User
        </button>
      </div>

      <TableMui
        th={tableHeaders}
        td={users}
        customFields={customFields}
        loading={isLoading}
        styleTableContainer={{ background: "white", padding: "0", borderRadius: "0" }}
      />

      <AddUserModal
        open={openAddUserModal}
        onClose={() => {
          setEditUser(null);
          setOpenAddUserModal(false);
        }}
        editUser={editUser}
      />
    </div>
  );
};

export default UserTab;
