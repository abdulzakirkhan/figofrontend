import React from 'react';
import { Dialog, DialogContent } from '@mui/material';
import { X } from 'lucide-react';

const ViewTransactionModal = ({ open, onClose, transaction }) => {
  if (!transaction) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        },
      }}
    >
      <DialogContent sx={{ padding: 0 }}>
        <div className="relative">
          {/* Header */}
          <div className="bg-[#4318FF] text-white px-6 py-4 flex items-center justify-between rounded-t-xl">
            <h2 className="text-[18px] font-semibold">View Details</h2>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/10 p-1 rounded transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            {/* Customer ID */}
            <div>
              <label className="text-[12px] text-[#A3AED0] font-medium block mb-1">
                Customer ID
              </label>
              <p className="text-[14px] text-[#2B3674] font-semibold">
                {transaction.customerId}
              </p>
            </div>

            {/* E-Sim ID */}
            <div>
              <label className="text-[12px] text-[#A3AED0] font-medium block mb-1">
                E-Sim ID
              </label>
              <p className="text-[14px] text-[#2B3674] font-semibold">
                {transaction.esimId || 'ESIM9P2301'}
              </p>
            </div>

            {/* Order Number */}
            <div>
              <label className="text-[12px] text-[#A3AED0] font-medium block mb-1">
                Order Number
              </label>
              <p className="text-[14px] text-[#2B3674] font-semibold">
                {transaction.orderNumber || 'ORD-54012'}
              </p>
            </div>

            {/* Date & Time */}
            <div>
              <label className="text-[12px] text-[#A3AED0] font-medium block mb-1">
                Date & Time
              </label>
              <p className="text-[14px] text-[#2B3674]">
                {transaction.dateTime}
              </p>
            </div>

            {/* Plan */}
            <div>
              <label className="text-[12px] text-[#A3AED0] font-medium block mb-1">
                Plan
              </label>
              <p className="text-[14px] text-[#4318FF] font-medium flex items-center gap-2">
                <span className="text-[20px]">🇫🇷</span>
                Premium 20GB
              </p>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="px-6 pb-6 flex items-center justify-end gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2.5 text-[14px] font-medium text-[#4318FF] bg-white border border-[#4318FF] rounded-lg hover:bg-[#4318FF]/5 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                console.log('Save transaction:', transaction);
                onClose();
              }}
              className="px-6 py-2.5 text-[14px] font-medium text-white bg-[#4318FF] rounded-lg hover:bg-[#3311DD] transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewTransactionModal;
