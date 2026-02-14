import React, { useState } from "react";
import ShowScoreCard from "../components/ShowScoreCard";
import DataTableToolbar from "../components/DataTableToolbar";
import TableMui from "../components/TableMui";
import Paginate from "../components/Paginate";
import group from "/group.png";
import file from "/file.png";
import doc from "/doc.png";
import sim from "/sim.png";
import { useNavigate } from "react-router-dom";
import { useGetCustomersUsersQuery } from "../redux/customers/customersApi";
import DataTable from "../components/Table/DataTable";

export const Customers = () => {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading } = useGetCustomersUsersQuery({
    page,
    limit,
  });


  const tableData = data?.data || [];

  const columns = [
    {
      field: "id",
      headerName: "User ID",
    },
    {
      field: "name",
      headerName: "User Name",
    },
    {
      field: "emailMobile",
      headerName: "Email",
    },
    {
      field: "country",
      headerName: "Login Method",
    },
    {
      field: "joinedAt",
      headerName: "Subscribed Date",
      renderCell: (value) =>
        value
          ? new Date(value).toLocaleString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })
          : "—",
    },
    {
      field: "status",
      headerName: "User Status",
      renderCell: (value) => (
        <span
          style={{
            padding: "4px 12px",
            borderRadius: "6px",
            fontSize: "12px",
            fontWeight: 600,
            backgroundColor: value === "Active" ? "#E7F6EC" : "#FFF4E5",
            color: value === "Active" ? "#27A644" : "#F57C00",
          }}
        >
          {value}
        </span>
      ),
    },
    {
      field: "actions",
      headerName: "Action",
      renderCell: (_, row) => (
        <div style={{ display: "flex", gap: 12 }}>
          <img
            src="/eye.png"
            className="h-5 w-5 cursor-pointer"
            onClick={() => navigate(`/admin/customers-detail?id=${row.id}`)}
          />
          <img src="/edit.png" className="h-5 w-5 cursor-pointer" />
        </div>
      ),
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold px-2 mb-4">All Users</h1>

      {/* Scorecards */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-3"
        style={{ zoom: "0.8" }}
      >
        <ShowScoreCard startColor="#DDE7FF" title="Total User" image={group} totalCount={data?.data?.length} />
        <ShowScoreCard
          startColor="#F4E2FF"
          title="Total Subscription"
          image={file}
          totalCount={42}
        />
        <ShowScoreCard
          startColor="#FEEBEB"
          title="Expired Subscription"
          image={doc}
          totalCount={10}
        />
        <ShowScoreCard
          startColor="#E8FFF5"
          title="New Sim Registered"
          image={sim}
          totalCount={5}
        />
      </div>

      {isLoading ? (
        <div className="p-6 text-center text-sm text-gray-500">
          Loading users...
        </div>
      ) : (
        <DataTable
          columns={columns}
          rows={tableData}
          uniqueKey="id"
          search
          serachPlaceholder="Search users..."
          searchColumns={["name", "emailMobile", "status", "activePackage"]}
          pagination
        />
      )}
    </div>
  );
};
