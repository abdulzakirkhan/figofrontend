import React from 'react';
import { Dialog, DialogContent } from '@mui/material';
import { X } from 'lucide-react';

const AddUserModal = ({ open, onClose }) => {
  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '16px',
          padding: '0',
          maxWidth: '450px',
        }
      }}
    >
      <DialogContent sx={{ padding: 0 }}>
        <div className="bg-white rounded-2xl">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#E0E5F2]">
            <h2 className="text-[18px] font-bold text-[#2B3674]">Add New User</h2>
            <button 
              onClick={onClose}
              className="text-[#A3AED0] hover:text-[#2B3674] transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Form */}
          <div className="px-6 py-6 space-y-5">
            {/* User Name */}
            <div>
              <label className="block text-[13px] font-medium text-[#2B3674] mb-2">
                User Name
              </label>
              <input
                type="text"
                placeholder="Enter User Name"
                className="w-full border border-[#E0E5F2] rounded-lg px-4 py-2.5 text-[13px] text-[#2B3674] placeholder:text-[#A3AED0] focus:outline-none focus:ring-2 focus:ring-[#4318FF]/20 focus:border-[#4318FF]"
              />
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-[13px] font-medium text-[#2B3674] mb-2">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter Email Address"
                className="w-full border border-[#E0E5F2] rounded-lg px-4 py-2.5 text-[13px] text-[#2B3674] placeholder:text-[#A3AED0] focus:outline-none focus:ring-2 focus:ring-[#4318FF]/20 focus:border-[#4318FF]"
              />
            </div>

            {/* Designation */}
            <div>
              <label className="block text-[13px] font-medium text-[#2B3674] mb-2">
                Designation
              </label>
              <input
                type="text"
                placeholder="Enter Designation"
                className="w-full border border-[#E0E5F2] rounded-lg px-4 py-2.5 text-[13px] text-[#2B3674] placeholder:text-[#A3AED0] focus:outline-none focus:ring-2 focus:ring-[#4318FF]/20 focus:border-[#4318FF]"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-4">
              <button
                onClick={onClose}
                className="px-6 py-2.5 border border-[#E0E5F2] text-[#FF6B6B] text-[13px] font-bold rounded-lg hover:bg-[#FF6B6B]/5 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-[#4318FF] text-white text-[13px] font-bold rounded-lg hover:bg-[#3311DD] transition-colors"
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
