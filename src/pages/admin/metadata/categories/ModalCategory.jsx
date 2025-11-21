import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Slide,
  Fade,
  TextField,   // thêm import TextField
} from "@mui/material";
import { addDocument } from "../../../../services/firebaseService";

// Transition Slide + Fade
const Transition = React.forwardRef(function Transition(props, ref) {
  return (
    <Fade in={props.in} timeout={400}>
      <Slide direction="up" ref={ref} {...props} timeout={400} />
    </Fade>
  );
});

export default function AddCategoryDialog({ open,category, handleClose,error, handleChange ,addCategory}) {
 
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
      <DialogTitle>{category.id?"EDIT Category":"ADD category"}</DialogTitle>

      {/* Content */}
      <DialogContent>
        <TextField
          label="Name"
          name="name"
          fullWidth
          margin="normal"
          error={!!error.name}
          helperText={error.name}
          value={category.name || ""}
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
          value={category.description || ""}
          onChange={handleChange}
        />
      </DialogContent>

      {/* Actions */}
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={addCategory}>{category.id ? "Update" : "Add"}
          
        </Button>
      </DialogActions>
    </Dialog>
  );
}
