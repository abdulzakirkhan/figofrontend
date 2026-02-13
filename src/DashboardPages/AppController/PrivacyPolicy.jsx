// import React from 'react'

// const PrivacyPolicy = () => {
//   return (
//     <div>PrivacyPolicy</div>
//   )
// }

// export default PrivacyPolicy




import React, { useMemo, useState } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Switch,
  FormControlLabel,
  MenuItem,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import DataTable from "../../components/Table/DataTable";
import AppLoader from "../../components/Loader/AppLoader";

import {
    useListLegalContentQuery,
    useCreateLegalContentMutation,
    useUpdateLegalContentMutation,
    useDeleteLegalContentMutation,
} from "../../redux/appControll/appControlMouduleApi";

export default function PrivacyPolicy() {
  /* ---------------- API ---------------- */
  const { data, isLoading } = useListLegalContentQuery();
  const [createLegal] = useCreateLegalContentMutation();
  const [updateLegal] = useUpdateLegalContentMutation();
  const [deleteLegal] = useDeleteLegalContentMutation();

 
  /* ---------------- STATE ---------------- */
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("create"); // create | edit | view

  const [form, setForm] = useState({
    _id: null,
    type: "privacy",
    title: "",
    content: "",
    isActive: true,
  });

  /* ---------------- HELPERS ---------------- */
  const resetForm = () => {
    setForm({
      _id: null,
      type: "privacy",
      title: "",
      content: "",
      isActive: true,
    });
  };

  const openCreate = () => {
    resetForm();
    setMode("create");
    setOpen(true);
  };

  const openEdit = (row) => {
    setForm({ ...row.raw });
    setMode("edit");
    setOpen(true);
  };

  const openView = (row) => {
    setForm({ ...row.raw });
    setMode("view");
    setOpen(true);
  };

  const handleSubmit = async () => {
    const payload = {
      type: form.type,
      title: form.title,
      content: form.content,
      isActive: form.isActive,
    };

    if (!payload.content) {
      alert("Content is required");
      return;
    }

    if (mode === "edit") {
      await updateLegal({ id: form._id, ...payload });
    } else {
      await createLegal(payload);
    }

    setOpen(false);
    resetForm();
  };

  const handleDelete = async (row) => {
    if (!window.confirm("Delete this item?")) return;
    await deleteLegal(row.raw._id);
  };

  /* ---------------- ROWS ---------------- */
  const rows = useMemo(() => {
    return (data?.data || []).map((item, index) => ({
      id: item._id,
      sl: index + 1,
      type: item.type === "privacy" ? "Privacy Policy" : "Terms & Conditions",
      title: item.title,
      status: item.isActive ? "Active" : "Inactive",
      raw: item,
    }));
  }, [data]);

  /* ---------------- COLUMNS ---------------- */
  const columns = [
    {
      field: "sl",
      headerName: "S.L",
      renderCell: (v) => v.toString().padStart(2, "0"),
    },
    { field: "type", headerName: "Type" },
    { field: "title", headerName: "Title" },
    {
      field: "status",
      headerName: "Status",
      renderCell: (value) => (
        <Chip
          size="small"
          label={value}
          color={value === "Active" ? "success" : "error"}
        />
      ),
      customSearchValue: (row) => row.status,
    },
    {
      field: "actions",
      headerName: "Action",
      sortable: false,
      filterable: false,
      renderCell: (_, row) => (
        <>
          <IconButton size="small" onClick={() => openView(row)}>
            <VisibilityIcon color="primary" />
          </IconButton>

          <IconButton size="small" onClick={() => openEdit(row)}>
            <EditIcon color="secondary" />
          </IconButton>

          <IconButton size="small" onClick={() => handleDelete(row)}>
            <DeleteIcon color="error" />
          </IconButton>
        </>
      ),
    },
  ];

  if (isLoading) return <AppLoader fullPage />;


  const cardStyle = {
  border: "1px solid #E5E7EB",
  borderRadius: 2,
  p: 2,
  mb: 2,
  backgroundColor: "#fff",
};

const dialogTitleStyle = {
  textAlign: "center",
  fontWeight: 700,
  fontSize: 22,
  background: "linear-gradient(90deg, #6A1B9A, #D81B60)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

const footerStyle = {
  display: "flex",
  justifyContent: "flex-end",
  gap: 1,
  px: 3,
  py: 2,
  borderTop: "1px solid #eee",
};


  /* ---------------- UI ---------------- */
  return (
    <div style={{ padding: 16 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h5" fontWeight="bold">
          Legal Content
        </Typography>

        <Button variant="contained" onClick={openCreate}>
          Add Content
        </Button>
      </Box>

      <DataTable
        columns={columns}
        rows={rows}
        uniqueKey="id"
        search
        serachPlaceholder="Search legal content..."
        searchColumns={["type", "title", "status"]}
        pagination
      />

      {/* ---------------- MODAL ---------------- */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
    <DialogTitle>
  <Typography sx={dialogTitleStyle}>
    {mode === "view"
      ? "View Legal Content"
      : mode === "edit"
      ? "Edit Legal Content"
      : "Create Legal Content"}
  </Typography>

  <Typography
    variant="body2"
    align="center"
    color="text.secondary"
  >
    Manage privacy policy & terms with full control
  </Typography>
</DialogTitle>



<DialogContent sx={{ backgroundColor: "#F9FAFB" }}>
  {/* BASIC INFORMATION */}
  <Box sx={cardStyle}>
    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
      <Typography fontWeight={600}>Basic Information</Typography>
      <Chip
        size="small"
        label="Required"
        color="primary"
        sx={{ ml: 1 }}
      />
    </Box>

    <TextField
      select
      fullWidth
      label="Content Type"
      margin="normal"
      value={form.type}
      disabled={mode !== "create"}
      onChange={(e) =>
        setForm((p) => ({ ...p, type: e.target.value }))
      }
    >
      <MenuItem value="privacy">Privacy Policy</MenuItem>
      <MenuItem value="terms">Terms & Conditions</MenuItem>
    </TextField>

    <TextField
      fullWidth
      label="Title"
      margin="normal"
      value={form.title}
      disabled={mode === "view"}
      onChange={(e) =>
        setForm((p) => ({ ...p, title: e.target.value }))
      }
    />
  </Box>

  {/* CONTENT SECTION */}
  <Box sx={cardStyle}>
    <Typography fontWeight={600} mb={1}>
      Content Details
    </Typography>

    <TextField
      fullWidth
      label="Content"
      margin="normal"
      multiline
      rows={8}
      value={form.content}
      disabled={mode === "view"}
      onChange={(e) =>
        setForm((p) => ({ ...p, content: e.target.value }))
      }
    />
  </Box>

  {/* SETTINGS */}
  <Box sx={cardStyle}>
    <Typography fontWeight={600} mb={1}>
      Status
    </Typography>

    <FormControlLabel
      control={
        <Switch
          checked={form.isActive}
          disabled={mode === "view"}
          onChange={(e) =>
            setForm((p) => ({ ...p, isActive: e.target.checked }))
          }
        />
      }
      label={
        <Box>
          <Typography fontWeight={500}>Active</Typography>
          <Typography variant="caption" color="text.secondary">
            Show or hide this content in app
          </Typography>
        </Box>
      }
    />
  </Box>
</DialogContent>



<DialogActions sx={footerStyle}>
  <Button
    variant="outlined"
    onClick={() => setOpen(false)}
  >
    Cancel
  </Button>

  {mode !== "view" && (
    <Button
      variant="contained"
      sx={{
        background:
          "linear-gradient(90deg, #6A1B9A, #D81B60)",
      }}
      onClick={handleSubmit}
    >
      {mode === "edit" ? "Update Content" : "Create Content"}
    </Button>
  )}
</DialogActions>



      </Dialog>
    </div>
  );
}
