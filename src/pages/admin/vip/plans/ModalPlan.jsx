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

export default function AddPlan({ open,plan, handleClose,error, handleChange ,addPlan}) {
 
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
      <DialogTitle>{plan.id?"EDIT Plan":"ADD Plan"}</DialogTitle>

      {/* Content */}
      <DialogContent>
        <TextField
          label="Level"
          name="level"
          fullWidth
          margin="normal"
          error={!!error.level}
          helperText={error.level}
          value={plan.level || ""}
          onChange={handleChange}
        />
          <TextField
          label="PicePerMoth"
          name="pricePerMoth"
          fullWidth
          margin="normal"
          error={!!error.pricePerMoth}
          helperText={error.pricePerMoth}
          value={plan.pricePerMoth || ""}
          onChange={handleChange}
        />
        <TextField
          label="Title"
          name="title"
          fullWidth
          multiline
          rows={3}
          margin="normal"
          error={!!error.title}
          helperText={error.title}
          value={plan.title || ""}
          onChange={handleChange}
        />
      </DialogContent>

      {/* Actions */}
     <DialogActions className="gap-2">
  {/* Cancel Button */}
  <Button
    onClick={handleClose}
    sx={{
      color: '#fff',
      background: 'linear-gradient(90deg, #555555, #777777)',
      boxShadow: '0 4px 16px rgba(0,0,0,0.25), 0 8px 24px rgba(0,0,0,0.15), 0 12px 40px rgba(0,0,0,0.1)',
      '&:hover': {
        background: 'linear-gradient(90deg, #666666, #999999)',
        boxShadow: '0 6px 20px rgba(0,0,0,0.3), 0 12px 30px rgba(0,0,0,0.2), 0 18px 45px rgba(0,0,0,0.15)',
      },
    }}
  >
    Cancel
  </Button>

  {/* Add / Update Button */}
  <Button
    variant="contained"
    onClick={addPlan}
    sx={{
      background: 'linear-gradient(90deg, #7F00FF, #00C6FF)', // gradient tím → xanh
      color: 'white',
      fontWeight: 'bold',
      boxShadow: '0 4px 16px rgba(127,0,255,0.3), 0 8px 24px rgba(0,198,255,0.3), 0 12px 40px rgba(127,0,255,0.2)',
      '&:hover': {
        background: 'linear-gradient(90deg, #9C27B0, #00BFFF)',
        boxShadow: '0 6px 20px rgba(156,39,176,0.4), 0 12px 30px rgba(0,191,255,0.4), 0 18px 50px rgba(156,39,176,0.3)',
      },
    }}
  >
    {plan.id ? 'Update' : 'Add'}
  </Button>
</DialogActions>

    </Dialog>
  );
}
