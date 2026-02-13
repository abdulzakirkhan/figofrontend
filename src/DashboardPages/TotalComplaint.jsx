import React, { use, useState } from 'react';
import TableMui from '../components/TableMui';
import DataTableToolbar from '../components/DataTableToolbar';
import Paginate from '../components/Paginate';
import { TbOctagon } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';

export const  TotalComplaints = () => {
  const [page, setPage] = useState(1);
  const count = 50; // Total items for pagination
  const limit = 10;
const navigate=useNavigate();
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  // Table headers exactly like your screenshot
  const tableHeaders = {
  
    sl: "S.L",
    userId: "User ID",
    emailMobile: "Email / Mobile",
    country: "Country",
    joinedAt: "Joined At",
    packageDetail: "Package Detail",
    status: "Status",
    actions: "Action",
  };

  // Sample data matching your screenshot
  const tableData = [
    { id: 1, userId: "Zain Ali", emailMobile: "03325589291", country: "Pakistan", joinedAt: "2025-11-19 03:54 PM", packageDetail: "3 Days - 5 GB", status: "Successful" },
    { id: 2, userId: "Zain Ali", emailMobile: "03325589291", country: "Pakistan", joinedAt: "2025-11-19 03:54 PM", packageDetail: "3 Days - 5 GB", status: "Successful" },
    { id: 3, userId: "Zain Ali", emailMobile: "03325589291", country: "Pakistan", joinedAt: "2025-11-19 03:54 PM", packageDetail: "3 Days - 5 GB", status: "Successful" },
    { id: 4, userId: "Zain Ali", emailMobile: "03325589291", country: "Pakistan", joinedAt: "2025-11-19 03:54 PM", packageDetail: "3 Days - 5 GB", status: "Successful" },
    { id: 5, userId: "Zain Ali", emailMobile: "03325589291", country: "Pakistan", joinedAt: "2025-11-19 03:54 PM", packageDetail: "3 Days - 5 GB", status: "Cancelled" },
    { id: 6, userId: "Zain Ali", emailMobile: "03325589291", country: "Pakistan", joinedAt: "2025-11-19 03:54 PM", packageDetail: "3 Days - 5 GB", status: "Successful" },
    { id: 7, userId: "Zain Ali", emailMobile: "03325589291", country: "Pakistan", joinedAt: "2025-11-19 03:54 PM", packageDetail: "3 Days - 5 GB", status: "Successful" },
    { id: 8, userId: "Zain Ali", emailMobile: "03325589291", country: "Pakistan", joinedAt: "2025-11-19 03:54 PM", packageDetail: null, status: "Successful" },
    { id: 9, userId: "Zain Ali", emailMobile: "03325589291", country: "Pakistan", joinedAt: "2025-11-19 03:54 PM", packageDetail: "3 Days - 5 GB", status: "Successful" },
    { id: 10, userId: "Zain Ali", emailMobile: "03325589291", country: "Pakistan", joinedAt: "2025-11-19 03:54 PM", packageDetail: "3 Days - 5 GB", status: "Successful" },
  ];

  // Custom rendering for columns
  const customFields = [
  
    // Serial number
    {
      name: "sl",
        data: (value, row, index) => (
        <div className="flex items-center gap-3">
          <input onClick={()=>setOpen(true)} type="checkbox" className="w-4 h-4" />
          <span>{String(row.id).padStart(2, "0")}</span>
        </div>
      ),
    },
    // Package Detail (green badge)
    {
      name: "packageDetail",
      data: (value) => (
        value ? (
          <span className="px-3 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full inline-block">
            {value}
          </span>
        ) : (
          <span className="text-gray-400">—</span>
        )
      ),
    },
    // Status badge
    {
      name: "status",
      data: (value) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            value === "Successful"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {value}
        </span>
      ),
    },
    // Action buttons (View, Edit, Delete)
    {
      name: "actions",
      data: () => (
        <div className="flex gap-4 items-center">
          <img onClick={()=>navigate("/admin/support-and-help/ComplaintsDetail")} src="/eye.png" alt="View" className="w-5 h-5 cursor-pointer hover:opacity-70" />
          <img src="/edit.png" alt="Edit" className="w-5 h-5 cursor-pointer hover:opacity-70" />
          <img src="/delete.png" alt="Delete" className="w-5 h-5 cursor-pointer hover:opacity-70" />
        </div>
      ),
    },
  ];

  return (
    <div className="">

      <div className="bg-app p-4 mx-4 mt-6 rounded-lg shadow">
        {/* Toolbar */}
          <DataTableToolbar />
        

        {/* Table */}
        <TableMui
          th={tableHeaders}
          td={tableData}
          customFields={customFields}
          headerRounded={true}
          rowRounded={true}
          styleTableContainer={{ maxHeight: "600px", overflow: "auto" }}
          styleTableThead={{ backgroundColor: "#6366f1" }}   // Matches your blue header
          styleTableTh={{ color: "white", padding: "12px 16px", fontWeight: "600" }}
          styleTableTd={{ padding: "14px 16px", fontSize: "14px" }}
        />

        
          <Paginate
            count={count}
            limit={limit}
            page={page}
            onChange={handlePageChange}
          />
     
      </div>
    </div>
  );
} ;

