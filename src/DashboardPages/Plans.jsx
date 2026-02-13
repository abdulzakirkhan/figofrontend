import React, { useState } from 'react'
import ShowScoreCard from '../components/ShowScoreCard'
import TextField from '../components/inputs/TextField'
import SearchTextField from '../components/inputs/SearchTextField'
import TableMui from '../components/TableMui'
import DataTableToolbar from '../components/DataTableToolbar'
import Paginate from '../components/Paginate'
import group from '/group.png'
import file from '/file.png'
import doc from '/doc.png'
import sim from '/sim.png'
import PlansCategoryModal from '../components/modals/PlansCategoryModal'
import { Button } from '@mui/material'
import { Add } from '@mui/icons-material'



export const Plans = () => {
    const [page, setPage] = useState(1)
  const [count, setCount]=useState(50)
   const [open, setOpen] = useState(false);
  const limit=10;
  const handlePageChange = (event, page) => {
    setPage(page);
  };
const tableHeaders = {
  sr: "S.L",
  packageName: "Package Name",
  region: "Region",
  provider: "Provider",
  price: "Price / Period",
  status: "Status",
  actions: "Action",
};


  // Sample table data (rows)
const tableData = [
  {
    id: 1,
    packageName: "3 Days - 5 GB",
    region: "--",
    provider: "Ufone",
    price: "$19.00 / 3 Days",
    status: "Enabled"
  },
  {
    id: 2,
    packageName: "3 Days - 10 GB",
    region: "--",
    provider: "Ufone",
    price: "$19.00 / 3 Days",
    status: "Enabled"
  },
  {
    id: 3,
    packageName: "3 Days - 20 GB",
    region: "--",
    provider: "Ufone",
    price: "$19.00 / 3 Days",
    status: "Enabled"
  },
  {
    id: 4,
    packageName: "3 Days - 30 GB",
    region: "--",
    provider: "Ufone",
    price: "$19.00 / 3 Days",
    status: "Enabled"
  },
  {
    id: 5,
    packageName: "3 Days - 50 GB",
    region: "--",
    provider: "Ufone",
    price: "$19.00 / 3 Days",
    status: "Disabled"
  },
  {
    id: 6,
    packageName: "3 Days - 70 GB",
    region: "---",
    provider: "Ufone",
    price: "$19.00 / 3 Days",
    status: "Enabled"
  },
  {
    id: 7,
    packageName: "3 Days - 100 GB",
    region: "---",
    provider: "Ufone",
    price: "$19.00 / 3 Days",
    status: "Enabled"
  },
  {
    id: 8,
    packageName: "5 Days - 5 GB",
    region: "---",
    provider: "Ufone",
    price: "$19.00 / 3 Days",
    status: "Disabled"
  },
  {
    id: 9,
    packageName: "5 Days - 10 GB",
    region: "---",
    provider: "Ufone",
    price: "$19.00 / 3 Days",
    status: "Enabled"
  },
  {
    id: 10,
    packageName: "5 Days - 20 GB",
    region: "----",
    provider: "Ufone",
    price: "$19.00 / 3 Days",
    status: "Enabled"
  }
];



  // Custom rendering for specific columns
  const customFields = [
   {
      name: "sr",
      data: (value, row, index) => (
        <div className="flex items-center gap-3">
          <input type="checkbox" className="w-4 h-4" />
          <span>{String(row.id).padStart(2, "0")}</span>
        </div>
      ),
    },

  // Status badge styling
  {
    name: "status",
    data: (value) => (
      <span
        style={{
          padding: "4px 10px",
          borderRadius: "6px",
          // border: "2px solid red",
          fontSize: "12px",
          fontWeight: "600",
          backgroundColor: value === "Enabled" ? "#E7F6EC" : "#FFE7E7",
          color: value === "Enabled" ? "#27A644" : "#D93025"
        }}
      >
        {value}
      </span>
    )
  },

  // Action buttons
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
  }
];


  // Optional: Custom cell styles per column
  const cellStyles = {
    name: { fontWeight: "bold", color: "#1976d2" },
    email: { color: "#555", fontSize: "12.5px" },
  };
  return (
    <div>
      <h1 className='text-2xl px-2'>Plans Categories</h1>
    
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-3 " style={{zoom:"0.8"}}>
        <ShowScoreCard startColor='#DDE7FF' title="Total Countries" image={group}  />
        <ShowScoreCard startColor='#F4E2FF' title='Total Operators / Partners' image={file}   />
        <ShowScoreCard startColor='#FEEBEB'  title='eSIM Supported' image={doc}  />
        <ShowScoreCard startColor='#E8FFF5'title='Countries with 5G' image={sim}   />
      </div>
      <div className="bg-app  p-4 mx-4 mt-6 rounded-lg">
        <div className="border-b border-gray-200 pt-2 pb-3 flex justify-between items-center">

<p>Plans Categories</p>
<Button  onClick={()=>setOpen(true)} variant='contained'  startIcon={<Add />} sx={{bgcolor:"#0023D0"}} >Add New</Button>
        </div>
      
   <   DataTableToolbar/>
 <TableMui
  th={tableHeaders}
  td={tableData}
  customFields={customFields}
  cellStyles={cellStyles}
  headerRounded={true}
  rowRounded={true}
  styleTableContainer={{ marginTop: "20px", maxHeight: "600px", overflow: "auto" }}
  styleTableThead={{ backgroundColor: "#f5f5f5" }}
  styleTableTh={{ color: "#333", padding: "12px 16px" }}
/>
<Paginate count={count} limit={limit} page={page} onChange={handlePageChange} />
</div>
<PlansCategoryModal setOpen={setOpen} open={open} />
    </div>
  )
}
