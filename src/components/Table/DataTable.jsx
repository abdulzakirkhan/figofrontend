


// // // import React, { useState, useMemo } from 'react';
// // // import {
// // //   Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
// // //   Paper, Checkbox, TablePagination, TextField, Box, InputAdornment
// // // } from '@mui/material';
// // // import SearchIcon from '@mui/icons-material/Search'; // Import the search icon
// // // import { useTheme } from "@mui/material/styles";

// // // const DataTable = ({
// // //   columns,
// // //   rows,
// // //   uniqueKey,
// // //   showCheckbox,
// // //   onSelectionChange,
// // //   search = false,
// // //   serachPlaceholder = "Search...",
// // //   searchColumns = [],
// // //   pagination=false
  
// // // }) => {
// // //     const theme = useTheme();
// // //   const [selectedRows, setSelectedRows] = useState([]);
// // //   const [searchTerm, setSearchTerm] = useState('');
// // //   const [page, setPage] = useState(0);
// // //   const [rowsPerPage, setRowsPerPage] = useState(10);

// // //   // Filter rows based on search term
// // //   const filteredRows = rows.filter((row) => {
// // //     if (!searchTerm) return true;

// // //     return searchColumns?.some((colField) => {
// // //       const column = columns.find((c) => c.field === colField);

// // //       if (!column) return false;

// // //       if (typeof column.customSearchValue === "function") {
// // //         const value = column.customSearchValue(row);
// // //         return value?.toString().toLowerCase().includes(searchTerm.toLowerCase());
// // //       }

// // //       // Fallback for flat fields
// // //       const value = row[colField];
// // //       return value?.toString().toLowerCase().includes(searchTerm.toLowerCase());
// // //     });
// // //   });
// // //   //const paginatedRows = filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
// // //   const paginatedRows = pagination
// // //   ? filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
// // //   : filteredRows;

// // //   const handleSelectRow = (rowValue) => {
// // //     setSelectedRows((prevSelected) => {
// // //       const newSelected = prevSelected.includes(rowValue)
// // //         ? prevSelected.filter((value) => value !== rowValue)
// // //         : [...prevSelected, rowValue];

// // //       onSelectionChange?.(rows.filter((row) => newSelected.includes(row[uniqueKey])));
// // //       return newSelected;
// // //     });
// // //   };

// // //   const handleSelectAll = (event) => {
// // //     const currentPageRowIds = paginatedRows.map((row) => row[uniqueKey]);
// // //     const newSelected = event.target.checked
// // //       ? [...new Set([...selectedRows, ...currentPageRowIds])]
// // //       : selectedRows.filter((id) => !currentPageRowIds.includes(id));

// // //     setSelectedRows(newSelected);
// // //     onSelectionChange?.(rows.filter((row) => newSelected.includes(row[uniqueKey])));
// // //   };

// // //   const handleChangePage = (event, newPage) => setPage(newPage);

// // //   const handleChangeRowsPerPage = (event) => {
// // //     setRowsPerPage(parseInt(event.target.value, 10));
// // //     setPage(0);
// // //   };

// // //   const handleSearchChange = (event) => {
// // //     setSearchTerm(event.target.value);
// // //     setPage(0);
// // //   };


// // // return (
// // //   <Box sx={{ display: 'flex', flexDirection: 'column', height: pagination ? '100vh' : 'auto' }}>
// // //     {search && (
// // //       <Box display="flex" justifyContent="flex-end" mb={2} p={2}>
// // //         <TextField
// // //           size="small"
// // //           variant="outlined"
// // //           placeholder={serachPlaceholder}
// // //           value={searchTerm}
// // //           onChange={handleSearchChange}
// // //           sx={{
// // //             boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.2), 0px -2px 6px rgba(0, 0, 0, 0.1)",
// // //             borderRadius: "7px",
// // //             backgroundColor: theme.palette.background.default,
// // //             "& input": {
// // //               fontSize: "14px",
// // //               lineHeight: "1.5",
// // //             },
// // //             "& input::placeholder": {
// // //               fontSize: "14px",
// // //             },
// // //           }}
// // //           InputProps={{
// // //             endAdornment: (
// // //               <InputAdornment position="end">
// // //                 <SearchIcon />
// // //               </InputAdornment>
// // //             ),
// // //           }}
// // //         />
// // //       </Box>
// // //     )}

// // //     <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
// // //       <Paper sx={{ width: '100%', overflow: 'auto' }}>
// // //         <TableContainer>
// // //           <Table aria-label="searchable table">
// // //             <TableHead>
// // //               <TableRow sx={{ backgroundColor: theme.palette.primary.main }}>
// // //                 {showCheckbox && (
// // //                   <TableCell padding="checkbox">
// // //                     <Checkbox
// // //                       checked={
// // //                         paginatedRows.every((row) => selectedRows.includes(row[uniqueKey])) &&
// // //                         paginatedRows.length > 0
// // //                       }
// // //                       indeterminate={
// // //                         paginatedRows.some((row) => selectedRows.includes(row[uniqueKey])) &&
// // //                         !paginatedRows.every((row) => selectedRows.includes(row[uniqueKey]))
// // //                       }
// // //                       onChange={handleSelectAll}
// // //                     />
// // //                   </TableCell>
// // //                 )}
// // //                 {columns.map((column) => (
// // //                   <TableCell key={column.field} align={column.align || 'left'} style={{ fontWeight: 'bold', padding: '4px 8px', color: 'white' }}>
// // //                     {column.headerName}
// // //                   </TableCell>
// // //                 ))}
// // //               </TableRow>
// // //             </TableHead>
// // //             <TableBody>
// // //               {paginatedRows.map((row) => (
// // //                 <TableRow key={row[uniqueKey]}>
// // //                   {showCheckbox && (
// // //                     <TableCell padding="checkbox">
// // //                       <Checkbox
// // //                         checked={selectedRows.includes(row[uniqueKey])}
// // //                         onChange={() => handleSelectRow(row[uniqueKey])}
// // //                       />
// // //                     </TableCell>
// // //                   )}
// // //                   {columns.map((column) => {
// // //                     const cellValue = row[column.field];
// // //                     return (
// // //                       <TableCell key={column.field} align={column.align || 'left'} sx={{ padding: '4px 8px' }}>
// // //                         {column.renderCell ? column.renderCell(cellValue, row) : cellValue}
// // //                       </TableCell>
// // //                     );
// // //                   })}
// // //                 </TableRow>
// // //               ))}
// // //             </TableBody>
// // //           </Table>
// // //         </TableContainer>
// // //       </Paper>
// // //     </Box>

// // //     {pagination && (
// // //       <TablePagination
// // //         component="div"
// // //         count={filteredRows.length}
// // //         page={page}
// // //         onPageChange={handleChangePage}
// // //         rowsPerPage={rowsPerPage}
// // //         rowsPerPageOptions={[5, 10, 25, 50]}
// // //         onRowsPerPageChange={handleChangeRowsPerPage}
// // //         sx={{
// // //           position: 'sticky',
// // //           bottom: 0,
// // //           backgroundColor: theme.palette.background.paper,
// // //           zIndex: 2,
// // //           borderTop: `1px solid ${theme.palette.divider}`
// // //         }}
// // //       />
// // //     )}
// // //   </Box>
// // // );

// // // };


// // // export default DataTable;








// // /// without page


// // import React, { useState } from 'react';
// // import {
// //   Table,
// //   TableBody,
// //   TableCell,
// //   TableContainer,
// //   TableHead,
// //   TableRow,
// //   Paper,
// //   Checkbox,
// //   TablePagination,
// //   TextField,
// //   Box,
// //   InputAdornment,
// // } from '@mui/material';
// // import SearchIcon from '@mui/icons-material/Search';
// // import { useTheme } from '@mui/material/styles';

// // const DataTable = ({
// //   columns,
// //   rows,
// //   uniqueKey,
// //   showCheckbox,
// //   onSelectionChange,
// //   search = false,
// //   serachPlaceholder = "Search...",
// //   searchColumns = [],
// //   pagination = false,
// // }) => {
// //   const theme = useTheme();
// //   const [selectedRows, setSelectedRows] = useState([]);
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [page, setPage] = useState(0);
// //   const [rowsPerPage, setRowsPerPage] = useState(10);

// //   /* ===================== LOGIC (UNCHANGED) ===================== */

// //   const filteredRows = rows.filter((row) => {
// //     if (!searchTerm) return true;

// //     return searchColumns?.some((colField) => {
// //       const column = columns.find((c) => c.field === colField);
// //       if (!column) return false;

// //       if (typeof column.customSearchValue === "function") {
// //         const value = column.customSearchValue(row);
// //         return value?.toString().toLowerCase().includes(searchTerm.toLowerCase());
// //       }

// //       const value = row[colField];
// //       return value?.toString().toLowerCase().includes(searchTerm.toLowerCase());
// //     });
// //   });

// //   const paginatedRows = pagination
// //     ? filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
// //     : filteredRows;

// //   const handleSelectRow = (rowValue) => {
// //     setSelectedRows((prev) => {
// //       const newSelected = prev.includes(rowValue)
// //         ? prev.filter((v) => v !== rowValue)
// //         : [...prev, rowValue];

// //       onSelectionChange?.(
// //         rows.filter((row) => newSelected.includes(row[uniqueKey]))
// //       );

// //       return newSelected;
// //     });
// //   };

// //   const handleSelectAll = (event) => {
// //     const currentPageRowIds = paginatedRows.map((row) => row[uniqueKey]);
// //     const newSelected = event.target.checked
// //       ? [...new Set([...selectedRows, ...currentPageRowIds])]
// //       : selectedRows.filter((id) => !currentPageRowIds.includes(id));

// //     setSelectedRows(newSelected);
// //     onSelectionChange?.(
// //       rows.filter((row) => newSelected.includes(row[uniqueKey]))
// //     );
// //   };

// //   const handleChangePage = (_, newPage) => setPage(newPage);

// //   const handleChangeRowsPerPage = (event) => {
// //     setRowsPerPage(parseInt(event.target.value, 10));
// //     setPage(0);
// //   };

// //   const handleSearchChange = (event) => {
// //     setSearchTerm(event.target.value);
// //     setPage(0);
// //   };

// //   /* ===================== UI ===================== */

// //   return (
// //     <Box>
// //       {/* Search Bar */}
// //       {search && (
// //         <Box
// //           display="flex"
// //           justifyContent="flex-end"
// //           alignItems="center"
// //           px={2}
// //           py={1.5}
// //         >
// //           <TextField
// //             size="small"
// //             placeholder={serachPlaceholder}
// //             value={searchTerm}
// //             onChange={handleSearchChange}
// //             sx={{
// //               width: 260,
// //               backgroundColor: '#fff',
// //               borderRadius: '8px',
// //               '& fieldset': {
// //                 borderColor: '#E5E7EB',
// //               },
// //               '& input': {
// //                 fontSize: '13px',
// //               },
// //             }}
// //             InputProps={{
// //               endAdornment: (
// //                 <InputAdornment position="end">
// //                   <SearchIcon fontSize="small" />
// //                 </InputAdornment>
// //               ),
// //             }}
// //           />
// //         </Box>
// //       )}

// //       {/* Table */}
// //       <Paper
// //         sx={{
// //           borderRadius: '12px',
// //           border: '1px solid #E5E7EB',
// //           boxShadow: 'none',
// //           overflow: 'hidden',
// //         }}
// //       >
// //         <TableContainer>
// //           <Table>
// //             <TableHead>
// //               <TableRow
// //                 sx={{
// //                   background: 'linear-gradient(90deg, #0B2ED6, #0A28B5)',
// //                   '& th:first-of-type': { borderTopLeftRadius: '10px' },
// //                   '& th:last-of-type': { borderTopRightRadius: '10px' },
// //                 }}
// //               >
// //                 {showCheckbox && (
// //                   <TableCell padding="checkbox">
// //                     <Checkbox
// //                       sx={{ color: '#fff' }}
// //                       checked={
// //                         paginatedRows.every((row) =>
// //                           selectedRows.includes(row[uniqueKey])
// //                         ) && paginatedRows.length > 0
// //                       }
// //                       indeterminate={
// //                         paginatedRows.some((row) =>
// //                           selectedRows.includes(row[uniqueKey])
// //                         ) &&
// //                         !paginatedRows.every((row) =>
// //                           selectedRows.includes(row[uniqueKey])
// //                         )
// //                       }
// //                       onChange={handleSelectAll}
// //                     />
// //                   </TableCell>
// //                 )}

// //                 {columns.map((column) => (
// //                   <TableCell
// //                     key={column.field}
// //                     align={column.align || 'left'}
// //                     sx={{
// //                       color: '#fff',
// //                       fontWeight: 600,
// //                       fontSize: '13px',
// //                       padding: '14px 16px',
// //                       borderBottom: 'none',
// //                       whiteSpace: 'nowrap',
// //                     }}
// //                   >
// //                     {column.headerName}
// //                   </TableCell>
// //                 ))}
// //               </TableRow>
// //             </TableHead>

// //             <TableBody>
// //               {paginatedRows.map((row) => (
// //                 <TableRow
// //                   key={row[uniqueKey]}
// //                   sx={{
// //                     '& td': {
// //                       borderBottom: '1px solid #E5E7EB',
// //                       padding: '14px 16px',
// //                       fontSize: '13px',
// //                     },
// //                     '&:hover': {
// //                       backgroundColor: '#F9FAFB',
// //                     },
// //                   }}
// //                 >
// //                   {showCheckbox && (
// //                     <TableCell padding="checkbox">
// //                       <Checkbox
// //                         checked={selectedRows.includes(row[uniqueKey])}
// //                         onChange={() => handleSelectRow(row[uniqueKey])}
// //                       />
// //                     </TableCell>
// //                   )}

// //                   {columns.map((column) => {
// //                     const cellValue = row[column.field];
// //                     return (
// //                       <TableCell
// //                         key={column.field}
// //                         align={column.align || 'left'}
// //                       >
// //                         {column.renderCell
// //                           ? column.renderCell(cellValue, row)
// //                           : cellValue}
// //                       </TableCell>
// //                     );
// //                   })}
// //                 </TableRow>
// //               ))}
// //             </TableBody>
// //           </Table>
// //         </TableContainer>

// //         {/* Pagination */}
// //         {pagination && (
// //           <TablePagination
// //             component="div"
// //             count={filteredRows.length}
// //             page={page}
// //             onPageChange={handleChangePage}
// //             rowsPerPage={rowsPerPage}
// //             rowsPerPageOptions={[5, 10, 25, 50]}
// //             onRowsPerPageChange={handleChangeRowsPerPage}
// //             sx={{
// //               borderTop: '1px solid #E5E7EB',
// //               '& .MuiTablePagination-actions button': {
// //                 border: '1px solid #E5E7EB',
// //                 borderRadius: '6px',
// //                 mx: '2px',
// //               },
// //             }}
// //           />
// //         )}
// //       </Paper>
// //     </Box>
// //   );
// // };

// // export default DataTable;




// import React, { useState } from 'react';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Checkbox,
//   TablePagination,
//   TextField,
//   Box,
//   InputAdornment,
//   IconButton,
//   Button,
// } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';
// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// import { useTheme } from '@mui/material/styles';

// const DataTable = ({
//   columns,
//   rows,
//   uniqueKey,
//   showCheckbox,
//   onSelectionChange,
//   search = false,
//   serachPlaceholder = "Search...",
//   searchColumns = [],
//   pagination = false,
// }) => {
//   const theme = useTheme();
//   const [selectedRows, setSelectedRows] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   /* ================= LOGIC (UNCHANGED) ================= */

//   const filteredRows = rows.filter((row) => {
//     if (!searchTerm) return true;

//     return searchColumns?.some((colField) => {
//       const column = columns.find((c) => c.field === colField);
//       if (!column) return false;

//       if (typeof column.customSearchValue === "function") {
//         const value = column.customSearchValue(row);
//         return value?.toString().toLowerCase().includes(searchTerm.toLowerCase());
//       }

//       const value = row[colField];
//       return value?.toString().toLowerCase().includes(searchTerm.toLowerCase());
//     });
//   });

//   const paginatedRows = pagination
//     ? filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//     : filteredRows;

//   const totalPages = Math.ceil(filteredRows.length / rowsPerPage);

//   const handleSelectRow = (rowValue) => {
//     setSelectedRows((prev) => {
//       const newSelected = prev.includes(rowValue)
//         ? prev.filter((v) => v !== rowValue)
//         : [...prev, rowValue];

//       onSelectionChange?.(
//         rows.filter((row) => newSelected.includes(row[uniqueKey]))
//       );

//       return newSelected;
//     });
//   };

//   const handleSelectAll = (event) => {
//     const currentPageRowIds = paginatedRows.map((row) => row[uniqueKey]);
//     const newSelected = event.target.checked
//       ? [...new Set([...selectedRows, ...currentPageRowIds])]
//       : selectedRows.filter((id) => !currentPageRowIds.includes(id));

//     setSelectedRows(newSelected);
//     onSelectionChange?.(
//       rows.filter((row) => newSelected.includes(row[uniqueKey]))
//     );
//   };

//   const handleChangePage = (_, newPage) => setPage(newPage);

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//     setPage(0);
//   };

//   /* ================= UI ================= */

//   return (
//     <Box>
//       {/* Search */}
//       {search && (
//         <Box display="flex" justifyContent="flex-end" px={2} py={1.5}>
//           <TextField
//             size="small"
//             placeholder={serachPlaceholder}
//             value={searchTerm}
//             onChange={handleSearchChange}
//             sx={{
//               width: 260,
//               backgroundColor: '#fff',
//               borderRadius: '8px',
//               '& fieldset': { borderColor: '#E5E7EB' },
//               '& input': { fontSize: '13px' },
//             }}
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <SearchIcon fontSize="small" />
//                 </InputAdornment>
//               ),
//             }}
//           />
//         </Box>
//       )}

//       {/* Table */}
//       <Paper
//         sx={{
//           borderRadius: '12px',
//           border: '1px solid #E5E7EB',
//           boxShadow: 'none',
//           overflow: 'hidden',
//         }}
//       >
//         <TableContainer>
//           <Table>
//             <TableHead>
//               <TableRow
//                 sx={{
//                   background: 'linear-gradient(90deg, #0B2ED6, #0A28B5)',
//                 }}
//               >
//                 {showCheckbox && (
//                   <TableCell padding="checkbox">
//                     <Checkbox sx={{ color: '#fff' }} />
//                   </TableCell>
//                 )}

//                 {columns.map((column) => (
//                   <TableCell
//                     key={column.field}
//                     align={column.align || 'left'}
//                     sx={{
//                       color: '#fff',
//                       fontWeight: 600,
//                       fontSize: '13px',
//                       padding: '14px 16px',
//                       borderBottom: 'none',
//                     }}
//                   >
//                     {column.headerName}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             </TableHead>

//             <TableBody>
//               {paginatedRows.map((row) => (
//                 <TableRow
//                   key={row[uniqueKey]}
//                   sx={{
//                     '& td': {
//                       borderBottom: '1px solid #E5E7EB',
//                       padding: '14px 16px',
//                       fontSize: '13px',
//                     },
//                     '&:hover': { backgroundColor: '#F9FAFB' },
//                   }}
//                 >
//                   {showCheckbox && (
//                     <TableCell padding="checkbox">
//                       <Checkbox
//                         checked={selectedRows.includes(row[uniqueKey])}
//                         onChange={() => handleSelectRow(row[uniqueKey])}
//                       />
//                     </TableCell>
//                   )}

//                   {columns.map((column) => (
//                     <TableCell key={column.field}>
//                       {column.renderCell
//                         ? column.renderCell(row[column.field], row)
//                         : row[column.field]}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>

//         {/* Footer */}
//         {pagination && (
//           <Box
//             display="flex"
//             justifyContent="space-between"
//             alignItems="center"
//             px={2}
//             py={1.5}
//             borderTop="1px solid #E5E7EB"
//           >
//             {/* Left info */}
//             <Box fontSize="13px" color="text.secondary">
//               Showing {page * rowsPerPage + 1} to{" "}
//               {Math.min((page + 1) * rowsPerPage, filteredRows.length)} of{" "}
//               {filteredRows.length} entries
//             </Box>

//             {/* Pagination buttons (SCREENSHOT STYLE) */}
//             <Box display="flex" alignItems="center" gap={0.5}>
//               <IconButton
//                 size="small"
//                 disabled={page === 0}
//                 onClick={() => setPage(page - 1)}
//               >
//                 <ChevronLeftIcon fontSize="small" />
//               </IconButton>

//               {Array.from({ length: totalPages }).map((_, i) => (
//                 <Button
//                   key={i}
//                   size="small"
//                   onClick={() => setPage(i)}
//                   sx={{
//                     minWidth: 34,
//                     height: 32,
//                     borderRadius: '6px',
//                     fontSize: '13px',
//                     backgroundColor: page === i ? '#2563EB' : 'transparent',
//                     color: page === i ? '#fff' : '#374151',
//                     border: '1px solid #E5E7EB',
//                     '&:hover': {
//                       backgroundColor:
//                         page === i ? '#2563EB' : '#F3F4F6',
//                     },
//                   }}
//                 >
//                   {i + 1}
//                 </Button>
//               ))}

//               <IconButton
//                 size="small"
//                 disabled={page >= totalPages - 1}
//                 onClick={() => setPage(page + 1)}
//               >
//                 <ChevronRightIcon fontSize="small" />
//               </IconButton>
//             </Box>
//           </Box>
//         )}
//       </Paper>
//     </Box>
//   );
// };

// export default DataTable;




import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  TextField,
  Box,
  InputAdornment,
  IconButton,
  Button,
  Select,
  MenuItem,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useTheme } from '@mui/material/styles';

const DataTable = ({
  columns,
  rows,
  uniqueKey,
  showCheckbox,
  onSelectionChange,
  search = false,
  serachPlaceholder = "Search...",
  searchColumns = [],
  pagination = false,
}) => {
  const theme = useTheme();
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  /* ================= LOGIC (UNCHANGED) ================= */

  const filteredRows = rows.filter((row) => {
    if (!searchTerm) return true;

    return searchColumns?.some((colField) => {
      const column = columns.find((c) => c.field === colField);
      if (!column) return false;

      if (typeof column.customSearchValue === "function") {
        const value = column.customSearchValue(row);
        return value?.toString().toLowerCase().includes(searchTerm.toLowerCase());
      }

      const value = row[colField];
      return value?.toString().toLowerCase().includes(searchTerm.toLowerCase());
    });
  });

  const paginatedRows = pagination
    ? filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    : filteredRows;

  const totalPages = Math.ceil(filteredRows.length / rowsPerPage);

  const handleSelectRow = (rowValue) => {
    setSelectedRows((prev) => {
      const newSelected = prev.includes(rowValue)
        ? prev.filter((v) => v !== rowValue)
        : [...prev, rowValue];

      onSelectionChange?.(
        rows.filter((row) => newSelected.includes(row[uniqueKey]))
      );

      return newSelected;
    });
  };

  const handleSelectAll = (event) => {
    const currentPageRowIds = paginatedRows.map((row) => row[uniqueKey]);
    const newSelected = event.target.checked
      ? [...new Set([...selectedRows, ...currentPageRowIds])]
      : selectedRows.filter((id) => !currentPageRowIds.includes(id));

    setSelectedRows(newSelected);
    onSelectionChange?.(
      rows.filter((row) => newSelected.includes(row[uniqueKey]))
    );
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  /* ================= UI ================= */

  let strLength="Pending Packages"
  return (
    <Box>
      {/* Top bar */}
      {search && (
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          px={2}
          py={1.5}
        >
          {/* Show per page */}
          {pagination && (
            <Box display="flex" alignItems="center" gap={1}>
              <Box fontSize="13px">Show</Box>
              <Select
                size="small"
                value={rowsPerPage}
                onChange={handleRowsPerPageChange}
                sx={{ fontSize: '13px', height: 34 }}
              >
                {[5, 10, 25, 50].map((n) => (
                  <MenuItem key={n} value={n}>
                    {n}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          )}

          {/* Search */}
          <TextField
            size="small"
            placeholder={serachPlaceholder}
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{
              width: 260,
              backgroundColor: '#fff',
              borderRadius: '8px',
              '& fieldset': { borderColor: '#E5E7EB' },
              '& input': { fontSize: '13px' },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
        </Box>
      )}

      {/* Table */}
      <Paper
        sx={{
          borderRadius: '12px',
          border: '1px solid #E5E7EB',
          boxShadow: 'none',
          overflow: 'hidden',
        }}
      >
        <TableContainer sx={{maxHeight:300,overflowY:"auto"}}>
          <Table>
            <TableHead>
              <TableRow
                sx={{
                  background: 'linear-gradient(90deg, #0B2ED6, #0A28B5)',
                }}
              >
                {showCheckbox && (
                  <TableCell padding="checkbox">
                    <Checkbox sx={{ color: '#fff' }} />
                  </TableCell>
                )}

                {columns.map((column) => (
                  <TableCell
                    key={column.field}
                    align={column.align || 'left'}
                    sx={{
                      color: '#fff',
                      fontWeight: 600,
                      fontSize: '13px',
                      padding: '14px 16px',
                      borderBottom: 'none',
                      minWidth: strLength.length >= column.headerName.length ? 170 : 140
                    }}
                  >
                    {column.headerName}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody className='overflow-y-auto' style={{height:"230px !important"}}>
              {paginatedRows.map((row) => (
                <TableRow
                  key={row[uniqueKey]}
                  sx={{
                    '& td': {
                      borderBottom: '1px solid #E5E7EB',
                      padding: '14px 16px',
                      fontSize: '13px',
                    },
                    '&:hover': { backgroundColor: '#F9FAFB' },
                  }}
                >
                  {showCheckbox && (
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedRows.includes(row[uniqueKey])}
                        onChange={() => handleSelectRow(row[uniqueKey])}
                      />
                    </TableCell>
                  )}

                  {columns.map((column) => (
                    <TableCell key={column.field}>
                      {column.renderCell
                        ? column.renderCell(row[column.field], row)
                        : row[column.field]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Footer */}
        {pagination && (
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            px={2}
            py={1.5}
            borderTop="1px solid #E5E7EB"
          >
            {/* Info */}
            <Box fontSize="13px" color="text.secondary">
              Showing {page * rowsPerPage + 1} to{' '}
              {Math.min((page + 1) * rowsPerPage, filteredRows.length)} of{' '}
              {filteredRows.length} entries
            </Box>

            {/* Pagination buttons */}
            <Box display="flex" alignItems="center" gap={0.5}>
              <IconButton
                size="small"
                disabled={page === 0}
                onClick={() => setPage(page - 1)}
              >
                <ChevronLeftIcon fontSize="small" />
              </IconButton>

              {Array.from({ length: totalPages }).map((_, i) => (
                <Button
                  key={i}
                  size="small"
                  onClick={() => setPage(i)}
                  sx={{
                    minWidth: 34,
                    height: 32,
                    borderRadius: '6px',
                    fontSize: '13px',
                    backgroundColor: page === i ? '#2563EB' : 'transparent',
                    color: page === i ? '#fff' : '#374151',
                    border: '1px solid #E5E7EB',
                    '&:hover': {
                      backgroundColor:
                        page === i ? '#2563EB' : '#F3F4F6',
                    },
                  }}
                >
                  {i + 1}
                </Button>
              ))}

              <IconButton
                size="small"
                disabled={page >= totalPages - 1}
                onClick={() => setPage(page + 1)}
              >
                <ChevronRightIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default DataTable;
