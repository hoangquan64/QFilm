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
    FormControlLabel,
    Checkbox,   // thêm import TextField
} from "@mui/material";
import { addDocument } from "../../../../services/firebaseService";
import { PlanContext } from "../../../../contexts/PlanProvider";

// Transition Slide + Fade
const Transition = React.forwardRef(function Transition(props, ref) {
    return (
        <Fade in={props.in} timeout={400}>
            <Slide direction="up" ref={ref} {...props} timeout={400} />
        </Fade>
    );
});

export default function AddFeature({ open, feature, handleClose, error, handleChange, addFeature }) {
    const plans = useContext(PlanContext);

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
            <DialogTitle>{feature ? "ADD FEATURE": "EDIT FEATURE" }</DialogTitle>

            {/* Content */}
            <DialogContent>

                <TextField
                    label="Text"
                    name="text"
                    fullWidth
                    margin="normal"
                    error={!!error.text}
                    helperText={error.text}
                    value={feature?.text || ""}
                    onChange={handleChange}
                />

                <Autocomplete
                    options={plans}
                    getOptionLabel={(option) => option.level || ""}
                    disablePortal
                    fullWidth
                    sx={{ mt: 2 }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Find Plan"
                        />
                    )}
                    error={!!error.planID}
                    helperText={error.planID}

                    onChange={(event, value) => handleChange({
                        target: { name: "planID", value: value ? value.id : "" },
                    })}
                />

                <FormControlLabel
                    control={<Checkbox name="available" />}
                    label="Available"
                    checked={feature?.available || false}
                    onChange={(e) => handleChange({
                        target: { name: "available", value: e.target.checked },
                    })} 
                    sx={{ mt: 2 }}
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
                    onClick={addFeature}
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
                    {feature ? "ADD":"UPDATE"  }
                </Button>
            </DialogActions>

        </Dialog>
    );
}
