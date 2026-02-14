import React, { useState } from 'react';
import { Dialog, DialogContent } from '@mui/material';
import { X } from 'lucide-react';

const TopUpModal = ({ open, onClose }) => {
  const [selectDays, setSelectDays] = useState('');
  const [selectData, setSelectData] = useState('');

  const handleSave = () => {
    // Add your save logic here
    onClose();
  };

  const handleCancel = () => {
    setSelectDays('');
    setSelectData('');
    onClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleCancel}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '16px',
          padding: '0',
          maxWidth: '550px',
        }
      }}
    >
      <DialogContent sx={{ padding: 0 }}>
        <div className="bg-white rounded-2xl">
          {/* Header with Blue Background */}
          <div className="flex items-center justify-between px-6 py-4 bg-blue-700 rounded-t-2xl">
            <h2 className="text-[20px] font-bold text-white">Top-Up</h2>
            <button 
              onClick={handleCancel}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Form Content */}
          <div className="px-6 py-8 space-y-6">
            {/* Select Days Dropdown */}
            <div>
              <label className="block text-[15px] font-semibold text-[#2B3674] mb-3">
                Select Days
              </label>
              <select
                value={selectDays}
                onChange={(e) => setSelectDays(e.target.value)}
                className="w-full border border-[#D0D5E8] rounded-lg px-4 py-3 text-[14px] text-[#6B7280] bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 appearance-none cursor-pointer"
                style={{
                  backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%236B7280%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%3e%3c/polyline%3e%3c/svg%3e")',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 12px center',
                  backgroundSize: '20px',
                  paddingRight: '40px'
                }}
              >
                <option value="">Select Days</option>
                <option value="3">3 Days</option>
                <option value="5">5 Days</option>
                <option value="7">7 Days</option>
                <option value="15">15 Days</option>
                <option value="30">30 Days</option>
              </select>
            </div>

            {/* Select Data Dropdown */}
            <div>
              <label className="block text-[15px] font-semibold text-[#2B3674] mb-3">
                Select Data
              </label>
              <select
                value={selectData}
                onChange={(e) => setSelectData(e.target.value)}
                className="w-full border border-[#D0D5E8] rounded-lg px-4 py-3 text-[14px] text-[#6B7280] bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 appearance-none cursor-pointer"
                style={{
                  backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%236B7280%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%3e%3c/polyline%3e%3c/svg%3e")',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 12px center',
                  backgroundSize: '20px',
                  paddingRight: '40px'
                }}
              >
                <option value="">Select Data</option>
                <option value="5gb">5 GB</option>
                <option value="10gb">10 GB</option>
                <option value="20gb">20 GB</option>
                <option value="30gb">30 GB</option>
                <option value="50gb">50 GB</option>
                <option value="70gb">70 GB</option>
                <option value="100gb">100 GB</option>
              </select>
            </div>
          </div>

          {/* Footer with Buttons */}
          <div className="flex gap-4 px-6 py-6 border-t border-[#E0E5F2] justify-end">
            <button
              onClick={handleCancel}
              className="px-8 py-2.5 border-2 border-orange-500 text-orange-500 font-semibold rounded-lg hover:bg-orange-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-8 py-2.5 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TopUpModal;
