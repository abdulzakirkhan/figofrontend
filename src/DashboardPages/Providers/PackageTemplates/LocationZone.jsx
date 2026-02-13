import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "../../../components/Table/DataTable";
import { Chip, Box, Stack } from "@mui/material";
import { useListDetailedLocationZoneQuery }
  from "../../../redux/ProvidersApi/providersApi";
import AppLoader from "../../../components/Loader/AppLoader";

const LocationZone = () => {
  const navigate = useNavigate();
  const { data = [], isLoading } = useListDetailedLocationZoneQuery();

  const columns = [
    {
      field: "zoneName",
      headerName: "Zone",
    },
    {
      field: "countries",
      headerName: "Countries",
      align: "center",
      renderCell: (value) => (
        <Chip label={value} size="small" color="primary" />
      ),
    },
    {
      field: "operators",
      headerName: "Operators",
      align: "center",
      renderCell: (value) => (
        <Chip label={value} size="small" color="secondary" />
      ),
    },
    {
      field: "operatorNames",
      headerName: "Operator Names",
      renderCell: (value) => (
        <Stack direction="row" spacing={0.5} flexWrap="wrap">
          {value.map((name) => (
            <Chip
              key={name}
              label={name}
              size="small"
              variant="outlined"
            />
          ))}
        </Stack>
      ),
    },
  
  ];

  const rows = useMemo(() => {
    return data.map((zone) => ({
      id: zone.zoneId,
      raw: zone,
      zoneName: zone.zoneName,
      countries: new Set(
        zone.operators.map((op) => op.countryName)
      ).size,
      operators: zone.operators.length,
      operatorNames: zone.operators.map(
        (op) => op.operatorName
      ),
    }));
  }, [data]);

  if (isLoading) return <AppLoader fullPage />;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-3">Location Zones</h1>

      <DataTable
        columns={columns}
        rows={rows}
        uniqueKey="id"
        search
        pagination
        searchColumns={["zoneName"]}
      />
    </div>
  );
};

export default LocationZone;
