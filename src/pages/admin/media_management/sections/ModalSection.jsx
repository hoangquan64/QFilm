import React, { useContext } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Slide,
  Fade,
  TextField,
  Autocomplete,
  CircularProgress,
  Box,
} from "@mui/material";
import { MovieContext } from "../../../../contexts/MovieProvider";
import { FaRegImage } from "react-icons/fa";
import styled from "@emotion/styled";

// Hiệu ứng Transition
const Transition = React.forwardRef(function Transition(props, ref) {
  return (
    <Fade in={props.in} timeout={400}>
      <Slide direction="up" ref={ref} {...props} timeout={400} />
    </Fade>
  );
});

const HiddenInput = styled("input")({
  display: "none",
});

export default function AddSectionDialog({
  loading,
  handleImageChange,
  open,
  section,
  handleClose,
  error,
  handleChange,
  addSection,
}) {
  const movies = useContext(MovieContext);// ✅ tránh lỗi undefined khi MovieContext chưa sẵn sàng

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      TransitionComponent={Transition}
      keepMounted
    >
      {/* Tiêu đề */}
      <DialogTitle>{section.id ? "Edit Section" : "Add Section"}</DialogTitle>

      {/* Nội dung */}
      <DialogContent>
        {/* Tên Section */}
        <TextField
          label="Name"
          name="name"
          fullWidth
          margin="normal"
          error={!!error.name}
          helperText={error.name}
          value={section.name || ""}
          onChange={handleChange}
        />

        {/* Mô tả */}
        <TextField
          label="Description"
          name="description"
          fullWidth
          multiline
          margin="normal"
          error={!!error.description}
          helperText={error.description}
          value={section.description || ""}
          onChange={handleChange}
        />

        {/* Movie liên kết */}
        <Autocomplete
          options={movies || []}
          getOptionLabel={(option) => option.name || ""}
          disablePortal
          fullWidth
          sx={{ mt: 2 ,mb:2 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Find movie"
            />
          )}
          error={!!error.movieID}
          helperText={error.movieID}
          onChange={(event, value) => handleChange({
            target: { name: "movieID", value: value ? value.id : "" },
          })}
        />


        {/* Upload ảnh */}
        <label  htmlFor="upload-button-file">
          <HiddenInput
            accept="image/*"
            id="upload-button-file"
            type="file"
            onChange={handleImageChange}
          />
          <Button
            variant="contained"
            component="span"
            startIcon={<FaRegImage />}
          >
            Chọn ảnh
          </Button>
        </label>
        <Box
          component="img"
          src={section.imgUrl || "https://via.placeholder.com/150"}
          alt="Preview"
          sx={{ mt:2,
            width: 150,
            height: 150,
            objectFit: "cover",
            borderRadius: 2,
            boxShadow: 2,
            border: "2px solid #ddd",
            margin: "auto"
          }}
        />
      </DialogContent>

      {/* Hành động */}
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button disabled={loading} // 🔹 Khi đang loading thì disable nút
          startIcon={loading && <CircularProgress size={20} color="inherit" />} variant="contained" onClick={addSection}>
          {section.id ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
