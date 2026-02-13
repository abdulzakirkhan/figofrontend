import React, { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@mui/material";
import { X } from "lucide-react";

import { useCreateAdminUserMutation, useUpdateAdminUserMutation } from "../redux/rbac/adminUsersApi";
import { useGetRolesDropdownQuery } from "../redux/rbac/rolesApi";

const AddUserModal = ({ open, onClose, editUser }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [designation, setDesignation] = useState("");
  const [roleId, setRoleId] = useState("");
  const [password, setPassword] = useState("");

  const { data: rolesRes, isLoading: rolesLoading } = useGetRolesDropdownQuery();
  const roles = rolesRes?.data || [];

  const [createUser, { isLoading: creating }] = useCreateAdminUserMutation();
  const [updateUser, { isLoading: updating }] = useUpdateAdminUserMutation();

  useEffect(() => {
    if (editUser) {
      setName(editUser.name || "");
      setEmail(editUser.email || "");
      setDesignation(editUser.designation || "");
      setRoleId(editUser.role?._id || "");
      setPassword(""); // not editing password here
    } else {
      setName("");
      setEmail("");
      setDesignation("");
      setRoleId("");
      setPassword("");
    }
  }, [editUser, open]);

  const handleSave = async () => {
    if (!name || !email || !roleId) return alert("Name, Email, Role required");

    if (!editUser && !password) return alert("Password is required");

    try {
      if (editUser) {
        await updateUser({
          userId: editUser._id,
          body: { name, email, designation },
        }).unwrap();
      } else {
        await createUser({ name, email, designation, password, roleId }).unwrap();
      }
      onClose();
    } catch (e) {
      alert(e?.data?.message || e?.message || "Something went wrong");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogContent sx={{ padding: 0 }}>
        <div className="bg-white rounded-2xl">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#E0E5F2]">
            <h2 className="text-[18px] font-bold text-[#2B3674]">
              {editUser ? "Edit User" : "Add New User"}
            </h2>
            <button onClick={onClose} className="text-[#A3AED0] hover:text-[#2B3674]">
              <X size={20} />
            </button>
          </div>

          <div className="px-6 py-6 space-y-5">
            <div>
              <label className="block text-[13px] font-medium text-[#2B3674] mb-2">
                User Name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Enter User Name"
                className="w-full border border-[#E0E5F2] rounded-lg px-4 py-2.5 text-[13px]"
              />
            </div>

            <div>
              <label className="block text-[13px] font-medium text-[#2B3674] mb-2">
                Email Address
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter Email Address"
                className="w-full border border-[#E0E5F2] rounded-lg px-4 py-2.5 text-[13px]"
              />
            </div>

            <div>
              <label className="block text-[13px] font-medium text-[#2B3674] mb-2">
                Designation
              </label>
              <input
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                type="text"
                placeholder="Enter Designation"
                className="w-full border border-[#E0E5F2] rounded-lg px-4 py-2.5 text-[13px]"
              />
            </div>

            <div>
              <label className="block text-[13px] font-medium text-[#2B3674] mb-2">
                Role
              </label>
              <select
                value={roleId}
                onChange={(e) => setRoleId(e.target.value)}
                disabled={rolesLoading}
                className="w-full border border-[#E0E5F2] rounded-lg px-4 py-2.5 text-[13px] cursor-pointer bg-white"
              >
                <option value="">Select Role</option>
                {roles.map((r) => (
                  <option key={r._id} value={r._id}>
                    {r.name}
                  </option>
                ))}
              </select>
            </div>

            {!editUser && (
              <div>
                <label className="block text-[13px] font-medium text-[#2B3674] mb-2">
                  Password
                </label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Enter Password"
                  className="w-full border border-[#E0E5F2] rounded-lg px-4 py-2.5 text-[13px]"
                />
              </div>
            )}

            <div className="flex items-center justify-end gap-3 pt-4">
              <button
                onClick={onClose}
                className="px-6 py-2.5 border border-[#E0E5F2] text-[#FF6B6B] text-[13px] font-bold rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={creating || updating}
                className="px-6 py-2.5 bg-[#4318FF] text-white text-[13px] font-bold rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddUserModal;
