// import React, { useState } from 'react';
// import TableMui from '../components/TableMui';
// import DataTableToolbar from '../components/DataTableToolbar';
// import Paginate from '../components/Paginate';
// import AppLoader from '../components/Loader/AppLoader';
// import { useGetSingleSubscriberQuery } from '../redux/ProvidersApi/providersApi';

// export const DeviceInformation = ({imsi}) => {


//     const { data, isLoading } = useGetSingleSubscriberQuery(imsi);
  

//     console.log("Subscriber Data:",data);

 
//  const rows = data
//   ? [
//       {
//         id: data.subscriberId,
//         brand: data.model?.split(" ")[0] || "—",
//         model: data.model || "—",
//         imei: data.networkInfo?.lastImei || "—",
//         status: data.sim?.status || "—",
//         type: "Smartphone",
//       },
//     ]
//   : [];


//    if (isLoading) return <AppLoader fullPage />;


//   return (
   
//   );
// };



import React from "react";
import { useGetSingleSubscriberQuery } from "../redux/ProvidersApi/providersApi";
import AppLoader from "../components/Loader/AppLoader";
import DataTableToolbar from "../components/DataTableToolbar";
import DataTable from "../components/Table/DataTable";


export const DeviceInformation = ({ imsi }) => {
  const { data, isLoading } = useGetSingleSubscriberQuery(imsi);
  

  if (isLoading) return <AppLoader fullPage />;

 

  const rows = data
    ? [
        {
          id: data.subscriberId,
          model: data?.networkInfo?.model || "—",
          imei: data?.networkInfo?.lastImei || "—",
          status: data.sim?.status || "—",
          type: "Smartphone",
        },
      ]
    : [];

  const columns = [
 
    {
      field: "model",
      headerName: "Device Model",
    },
    {
      field: "imei",
      headerName: "IMEI Number",
    },
    {
      field: "status",
      headerName: "IMEI Status",
      renderCell: (value) => (
        <span
          style={{
            padding: "4px 12px",
            borderRadius: "20px",
            fontSize: "12px",
            fontWeight: 600,
            backgroundColor:
              value === "AFFECTED" ? "#FFF4E5" : "#E7F6EC",
            color:
              value === "AFFECTED" ? "#F57C00" : "#27A644",
          }}
        >
          {value}
        </span>
      ),
    },
    {
      field: "type",
      headerName: "Device Type",
    },
  ];

  return (
    <div className=" py-4">
      <div className="bg-white p-4 rounded-lg shadow-sm">
  

       

        <DataTable
          columns={columns}
          rows={rows}
          uniqueKey="id"
         // search
          serachPlaceholder="Search device..."
          searchColumns={["brand", "model", "imei", "status"]}
          pagination={false}
        />
       
      </div>
    </div>
  );
};
