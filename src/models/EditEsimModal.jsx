import React, { useState } from 'react';
import { Dialog, DialogContent } from '@mui/material';
import { X } from 'lucide-react';

const EditEsimModal = ({ open, onClose }) => {
  const [statusChange, setStatusChange] = useState('');
  const [description, setDescription] = useState('');

  const handleSave = () => {
    onClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '16px',
          maxWidth: '500px',
        }
      }}
    >
      <DialogContent sx={{ padding: 0 }}>
        <div className="bg-white rounded-2xl">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 bg-[#4318FF] rounded-t-2xl">
            <h2 className="text-[18px] font-bold text-white">eSIM Profile</h2>
            <button 
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Form */}
          <div className="px-6 py-6 space-y-5">
            {/* Status Change Dropdown */}
            <div>
              <label className="block text-[13px] font-medium text-[#2B3674] mb-2">
                Status Change
              </label>
              <select
                value={statusChange}
                onChange={(e) => setStatusChange(e.target.value)}
                className="w-full border border-[#E0E5F2] rounded-lg px-4 py-2.5 text-[13px] text-[#2B3674] focus:outline-none focus:ring-2 focus:ring-[#4318FF]/20 focus:border-[#4318FF] bg-white cursor-pointer"
              >
                <option value="">Status Change</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Canceled">Canceled</option>
              </select>
            </div>

            {/* Description Textarea */}
            <div>
              <label className="block text-[13px] font-medium text-[#2B3674] mb-2">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Write description..."
                rows={4}
                className="w-full border border-[#E0E5F2] rounded-lg px-4 py-2.5 text-[13px] text-[#2B3674] placeholder:text-[#A3AED0] focus:outline-none focus:ring-2 focus:ring-[#4318FF]/20 focus:border-[#4318FF] resize-none"
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
                onClick={handleSave}
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

export default EditEsimModal;
