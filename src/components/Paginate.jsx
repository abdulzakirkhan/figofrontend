import React from "react";
import { Box, Pagination } from "@mui/material";

const Paginate = ({ count, limit = 10, onChange, defaultNumber = 1 }) => {
  if (count === 0) return null;

  const totalPages = Math.ceil(count / limit);

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" mt={4} mb={2}>
      {/* Left text: Showing X to Y of Z entries */}
      <Box color="#6c757d" fontSize="0.875rem">
        Showing {Math.min((defaultNumber - 1) * limit + 1, count)} to{" "}
        {Math.min(defaultNumber * limit, count)} of {count} entries
      </Box>

      {/* Pagination */}
      <Pagination
        count={totalPages}
        page={defaultNumber}
        onChange={onChange}
        siblingCount={1}
        boundaryCount={1}
        shape="rounded"
        showFirstButton
        showLastButton
        sx={{
          "& .MuiPagination-ul": {
            gap: "4px",
          },
          "& .MuiPaginationItem-root": {
            margin: 0,
            width: "36px",
            height: "36px",
            fontSize: "0.875rem",
            fontWeight: 500,
            color: "#6c757d",
            border: "1px solid #dee2e6",
            borderRadius: "4px",
            backgroundColor: "#fff",
            "&:hover": {
              backgroundColor: "#f8f9fa",
              borderColor: "#adb5bd",
            },
            "&.Mui-selected": {
              backgroundColor: "#0d6efd",
              color: "#fff",
              borderColor: "#0d6efd",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#0b5ed7",
                borderColor: "#0a58ca",
              },
            },
            "&.MuiPaginationItem-ellipsis": {
              border: "none",
              background: "transparent",
              "&:hover": {
                background: "transparent",
              },
            },
            // Navigation arrows (<<, <, >, >>)
            "&.MuiPaginationItem-previousNext, &.MuiPaginationItem-firstLast": {
              color: "#6c757d",
              border: "1px solid #dee2e6",
              "&:hover": {
                backgroundColor: "#f8f9fa",
              },
            },
          },
        }}
      />
    </Box>
  );
};

export default Paginate;