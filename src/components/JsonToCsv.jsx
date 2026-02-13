import React, { useState } from 'react';
import Papa from 'papaparse';

function JsonToCsv() {
  // Example JSON data (replace with your own)
  const [jsonData, setJsonData] = useState([
    { name: "Alice", age: 28, city: "New York" },
    { name: "Bob", age: 35, city: "London" },
    { name: "Charlie", age: 22, city: "Tokyo" }
  ]);

  // Function to convert JSON to CSV and download
  const convertToCSV = () => {
    if (!jsonData || jsonData.length === 0) {
      alert("No data to export!");
      return;
    }

    const csv = Papa.unparse(jsonData);

    // Create downloadable file
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'data.csv';  // File name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ padding: '20px' }}>

  

      <button
        onClick={convertToCSV}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Download as CSV
      </button>
    </div>
  );
}

export default JsonToCsv;