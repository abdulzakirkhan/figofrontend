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
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import DataTable from "../../components/Table/DataTable";
import AppLoader from "../../components/Loader/AppLoader";

import {
  useListBannersQuery,
  useCreateBannerMutation,
  useUpdateBannerMutation,
  useDeleteBannerMutation,
} from "../../redux/appControll/appControlMouduleApi";

export default function AppBanner() {
  /* -------------------- API -------------------- */
  const { data, isLoading } = useListBannersQuery(false);
  const [createBanner] = useCreateBannerMutation();
  const [updateBanner] = useUpdateBannerMutation();
  const [deleteBanner] = useDeleteBannerMutation();

  /* -------------------- STATE -------------------- */
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("create"); // create | edit | view

  const [form, setForm] = useState({
    _id: null,
    title: "",
    description: "",
    sortOrder: 1,
    isActive: true,
  });

  /* -------------------- ROWS -------------------- */
  const rows = useMemo(() => {
    return (data?.data || []).map((item, index) => ({
      id: item._id,
      sl: index + 1,
      title: item.title,
      description: item.description,
      sortOrder: item.sortOrder,
      status: item.isActive ? "Active" : "Inactive",
      raw: item,
    }));
  }, [data]);

  /* -------------------- HANDLERS -------------------- */
  const resetForm = () => {
    setForm({
      _id: null,
      title: "",
      description: "",
      sortOrder: 1,
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
      title: form.title,
      description: form.description,
      sortOrder: Number(form.sortOrder),
      isActive: form.isActive,
    };

    if (mode === "edit") {
      await updateBanner({ id: form._id, ...payload });
    } else {
      await createBanner(payload);
    }

    setOpen(false);
    resetForm();
  };

  const handleDelete = async (row) => {
    if (!window.confirm("Delete this banner?")) return;
    await deleteBanner(row.raw._id);
  };

  /* -------------------- COLUMNS -------------------- */
  const columns = [
    {
      field: "sl",
      headerName: "S.L",
      renderCell: (v) => v.toString().padStart(2, "0"),
    },
    { field: "title", headerName: "Title" },
    { field: "description", headerName: "Description" },
    { field: "sortOrder", headerName: "Order" },
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


  /* -------------------- UI -------------------- */
  return (
    <div style={{ padding: 16 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h5" fontWeight="bold">
          App Banners
        </Typography>

        <Button variant="contained" onClick={openCreate}>
          Add Banner
        </Button>
      </Box>

      <DataTable
        columns={columns}
        rows={rows}
        uniqueKey="id"
        search
        serachPlaceholder="Search banners..."
        searchColumns={["title", "description", "status"]}
        pagination
      />

      {/* ---------------- MODAL ---------------- */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
       <DialogTitle>
  <Typography sx={dialogTitleStyle}>
    {mode === "view"
      ? "View Banner"
      : mode === "edit"
      ? "Edit Banner"
      : "Create Banner"}
  </Typography>

  <Typography
    variant="body2"
    align="center"
    color="text.secondary"
  >
    Configure app banner with full control
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
      fullWidth
      label="Title"
      margin="normal"
      value={form.title}
      disabled={mode === "view"}
      onChange={(e) =>
        setForm((p) => ({ ...p, title: e.target.value }))
      }
    />

    <TextField
      fullWidth
      label="Description"
      margin="normal"
      multiline
      rows={3}
      value={form.description}
      disabled={mode === "view"}
      onChange={(e) =>
        setForm((p) => ({ ...p, description: e.target.value }))
      }
    />
  </Box>

  {/* SETTINGS */}
  <Box sx={cardStyle}>
    <Typography fontWeight={600} mb={1}>
      Banner Settings
    </Typography>

    <TextField
      fullWidth
      label="Sort Order"
      type="number"
      margin="normal"
      value={form.sortOrder}
      disabled={mode === "view"}
      onChange={(e) =>
        setForm((p) => ({ ...p, sortOrder: e.target.value }))
      }
    />

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
            Enable or disable this banner
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
      {mode === "edit" ? "Update Banner" : "Create Banner"}
    </Button>
  )}
</DialogActions>

      </Dialog>
    </div>
  );
}
