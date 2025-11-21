import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Slide,
  styled,
  Box,
  CircularProgress,
} from "@mui/material";
import { FaRegImage } from "react-icons/fa";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const HiddenInput = styled("input")({
  display: "none",
});

function ModalChacracter({loading ,handleImageChange, open, handleClose, error, handleChange,chacracter,addChacracter  }) {
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

      <DialogTitle>{chacracter.id ? "EDIT Chacracter" : "ADD Chacracter"}</DialogTitle>

      {/* Content */}
      <DialogContent>
        <TextField
          label="Name"
          name="name"
          fullWidth
          margin="normal"
          error={!!error.name}
          helperText={error.name}
          value={chacracter.name || ""}
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
          value={chacracter.description || ""}
          onChange={handleChange}
        />

        {/* Thêm TextField cho hình ảnh */}
         {/* Nút chọn file */}
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
        src={chacracter.imgUrl || "https://via.placeholder.com/150"}
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
        <Button  disabled={loading} // 🔹 Khi đang loading thì disable nút
          startIcon={loading && <CircularProgress size={20} color="inherit" />}  variant="contained" onClick={addChacracter}>
          {chacracter.id ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ModalChacracter;
