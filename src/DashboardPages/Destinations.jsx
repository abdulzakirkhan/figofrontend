import React, { useState } from "react";
import ShowScoreCard from "../components/ShowScoreCard";
import DataTableToolbar from "../components/DataTableToolbar";
import TableMui from "../components/TableMui";
import Paginate from "../components/Paginate";
import group from "/group.png";
import file from "/file.png";
import doc from "/doc.png";
import sim from "/sim.png";

export const Destinations = () => {
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(50);
  const limit = 10;

  const handlePageChange = (event, page) => {
    setPage(page);
  };

  // Updated headers to match your screenshot
  const tableHeaders = {
   
    sl: "S.L",
    name: "Name",
    country: "Country",
    totalPlans: "Total Plans",
    status: "Status",
    actions: "Action",
  };

  // Updated data exactly as in your screenshot
  const tableData = [
    { id: 1, name: "3 Days - 5 GB", country: "--", totalPlans: 20, status: "Enabled" },
    { id: 2, name: "3 Days - 10 GB", country: "--", totalPlans: 20, status: "Enabled" },
    { id: 3, name: "3 Days - 20 GB", country: "--", totalPlans: 20, status: "Enabled" },
    { id: 4, name: "3 Days - 30 GB", country: "--", totalPlans: 20, status: "Enabled" },
    { id: 5, name: "3 Days - 50 GB", country: "--", totalPlans: 20, status: "Disabled" },
    { id: 6, name: "3 Days - 70 GB", country: "---", totalPlans: 20, status: "Enabled" },
    { id: 7, name: "3 Days - 100 GB", country: "--", totalPlans: 20, status: "Enabled" },
    { id: 8, name: "5 Days - 5 GB", country: "---", totalPlans: 20, status: "Disabled" },
    { id: 9, name: "5 Days - 10 GB", country: "---", totalPlans: 20, status: "Enabled" },
    { id: 10, name: "5 Days - 20 GB", country: "----", totalPlans: 20, status: "Enabled" },
  ];

  const customFields = [
    // Checkbox + Serial Number column
    {
      name: "sl",
      data: (value, row, index) => (
        <div className="flex items-center gap-3">
          <input type="checkbox" className="w-4 h-4" />
          <span>{String(row.id).padStart(2, "0")}</span>
        </div>
      ),
    },

    // Status badge (green = Enabled, red = Disabled)
    {
      name: "status",
      data: (value) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            value === "Enabled"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {value}
        </span>
      ),
    },

    // Action icons (View, Edit, Delete)
    {
      name: "actions",
      data: () => (
        <div className="flex  items-center gap-4 w-[100px]">
          <button className="text-blue-600 hover:text-blue-800 w-[33px] ">
            <img src="/eye.png" alt="View" className="" />
          </button>
          <button className="text-green-600 hover:text-green-800  w-[33px]">
            <img src="/edit.png" alt="Edit" className="" />
          </button>
          <button className="text-red-600 hover:text-red-800  w-[33px]">
            <img src="/delete.png" alt="Delete" className="" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <h1 className="text-2xl px-2 font-bold">Destinations</h1>

      {/* Score Cards */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-3"
        style={{ zoom: "0.8" }}
      >
        <ShowScoreCard startColor="#DDE7FF" title="Total Countries" image={group} />
        <ShowScoreCard startColor="#F4E2FF" title="Total Operators / Partners" image={file} />
        <ShowScoreCard startColor="#FEEBEB" title="eSIM Supported" image={doc} />
        <ShowScoreCard startColor="#E8FFF5" title="Countries with 5G" image={sim} />
      </div>

      {/* Table Section */}
      <div className="bg-app p-4 mx-4 mt-6 rounded-lg shadow">
        <div className="border-b border-gray-200 pb-3 mb-4">
          <p className="text-lg font-semibold">Destination</p>
        </div>

        <DataTableToolbar />

        <TableMui
          th={tableHeaders}
          td={tableData}
          customFields={customFields}
          headerRounded={true}
          rowRounded={true}
          styleTableContainer={{
            marginTop: "20px",
            maxHeight: "600px",
            overflow: "auto",
          }}
          styleTableThead={{ backgroundColor: "#6366f1", color: "white" }} // Blue header like screenshot
          styleTableTh={{ padding: "12px 16px", fontWeight: "600" }}
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
};

export default Destinations;