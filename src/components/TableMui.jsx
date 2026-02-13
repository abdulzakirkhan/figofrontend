import React, { useContext } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { ThemeContext } from "../contexts/ThemeContext";

export default function TableMui({
  th,
  td,
  styleTableContainer,
  customFields,
  loading,
  cellStyles,
}) {
  const { theme } = useContext(ThemeContext);

  const isDark = theme === "dark";

  const headerBg = isDark ? "#0f1724" : "#0023D0"; // dark vs brand
  const headerText = "#fff";
  const rowBg = isDark ? "#0b1220" : "#fff";
  const cellText = isDark ? "#E6EEF8" : "#333";
  const borderColor = isDark ? "#1f2937" : "#E5E7EB";
  const containerBg = isDark ? "transparent" : "";

  const found = (key) => customFields?.find((obj) => obj.name === key);

  return (
    <TableContainer
      style={{
        background: containerBg,
        padding: "20px",
        borderRadius: "12px",
        // border: "1px solid #E5E7EB",
        ...styleTableContainer,
      }}
    >
      <Table
      // className="border rounded-xl"
        aria-label="custom table"
        style={{
          // borderSpacing: "0 12px",
          borderCollapse: "separate",

        }}
      >
        <Header th={th} headerBg={headerBg} headerText={headerText} />

        {!loading && (
          <TableBody>
            {td?.map((row, index) => (
              <MuiTableRow
                key={index}
                row={row}
                index={index}
                th={th}
                found={found}
                customFields={customFields}
                cellStyles={cellStyles}
                rowBg={rowBg}
                cellText={cellText}
                borderColor={borderColor}
              />
            ))}
          </TableBody>
        )}
      </Table>
    </TableContainer>
  );
}

const MuiTableRow = ({ row, th, index, found, customFields, cellStyles, rowBg, cellText, borderColor }) => {
  return (
    <TableRow
      sx={{
        background: rowBg,
        // borderRadius: "10px",
        boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
        "& td:first-of-type": {
          // borderRadius: "10px 0 0 10px",
        },
        "& td:last-of-type": {
          // borderRadius: "0 10px 10px 0",
        },
      }}
    >
      {Object.keys(th).map((key, ind) => (
        <TableCell
          key={ind}
          align="left"
          sx={{
            padding: "12px 18px",
            color: cellStyles?.[key]?.color || cellText,
            fontSize: "13px",
            borderTop: `1px solid ${borderColor}`,
            borderBottom: `1px solid ${borderColor}`,
             whiteSpace: "nowrap",
            ...(cellStyles?.[key] || {}),
          }}
        >
          {customFields && found(key)
            ? found(key).data(row[key], row)
            : getNestedValue(row, key)}

        </TableCell>
      ))}
    </TableRow>
  );
};

const Header = ({ th, headerBg, headerText }) => {
  return (
    <TableHead
      sx={{
        background: headerBg,
        "& th": {
          color: headerText,
          padding: "14px 18px",
          fontWeight: "600",
          fontSize: "13px",
          whiteSpace: "nowrap",
        },
        "& th:first-of-type": {
          borderRadius: "10px 0 0 0px",
        },
        "& th:last-of-type": {
          borderRadius: "0 10px 0px 0",
        },
      }}
    >
      <TableRow>
        {Object.entries(th).map(([key, value], index) => (
          <TableCell key={index} align="left">
            {value}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

const getNestedValue = (obj, key) => {
  const keys = key.split(".");
  return keys.reduce(
    (acc, currentKey) =>
      acc && acc[currentKey] !== undefined ? acc[currentKey] : "",
    obj
  );
};
