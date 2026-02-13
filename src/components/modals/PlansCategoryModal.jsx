import React, { useState } from 'react';
import { Modal, Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const PlansCategoryModal = ({setOpen,open}) => {
 

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
   

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="plans-category-modal"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '90%', sm: 450 },
            maxHeight: '90vh',
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            outline: 'none',
            overflowY: 'auto',
          }}
        >
          {/* Header */}
          <div className="bg-primary text-white px-6 py-4 rounded-t-lg flex justify-between items-center">
            <h2 className="text-xl font-semibold">Plans Categories</h2>
            <IconButton
              size="small"
              onClick={handleClose}
              sx={{ color: 'white' }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </div>

          {/* Form Body - Tailwind Styled Inputs */}
          <div className="p-6 space-y-6">
            {/* Package Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Package Name
              </label>
              <input
                type="text"
                placeholder="e.g., Premium Monthly"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
            </div>

            {/* Days */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Days
              </label>
              <input
                type="number"
                placeholder="30"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
            </div>

            {/* Data (GBs) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Data (GBs)
              </label>
              <input
                type="number"
                placeholder="100"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 text-lg">
                  $
                </span>
                <input
                  type="number"
                  step="0.01"
                  placeholder="29.99"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                />
              </div>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-end gap-3 px-6 pb-6">
            <button
              onClick={handleClose}
              className="px-6 py-2.5 border border-orange-500 text-orange-500 rounded-lg hover:bg-orange-50 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleClose}
              className="px-8 py-2.5 bg-primary text-white rounded-lg  transition shadow-md"
            >
              Save
            </button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default PlansCategoryModal;