import React, { useState } from 'react';
import TableMui from '../components/TableMui';
import DataTableToolbar from '../components/DataTableToolbar';
import Paginate from '../components/Paginate';

export const FAQs = () => {
  const [page, setPage] = useState(1);
  const count = 50;   // total items (for pagination demo)
  const limit = 10;

  const handlePageChange = (event, newPage) => setPage(newPage);

  // ---------- Table headers exactly like your screenshot ----------
  const tableHeaders = {

    sl: 'S.L',
    title: 'Title',
    description: 'Description',
    createdAt: 'Created At',
    status: 'Status',
    actions: 'Action',
  };

  // ---------- Data that matches your screenshot ----------
  const tableData = [
    { id: 1, title: 'Zain Ali', description: '03325589291', createdAt: '2025-11-19 03:54 PM', status: 'Active' },
    { id: 2, title: 'Zain Ali', description: '03325589291', createdAt: '2025-11-19 03:54 PM', status: 'Active' },
    { id: 3, title: 'Zain Ali', description: '03325589291', createdAt: '2025-11-19 03:54 PM', status: 'Active' },
    { id: 4, title: 'Zain Ali', description: '03325589291', createdAt: '2025-11-19 03:54 PM', status: 'Active' },
    { id: 5, title: 'Zain Ali', description: '03325589291', createdAt: '2025-11-19 03:54 PM', status: 'Cancelled' },
    { id: 6, title: 'Zain Ali', description: '03325589291', createdAt: '2025-11-19 03:54 PM', status: 'Active' },
    { id: 7, title: 'Zain Ali', description: '03325589291', createdAt: '2025-11-19 03:54 PM', status: 'Active' },
    { id: 8, title: 'Zain Ali', description: '03325589291', createdAt: '2025-11-19 03:54 PM', status: 'Active' },
    { id :9, title: 'Zain Ali', description: '03325589291', createdAt: '2025-11-19 03:54 PM', status: 'Active' },
    { id: 10, title: 'Zain Ali', description: '03325589291', createdAt: '2025-11-19 03:54 PM', status: 'Active' },
  ];

  // ---------- Custom rendering for each column ----------
  const customFields = [
    // Checkbox
  
    // Serial number
    {
      name: 'sl',
    data: (value, row, index) => (
        <div className="flex items-center gap-3">
          <input onClick={()=>setOpen(true)} type="checkbox" className="w-4 h-4" />
          <span>{String(row.id).padStart(2, "0")}</span>
        </div>
      ),
    },
 
    // Status badge (green = Active, orange/red = Cancelled)
    {
      name: 'status',
      data: (value) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold inline-block ${
            value === 'Active'
              ? 'bg-green-100 text-green-700'
              : 'bg-orange-100 text-orange-700'
          }`}
        >
          {value}
        </span>
      ),
    },

    // Action icons (view, edit, delete)
    {
      name: 'actions',
      data: () => (
        <div className="flex items-center gap-3">
          <img src="/eye.png" alt="View" className="w-5 h-5 cursor-pointer hover:opacity-70" />
          <img src="/edit.png" alt="Edit" className="w-5 h-5 cursor-pointer hover:opacity-70" />
          <img src="/delete.png" alt="Delete" className="w-5 h-5 cursor-pointer hover:opacity-70" />
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="bg-app rounded-lg shadow">
        {/* Toolbar */}
        <DataTableToolbar />

        {/* Table */}
        <TableMui
          th={tableHeaders}
          td={tableData}
          customFields={customFields}
          headerRounded={true}
          rowRounded={true}
          styleTableContainer={{ maxHeight: '640px', overflow: 'auto' }}
          styleTableThead={{ backgroundColor: '#6366f1' }}      
          styleTableTh={{ color: 'white', padding: '12px 16px', fontWeight: '600' }}
          styleTableTd={{ padding: '14px 16px', fontSize: '14px' }}
        />

        {/* Pagination */}
        <div className="mt-4">
          <Paginate
            count={count}
            limit={limit}
            page={page}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};
