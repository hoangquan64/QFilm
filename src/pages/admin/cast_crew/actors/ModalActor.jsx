import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Slide,
  CircularProgress,
  Box,
} from "@mui/material";
import { FaRegImage } from "react-icons/fa";
import styled from "@emotion/styled";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const HiddenInput = styled("input")({
  display: "none",
});

function ModalActor({handleImageChange,loading, open, handleClose, error, handleChange, actor, addActor }) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      TransitionComponent={Transition}
      keepMounted
    >
      {/* Title */}
      <DialogTitle>{actor.id ? "Edit Actor" : "Add Actor"}</DialogTitle>

      {/* Content */}
      <DialogContent>
        <TextField
          label="Name"
          name="name"
          fullWidth
          margin="normal"
          error={!!error.name}
          helperText={error.name}
          value={actor.name || ""}
          onChange={handleChange}
        />

        <TextField
          label="Description"
          name="description"
          fullWidth
          multiline
          rows={3}
          margin="normal"
          error={!!error.description}
          helperText={error.description}
          value={actor.description || ""}
          onChange={handleChange}
        />

        {/* Thêm TextField cho hình ảnh */}
        <label htmlFor="upload-button-file">
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
          src={actor.imgUrl || "https://via.placeholder.com/150"}
          alt="Preview"
          sx={{
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

      {/* Actions */}
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button disabled={loading} // 🔹 Khi đang loading thì disable nút
                  startIcon={loading && <CircularProgress size={20} color="inherit" />} variant="contained" onClick={addActor}>
          {actor.id ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ModalActor;
