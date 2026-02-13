import React from 'react';
import {
  Search,
  FilterList,
  AddCircle,
  BarChart,
  Description,
} from '@mui/icons-material';

// Import the export functions
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';  

export default function DataTableToolbar({  }) {
  // Safety check
const data=  [
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "age": 30
  },
  {
    "id": 2,
    "name": "Jane Smith",
    "email": "jane@example.com",
    "age": 25
  },
  {
    "id": 3,
    "name": "Bob Johnson",
    "email": "bob@example.com",
    "age": 35
  }
]
  if (!data || data.length === 0) return null;

  // 1. Export to CSV
  const exportToCSV = () => {
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'data.csv';
    link.click();
  };

  // 2. Export to Excel (.xlsx)
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Data');
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    saveAs(new Blob([excelBuffer]), 'data.xlsx');
  };

  // 3. Export to PDF (Fixed!)
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text('Exported Data', 14, 15);
    
    autoTable(doc, {  // ✅ Separate function call
      head: [Object.keys(data[0])],
      body: data.map(row => Object.values(row)),
      startY: 25,
      theme: 'grid',
      styles: { fontSize: 8, cellPadding: 3 },
      headStyles: { fillColor: [71, 123, 192] },
    });
    
    doc.save('data.pdf');
  };

  // 4. Print current page/table
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-app border-b border-gray-200 px-6 py-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">

        {/* Left: Show entries */}
        <div className="flex items-center  gap-5 text-sm">
          <span className="text-gray-700">Show</span>
          <select className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option>10</option>
            <option>25</option>
            <option>50</option>
            <option>100</option>
          </select>
          
             <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
            />
          </div>
        </div>

        {/* Right: Search + Export Buttons */}
        <div className="flex items-center gap-4">

          {/* Search Input */}
       

          {/* Export Action Buttons */}
          <div className="flex items-center gap-1">
            {/* CSV */}
            <button
              onClick={exportToCSV}
              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
              title="Export as CSV"
            >
              <img src="/csv.png" alt="CSV" className="w-5 h-5" />
            </button>

            {/* Excel */}
            <button
              onClick={exportToExcel}
              className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
              title="Export as Excel"
            >
              <img src="/simimg.png" alt="Excel" className="w-5 h-5" />
            </button>

            {/* PDF */}
            <button
              onClick={exportToPDF}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Export as PDF"
            >
              <img src="/pdf.png" alt="PDF" className="w-5 h-5" />
            </button>

            {/* Print */}
            <button
              onClick={handlePrint}
              className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
              title="Print"
            >
              <img src="/print.png" alt="Print" className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

