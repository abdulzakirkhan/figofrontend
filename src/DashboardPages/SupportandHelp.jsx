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
import CustomTabs from '../components/CustomTabs'
import { TotalComplaints } from './TotalComplaint'
import { FAQs } from './FAQs'



export const SupportandHelp = () => {
    const [page, setPage] = useState(1)
  const [count, setCount]=useState(50)
  const limit=10;
  const handlePageChange = (event, page) => {
    setPage(page);
  };





 
     const tabLabels = [
      "Total Comlapints",
      "FAQs",
      
    ];
    const tabPanels = [
      
      <TotalComplaints/>,
       <FAQs/>,]

  return (
    <div>
      <h1 className='text-2xl'>Destinations</h1>
    
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-3 " style={{zoom:"0.8"}}>
        <ShowScoreCard startColor='#DDE7FF' title="Total Countries" image={group}  />
        <ShowScoreCard startColor='#F4E2FF' title='Total Operators / Partners' image={file}   />
        <ShowScoreCard startColor='#FEEBEB'  title='eSIM Supported' image={doc}  />
        <ShowScoreCard startColor='#E8FFF5'title='Countries with 5G' image={sim}   />
      </div>
      <div className="bg-app  p-3 mx-4 mt-6 rounded-lg">
  <div className="bg-app my-shadow rounded-2xl  flex-1">
          < CustomTabs  
          tabs={tabLabels}
               panels={tabPanels}
                tabBgColor={"#fff"}/>
         </div>

</div>
    </div>
  )
}
