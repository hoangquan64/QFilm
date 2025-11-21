import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Slide,
} from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function ModalAuthor({ open, handleClose,error,handleChange,author,addAuthor}) {
  

  // Hàm xử lý thay đổi i

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
      <DialogTitle>{author.id ? "EDIT Author":"ADD Author"}</DialogTitle>

      {/* Content */}
      <DialogContent>
        <TextField
          label="Name"
          name="name"
          fullWidth
          margin="normal"
          error={!!error.name}
          helperText={error.name}
          value={author.name ||""}
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
          value={author.description ||""}
          onChange={handleChange}
        />
        
      </DialogContent>

      {/* Actions */}
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={addAuthor}>
          {author.id ? "Update":"ADD" }
      
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ModalAuthor;
