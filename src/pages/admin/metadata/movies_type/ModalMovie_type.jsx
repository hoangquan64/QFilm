import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Slide,
  Fade,
} from "@mui/material";

// Tạo Transition kết hợp Slide + Fade
const Transition = React.forwardRef(function Transition(props, ref) {
  return (
    <Fade in={props.in} timeout={400}>
      <Slide direction="up" ref={ref} {...props} timeout={400} />
    </Fade>
  );
});

function ModalMovieType({ open, handleClose ,handleChange,movieType,error,addMovie_type}) {
  
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
      <DialogTitle>{movieType.id ? "EDIT Movie_Type":"ADD Movies_Type"}</DialogTitle>

      {/* Content */}
      <DialogContent>
        <TextField
          label="Name"
          name="name"
          fullWidth
          margin="normal"
        error={!!error.name}
        helperText={error.name}
          value={movieType.name || ""}
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
         value={movieType.description || ""}
          onChange={handleChange}
        />
      </DialogContent>

      {/* Actions */}
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={addMovie_type}>
          {movieType.id ? "update":"add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ModalMovieType;
