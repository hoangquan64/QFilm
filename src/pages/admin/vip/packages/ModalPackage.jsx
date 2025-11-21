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
    Checkbox,
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

export default function AddFeature({ open, packageData, handleClose, error, handleChange, addPackageData }) {
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
            {/* ✅ Title */}
            <DialogTitle>{packageData ? "ADD Package":"EDIT Package" }</DialogTitle>

            {/* ✅ Content */}
            <DialogContent>
                {/* Discount */}
                <TextField
                    label="Discount (%) or Amount"
                    name="discount"
                    type="number"
                    fullWidth
                    margin="normal"
                    InputProps={{
                        inputProps: { min: 0 },
                    }}
                    value={packageData?.discount || ""}
                    onChange={handleChange}
                    error={!!error.discount}
                    helperText={error.discount}
                    
                />

                {/* Plan chọn từ context */}
                <Autocomplete
                    options={plans}
                    getOptionLabel={(option) => option.level || ""}
                    disablePortal
                    fullWidth
                    sx={{ mt: 2 }}
                    value={plans.find((p) => p.id === packageData?.planID) || null}
                    onChange={(event, value) =>
                        handleChange({
                            target: { name: "planID", value: value ? value.id : "" },
                        })
                    }
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Find Plan"
                            error={!!error.planID}
                            helperText={error.planID}
                        />
                    )}
                />

                {/* Time */}
                <TextField
                    label="Time (e.g., 3 months or specific date)"
                    name="time"
                    type="text"
                    fullWidth
                    margin="normal"
                    value={packageData?.time || ""}
                    onChange={handleChange}
                    error={!!error.time}
                    helperText={error.time}
                />
            </DialogContent>

            {/* ✅ Actions */}
            <DialogActions className="gap-2">
                <Button
                    onClick={handleClose}
                    sx={{
                        color: "#fff",
                        background: "linear-gradient(90deg, #555555, #777777)",
                        boxShadow:
                            "0 4px 16px rgba(0,0,0,0.25), 0 8px 24px rgba(0,0,0,0.15), 0 12px 40px rgba(0,0,0,0.1)",
                        "&:hover": {
                            background: "linear-gradient(90deg, #666666, #999999)",
                            boxShadow:
                                "0 6px 20px rgba(0,0,0,0.3), 0 12px 30px rgba(0,0,0,0.2), 0 18px 45px rgba(0,0,0,0.15)",
                        },
                    }}
                >
                    Cancel
                </Button>

                <Button
                    variant="contained"
                    onClick={addPackageData}
                    sx={{
                        background: "linear-gradient(90deg, #7F00FF, #00C6FF)",
                        color: "white",
                        fontWeight: "bold",
                        boxShadow:
                            "0 4px 16px rgba(127,0,255,0.3), 0 8px 24px rgba(0,198,255,0.3), 0 12px 40px rgba(127,0,255,0.2)",
                        "&:hover": {
                            background: "linear-gradient(90deg, #9C27B0, #00BFFF)",
                            boxShadow:
                                "0 6px 20px rgba(156,39,176,0.4), 0 12px 30px rgba(0,191,255,0.4), 0 18px 50px rgba(156,39,176,0.3)",
                        },
                    }}
                >
                    {packageData ?  "ADD" :"UPDATE" }
                </Button>
            </DialogActions>
        </Dialog>
    );
}
