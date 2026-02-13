import React from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  Grid,
  Typography,
  Chip,
  Divider,
  Box,
  Stack,
   Button
} from "@mui/material";
import { useGetSingleSubscriberQuery } from
  "../../../redux/ProvidersApi/providersApi";
  import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";
import AppLoader from "../../../components/Loader/AppLoader";


const Label = ({ title, value }) => (
  <Box>
    <Typography variant="caption" color="text.secondary">
      {title}
    </Typography>
    <Typography variant="body2" fontWeight={500}>
      {value || "--"}
    </Typography>
  </Box>
);

const SubscriberDetail = () => {
  const { imsi } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useGetSingleSubscriberQuery(imsi);

  if (isLoading) return <AppLoader fullPage />;
  if (!data) return <p>No subscriber found</p>;

  return (
    <Box p={3}>
{/* Header */}
<Box display="flex" alignItems="center" mb={2} gap={2}>
  <Button
    startIcon={<ArrowBackIcon />}
    onClick={() => navigate(-1)}
  >
    Back
  </Button>

  <Typography variant="h5" fontWeight="bold">
    Subscriber Details
  </Typography>

  <Chip
    label={data.sim?.status}
    color={data.sim?.status === "AFFECTED" ? "success" : "default"}
    size="small"
  />
</Box>



      {/* BASIC INFO */}
      <Card sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" mb={2}>
          Basic Information
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={4}><Label title="Subscriber ID" value={data.subscriberId} /></Grid>
          <Grid item xs={4}><Label title="IMSI" value={data.imsiList?.[0]?.imsi} /></Grid>
          <Grid item xs={4}><Label title="ICCID" value={data.imsiList?.[0]?.iccid} /></Grid>

          <Grid item xs={4}><Label title="Phone Number" value={data.phoneNumberList?.[0]?.phoneNumber} /></Grid>
          <Grid item xs={4}><Label title="Batch ID" value={data.batchId} /></Grid>
          <Grid item xs={4}><Label title="Prepaid" value={data.prepaid ? "Yes" : "No"} /></Grid>

          <Grid item xs={4}><Label title="Account" value={data.account} /></Grid>
          <Grid item xs={4}><Label title="Reseller" value={data.reseller} /></Grid>
          <Grid item xs={4}><Label title="Balance" value={data.balance} /></Grid>
        </Grid>
      </Card>

      {/* SIM INFO */}
      <Card sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" mb={2}>
          SIM Information
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={3}><Label title="eSIM" value={data.sim?.esim ? "Yes" : "No"} /></Grid>
          <Grid item xs={3}><Label title="Status" value={data.sim?.status} /></Grid>
          <Grid item xs={3}><Label title="Affected At" value={data.sim?.affectationDateUtc} /></Grid>
          <Grid item xs={3}><Label title="SM-DP+" value={data.sim?.smdpServer} /></Grid>

          <Grid item xs={6}><Label title="Activation Code" value={data.sim?.activationCode} /></Grid>

          <Grid item xs={3}><Label title="PIN1" value={data.sim?.pin1} /></Grid>
          <Grid item xs={3}><Label title="PUK1" value={data.sim?.puk1} /></Grid>
          <Grid item xs={3}><Label title="PIN2" value={data.sim?.pin2} /></Grid>
          <Grid item xs={3}><Label title="PUK2" value={data.sim?.puk2} /></Grid>
        </Grid>
      </Card>

      {/* USAGE & PERMISSIONS */}
      <Card sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" mb={2}>
          Usage & Permissions
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={4}><Label title="Activation Date" value={data.activationDate} /></Grid>
          <Grid item xs={4}><Label title="Last Usage" value={data.lastUsageDate} /></Grid>
          <Grid item xs={4}><Label title="Use Account for Charging" value={data.useAccountForCharging ? "Yes" : "No"} /></Grid>

          <Grid item xs={3}><Label title="Data Allowed" value={data.allowedData ? "Yes" : "No"} /></Grid>
          <Grid item xs={3}><Label title="MOC Allowed" value={data.allowedMoc ? "Yes" : "No"} /></Grid>
          <Grid item xs={3}><Label title="MTC Allowed" value={data.allowedMtc ? "Yes" : "No"} /></Grid>
          <Grid item xs={3}><Label title="SMS Allowed" value={data.allowedMosms ? "Yes" : "No"} /></Grid>
        </Grid>
      </Card>

      {/* NETWORK INFO */}
      <Card sx={{ p: 3 }}>
        <Typography variant="h6" mb={2}>
          Network Information
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={4}><Label title="Device Model" value={data.networkInfo?.model} /></Grid>
          <Grid item xs={4}><Label title="IMEI" value={data.networkInfo?.lastImei} /></Grid>
          <Grid item xs={4}><Label title="RAT" value={data.networkInfo?.lastRat} /></Grid>

          <Grid item xs={4}><Label title="MCC" value={data.networkInfo?.lastMcc} /></Grid>
          <Grid item xs={4}><Label title="MNC" value={data.networkInfo?.lastMnc} /></Grid>
          <Grid item xs={4}><Label title="Cell ID" value={data.networkInfo?.lastCellId} /></Grid>
        </Grid>
      </Card>
    </Box>
  );
};

export default SubscriberDetail;
