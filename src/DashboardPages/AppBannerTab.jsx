import React, { useState } from 'react';
import TableMui from '../components/TableMui';
import AddBannerModal from '../models/AddBannerModal';
import { Eye, Pencil, Trash2 } from 'lucide-react';

const AppBannerTab = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [openAddBannerModal, setOpenAddBannerModal] = useState(false);

  // Sample banner data matching Figma
  const bannerData = [
    { id: 1, sl: '01', title: 'Tagline', description: 'Description', createdDate: '20/11/2025', status: 'Active' },
    { id: 2, sl: '02', title: 'Tagline', description: 'Description', createdDate: '20/11/2025', status: '' },
    { id: 3, sl: '03', title: 'Tagline', description: 'Description', createdDate: '20/11/2025', status: 'Active' },
    { id: 4, sl: '04', title: 'Tagline', description: 'Description', createdDate: '20/11/2025', status: 'Active' },
    { id: 5, sl: '05', title: 'Tagline', description: 'Description', createdDate: '20/11/2025', status: '' },
    { id: 6, sl: '06', title: 'Tagline', description: 'Description', createdDate: '20/11/2025', status: '' },
    { id: 7, sl: '07', title: 'Tagline', description: 'Description', createdDate: '20/11/2025', status: 'Active' },
    { id: 8, sl: '08', title: 'Tagline', description: 'Description', createdDate: '20/11/2025', status: '' },
    { id: 9, sl: '09', title: 'Tagline', description: 'Description', createdDate: '20/11/2025', status: 'Active' },
    { id: 10, sl: '10', title: 'Tagline', description: 'Description', createdDate: '20/11/2025', status: '' },
  ];

  const handleCheckboxChange = (id) => {
    setSelectedRows(prev => 
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    );
  };

  const tableHeaders = {
    checkbox: '',
    sl: 'S.L',
    title: 'Title',
    description: 'Description',
    createdDate: 'Created Date',
    status: 'Status',
    action: 'Action',
  };

  const customFields = [
    {
      name: 'checkbox',
      data: (value, row) => (
        <input
          type="checkbox"
          checked={selectedRows.includes(row.id)}
          onChange={() => handleCheckboxChange(row.id)}
          className="w-4 h-4 accent-[#4318FF] cursor-pointer rounded"
        />
      )
    },
    {
      name: 'sl',
      data: (value, row) => (
        <span className="text-[13px] text-[#2B3674]">{row.sl}</span>
      )
    },
    {
      name: 'title',
      data: (value, row) => (
        <span className="text-[13px] text-[#2B3674]">{row.title}</span>
      )
    },
    {
      name: 'description',
      data: (value, row) => (
        <span className="text-[13px] text-[#2B3674]">{row.description}</span>
      )
    },
    {
      name: 'createdDate',
      data: (value, row) => (
        <span className="text-[13px] text-[#2B3674]">{row.createdDate}</span>
      )
    },
    {
      name: 'status',
      data: (value, row) => (
        row.status ? (
          <span className="inline-block px-3 py-1 rounded-md text-[11px] font-bold bg-[#05CD99]/10 text-[#05CD99]">
            {row.status}
          </span>
        ) : null
      )
    },
    {
      name: 'action',
      data: (value, row) => (
        <div className="flex items-center gap-2">
          <button className="w-6 h-6 rounded-full bg-[#85C1E2]/20 flex items-center justify-center hover:bg-[#85C1E2]/30 transition-colors">
            <Eye size={13} className="text-[#85C1E2]" />
          </button>
          <button className="w-6 h-6 rounded-full bg-[#22C55E]/20 flex items-center justify-center hover:bg-[#22C55E]/30 transition-colors">
            <Pencil size={13} className="text-[#22C55E]" />
          </button>
          <button className="w-6 h-6 rounded-full bg-[#EF4444]/20 flex items-center justify-center hover:bg-[#EF4444]/30 transition-colors">
            <Trash2 size={13} className="text-[#EF4444]" />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="bg-app my-shadow  rounded-lg">
      {/* Header with Add New User button */}
      <div className="flex justify-between items-center px-5 py-3.5 border-b border-[#E0E5F2]">
        <div className="flex items-center gap-3">
          <span className="text-[13px] text-[#2B3674] font-medium">Show</span>
          <select className="border border-[#E0E5F2] rounded-lg px-3 py-1.5 text-[12px] text-[#2B3674] focus:outline-none cursor-pointer bg-white">
            <option>10</option>
            <option>25</option>
            <option>50</option>
            <option>100</option>
          </select>
          <div className="ml-2 relative">
            <input
              type="text"
              placeholder="Search"
              className="border border-[#E0E5F2] rounded-lg pl-3 pr-8 py-1.5 text-[12px] text-[#2B3674] placeholder:text-[#A3AED0] focus:outline-none focus:ring-1 focus:ring-[#4318FF]/20 w-56"
            />
          </div>
        </div>
        <button 
          onClick={() => setOpenAddBannerModal(true)}
          className="bg-[#4318FF] text-white px-5 py-2 rounded-lg text-[13px] font-bold flex items-center gap-2 hover:bg-[#3311DD] transition-colors"
        >
          <span className="text-[18px] leading-none">+</span>
          Add New User
        </button>
      </div>

      {/* Table */}
      <TableMui
        th={tableHeaders}
        td={bannerData}
        customFields={customFields}
        styleTableContainer={{
          background: 'white',
          padding: '0',
          borderRadius: '0',
        }}
      />

      {/* Add Banner Modal */}
      <AddBannerModal 
        open={openAddBannerModal} 
        onClose={() => setOpenAddBannerModal(false)} 
      />
    </div>
  );
};

export default AppBannerTab;
