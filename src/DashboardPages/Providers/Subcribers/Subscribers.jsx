import React, { useMemo } from "react";

import { useListSubscriberQuery } from "../../../redux/ProvidersApi/providersApi";
import { Chip } from "@mui/material";
import DataTable from "../../../components/Table/DataTable";
import { useNavigate } from "react-router-dom";
import AppLoader from "../../../components/Loader/AppLoader";

export const Subscribers = () => {
  const { data = [], isLoading } = useListSubscriberQuery();
  const navigate = useNavigate();

  const rows = useMemo(() => {
    return data.map((item, index) => ({
      sl: index + 1, // 👈 SERIAL NUMBER

      subscriberId: item.subscriberId,
      iccid: item.imsiList?.[0]?.iccid || "--",
      imsi: item.imsiList?.[0]?.imsi || "--",
      phone: item.phoneNumberList?.[0]?.phoneNumber || "--",

      simStatus: item.sim?.status || "--",
      esim: item.sim?.esim ? "Yes" : "No",
      activationCode: item.sim?.activationCode || "--",

      activationDate: item.activationDate || "--",
      lastUsageDate: item.lastUsageDate || "--",

      mccmnc:
        item.lastMcc && item.lastMnc
          ? `${item.lastMcc}/${item.lastMnc}`
          : "--",

      account: item.account || "--",
      reseller: item.reseller || "--",
    }));
  }, [data]);

  const columns = [
    { field: "sl", headerName: "S.L" }, // 👈 COLUMN ADDED
    { field: "subscriberId", headerName: "Subscriber ID" },
    { field: "iccid", headerName: "ICCID" },
    { field: "imsi", headerName: "IMSI" },
    { field: "phone", headerName: "Phone" },
    {
      field: "simStatus",
      headerName: "SIM Status",
      renderCell: (value) => (
        <Chip
          size="small"
          label={value}
          color={value === "AFFECTED" ? "success" : "default"}
        />
      ),
    },
    { field: "esim", headerName: "eSIM" },
    { field: "activationCode", headerName: "Activation Code" },
    { field: "activationDate", headerName: "Activated At" },
    { field: "lastUsageDate", headerName: "Last Usage" },
    { field: "mccmnc", headerName: "MCC/MNC" },
    { field: "account", headerName: "Account" },
    { field: "reseller", headerName: "Reseller" },
    {
  field: "actions",
  align:"center",
  headerName: "Action",
  renderCell: (_, row) => (
    <img
      src="/eye.png"
      alt="view"
      style={{ cursor: "pointer", width: 18 }}
      onClick={() =>
        navigate(
          `/admin/providers/subscribers/${row.imsi}`,
          { state: { imsi: row.imsi } }
        )
      }
    />
  ),
}

  ];

  if (isLoading) return <AppLoader fullPage />;

  return (
    <DataTable
      columns={columns}
      rows={rows}
      uniqueKey="subscriberId"
      search
      searchColumns={[
        "subscriberId",
        "iccid",
        "imsi",
        "phone",
        "activationCode",
        "account",
      ]}
      pagination
    />
    
  );
};

export default Subscribers;
