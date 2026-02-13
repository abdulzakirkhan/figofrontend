import React from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Divider,
  Box,
  Button,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function PackageTemplateDetail() {
  const { state } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();

  if (!state) {
    return <Typography>No data found for package #{id}</Typography>;
  }

  const dataGB = (state.databyte / 1024 / 1024 / 1024).toFixed(2);

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
          {state.prepaidpackagetemplatename}
        </Typography>

        <Chip
          label={state.deleted ? "Disabled" : "Enabled"}
          color={state.deleted ? "error" : "success"}
          size="small"
        />
      </Box>

      <Card>
        <CardContent>
          {/* GENERAL INFO */}
          <Typography variant="h6" gutterBottom>
            General Information
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <strong>Template ID:</strong> {state.prepaidpackagetemplateid}
            </Grid>
            <Grid item xs={12} md={6}>
              <strong>Reseller:</strong> {state.reseller?.resellername}
            </Grid>
            <Grid item xs={12} md={6}>
              <strong>Sponsor:</strong> {state.sponsors?.displayname}
            </Grid>
            <Grid item xs={12} md={6}>
              <strong>Location Zone:</strong>{" "}
              {state.rdbLocationZones?.locationzonename}
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          {/* DATA & VALIDITY */}
          <Typography variant="h6" gutterBottom>
            Package Details
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <strong>Data Allowance:</strong> {dataGB} GB
            </Grid>
            <Grid item xs={12} md={4}>
              <strong>Validity:</strong> {state.perioddays} Days
            </Grid>
            <Grid item xs={12} md={4}>
              <strong>Recurring:</strong>{" "}
              {state.recurring ? "Yes" : "No"}
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          {/* BILLING */}
          <Typography variant="h6" gutterBottom>
            Billing & Pricing
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <strong>Price:</strong> ${state.cost}
            </Grid>
            <Grid item xs={12} md={4}>
              <strong>Priority:</strong> {state.priority}
            </Grid>
            <Grid item xs={12} md={4}>
              <strong>UI Visible:</strong>{" "}
              {state.uiVisible ? "Yes" : "No"}
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          {/* TECH FLAGS */}
          <Typography variant="h6" gutterBottom>
            Technical Flags
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <strong>Throttling Active:</strong>{" "}
              {state.throttlingActive ? "Yes" : "No"}
            </Grid>
            <Grid item xs={12} md={4}>
              <strong>Throttle Till End:</strong>{" "}
              {state.throttleTillEnd ? "Yes" : "No"}
            </Grid>
            <Grid item xs={12} md={4}>
              <strong>Report Units:</strong>{" "}
              {state.reportUnitsPreviousPackage ? "Yes" : "No"}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}
