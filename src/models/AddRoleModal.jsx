import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import {
  useCreateRoleMutation,
  useUpdateRoleMutation,
} from "../redux/rbac/rolesApi";

const AddRoleModal = ({ open, onClose, editRole }) => {
  const [name, setName] = useState("");

  const [createRole, { isLoading: creating }] = useCreateRoleMutation();
  const [updateRole, { isLoading: updating }] = useUpdateRoleMutation();

  useEffect(() => {
    setName(editRole?.name || "");
  }, [editRole]);

  if (!open) return null;

  const handleSubmit = async () => {
    if (!name.trim()) {
      alert("Role name is required");
      return;
    }

    try {
      if (editRole) {
        // ✅ EDIT ROLE NAME ONLY
        await updateRole({
          roleId: editRole._id,
          body: { name },
        }).unwrap();
      } else {
        // ✅ CREATE ROLE ONLY (no permissions)
        await createRole({
          name,
          key: name.toLowerCase().replace(/\s+/g, "_"),
        }).unwrap();
      }

      onClose();
    } catch (err) {
      alert(err?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[420px] p-5">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-[15px] font-semibold text-[#2B3674]">
            {editRole ? "Edit Role" : "Add Role"}
          </h3>
          <button onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div>
          <label className="text-[12px] text-[#2B3674] font-medium">
            Role Name
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-[#E0E5F2] rounded-lg px-3 py-2 text-[13px]"
            placeholder="e.g. Content Manager"
          />
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-[12px] border rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={creating || updating}
            className="px-4 py-2 text-[12px] bg-[#4318FF] text-white rounded-lg"
          >
            {editRole ? "Update" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddRoleModal;
