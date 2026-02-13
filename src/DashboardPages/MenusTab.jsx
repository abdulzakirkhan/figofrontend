import React, { useMemo, useState } from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import TableMui from "../components/TableMui";
import UserNameCell from "../components/UserNameCell";
import AddMenuModal from "../models/AddMenuModal";

import {
  useGetModulesQuery,
  useDeleteModuleMutation,
} from "../redux/rbac/modulesApi";

const MenusTab = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [openAddMenuModal, setOpenAddMenuModal] = useState(false);
  const [editMenu, setEditMenu] = useState(null);

  const { data, isLoading } = useGetModulesQuery();
  const [deleteModule] = useDeleteModuleMutation();

  const modules = data?.data || [];

  const handleCheckboxChange = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const tableHeaders = {
    checkbox: "",
    sl: "S.L",
    menu: "Menu",
    subMenu: "Sub Menu",
    createdDate: "Created Date",
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
            className="w-4 h-4 accent-[#4318FF]"
          />
        ),
      },
      {
        name: "sl",
        data: (_, __, index) => (
          <span className="text-[13px]">
            {String(index + 1).padStart(2, "0")}
          </span>
        ),
      },
      {
        name: "menu",
        data: (_, row) => <UserNameCell name={row.name} />,
      },
      {
        name: "subMenu",
        data: (_, row) => (
          <span className="text-[13px]">
            {row.parent ? row.parent.name : "-"}
          </span>
        ),
      },
      {
        name: "createdDate",
        data: (_, row) => (
          <span className="text-[13px]">
            {new Date(row.createdAt).toLocaleDateString()}
          </span>
        ),
      },
      {
        name: "status",
        data: () => (
          <span className="inline-block px-3 py-1 rounded-md text-[11px] font-bold bg-[#05CD99]/10 text-[#05CD99]">
            Active
          </span>
        ),
      },
      {
        name: "action",
        data: (_, row) => (
          <div className="flex items-center gap-2">
            <button className="w-6 h-6 rounded-full bg-[#85C1E2]/20 flex items-center justify-center">
              <Eye size={13} />
            </button>

            <button
              onClick={() => {
                setEditMenu(row);
                setOpenAddMenuModal(true);
              }}
              className="w-6 h-6 rounded-full bg-[#22C55E]/20 flex items-center justify-center"
            >
              <Pencil size={13} />
            </button>

            <button
              onClick={async () => {
                if (!window.confirm("Delete this menu?")) return;
                await deleteModule(row._id).unwrap();
              }}
              className="w-6 h-6 rounded-full bg-[#EF4444]/20 flex items-center justify-center"
            >
              <Trash2 size={13} />
            </button>
          </div>
        ),
      },
    ],
    [selectedRows, deleteModule]
  );

  return (
    <div className="bg-white rounded-lg">
      {/* Header */}
      <div className="flex justify-between items-center px-5 py-3.5 border-b">
        <div className="flex items-center gap-3">
          <span className="text-[13px] font-medium">Menus</span>
        </div>

        <button
          onClick={() => {
            setEditMenu(null);
            setOpenAddMenuModal(true);
          }}
          className="bg-[#4318FF] text-white px-5 py-2 rounded-lg text-[13px] font-bold"
        >
          + Add Menu
        </button>
      </div>

      {/* Table */}
      <TableMui
        th={tableHeaders}
        td={modules}
        customFields={customFields}
        loading={isLoading}
      />

      {/* Modal */}
      <AddMenuModal
        open={openAddMenuModal}
        editMenu={editMenu}
        onClose={() => {
          setEditMenu(null);
          setOpenAddMenuModal(false);
        }}
      />
    </div>
  );
};

export default MenusTab;
