import React, { useMemo } from "react";
import { Button, Chip, IconButton,Box, Typography } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";


import { useListPrepaidPackageTemplateQuery } 
  from "../../../redux/ProvidersApi/providersApi";
import DataTable from "../../../components/Table/DataTable";
import { useNavigate } from "react-router-dom";
import AppLoader from "../../../components/Loader/AppLoader";



export default function PackageTemplates() {
    const navigate = useNavigate();

const handleView = (pkg) => {
  navigate(`/admin/providers/package-templates/${pkg.prepaidpackagetemplateid}`, {
    state: pkg, // ✅ pass full object (fast)
  });
};
  const { data = [], isLoading } = useListPrepaidPackageTemplateQuery();

  /* ----------------------------------
     TRANSFORM RTK DATA → TABLE ROWS
  ---------------------------------- */
const rows = useMemo(() => {
  return data.map((item, index) => ({
    id: item.prepaidpackagetemplateid, // ✅ real unique id
    sl: index + 1,
    name: item.prepaidpackagetemplatename,
    country: item.rdbLocationZones?.locationzonename || "--",
  //  data: `${(item.databyte / 1024 / 1024 / 1024).toFixed(0)} GB`,
  data:
  item.databyte < 1024 ** 3
    ? `${(item.databyte / 1024 / 1024).toFixed(0)} MB`
    : `${(item.databyte / 1024 / 1024 / 1024).toFixed(1)} GB`,

    validity: `${item.perioddays} Days`,
    price: `$${item.cost}`,
    status: item.deleted ? "Disabled" : "Enabled",
    raw: item, // ✅ full object for detail view
  }));
}, [data]);

  /* ----------------------------------
     TABLE COLUMNS CONFIG
  ---------------------------------- */
const columns = [
  {
    field: "sl",
    headerName: "S.L",
    renderCell: (value) => value.toString().padStart(2, "0"),
  },
  { field: "name", headerName: "Package Name" },
  { field: "country", headerName: "Country" },
  { field: "data", headerName: "Data" },
  { field: "validity", headerName: "Validity" },
  { field: "price", headerName: "Price" },
  {
    field: "status",
    headerName: "Status",
    renderCell: (value) => (
      <Chip
        label={value}
        size="small"
        color={value === "Enabled" ? "success" : "error"}
      />
    ),
    customSearchValue: (row) => row.status,
  },
//   {
//     field: "actions",
//     headerName: "Action",
//     renderCell: (_, row) => (
//       <IconButton
//         size="small"
//         onClick={() => handleView(row.raw)}
//       >
//         <VisibilityIcon color="primary" />
//       </IconButton>
//     ),
//   },


// {
//   field: "actions",
//   headerName: "Action",
//   renderCell: (_, row) => (
//     <>
//       <IconButton
//         size="small"
//         onClick={() =>
//           navigate("edit", { state: row.raw })
//         }
//       >
//         <EditIcon color="primary" />
//       </IconButton>
//     </>
//   ),
// }

{
  field: "actions",
  headerName: "Action",
  sortable: false,
  filterable: false,
  renderCell: (_, row) => (
    <>
      {/* 👁 View */}
      <IconButton
        size="small"
        onClick={() =>
          navigate("view", { state: row.raw })
        }
      >
        <VisibilityIcon color="primary" />
      </IconButton>

      {/* ✏️ Edit */}
      <IconButton
        size="small"
        onClick={() =>
          navigate("edit", { state: row.raw })
        }
      >
        <EditIcon color="secondary" />
      </IconButton>
    </>
  ),
}


];


  if (isLoading) return <AppLoader fullPage/>

  return (
    <div style={{ padding: 16 }}>

   <Box sx={{display:"flex", justifyContent:"space-between", mb:2}}>
     <Typography variant="h5" fontWeight="bold" >
     Package Templates
   </Typography>
  <Button
  variant="contained"
  onClick={() => navigate("create")}
>
  Add Package Template
</Button>
     </Box>
    


      <DataTable
        columns={columns}
        rows={rows}
        uniqueKey="id"
       // showCheckbox
        search
        serachPlaceholder="Search packages..."
        searchColumns={["name", "country", "status"]}
        pagination
        // onSelectionChange={(selected) =>
        //   console.log("SELECTED ROWS", selected)
        // }
      />
      
    </div>
  );
}
