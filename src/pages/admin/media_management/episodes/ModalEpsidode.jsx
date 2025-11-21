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

export default function AddEpisodeDialog({
    loading,
    handleImageChange,
    open,
    episode,
    handleClose,
    error,
    handleChange,
    addEpisode,
}) {
    const movies  = useContext(MovieContext); // ✅ tránh lỗi undefined khi MovieContext chưa sẵn sàng

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
            <DialogTitle>{episode.id ? "Edit Episode" : "Add Episode"}</DialogTitle>

            {/* Nội dung */}
            <DialogContent>

                <Autocomplete
                         options={movies || []}
                         getOptionLabel={(option) => option.name || ""}
                         disablePortal
                         fullWidth
                         sx={{ mt: 2 }}
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
                <Autocomplete
                    disablePortal
                    options={[...Array(100).keys()].map(i => i + 1)} // 1 -> 100
                    getOptionLabel={(number) => `Episode ${number}`}
                    onChange={(event, value) =>
                        handleChange({
                            target: { name: "episodeNumber", value: value || "" },
                        })
                    }
                    value={episode.episodeNumber || null}
                    fullWidth
                    sx={{ mt: 2 }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Episode Number"
                            margin="normal"
                            error={!!error.episodeNumber}
                            helperText={error.episodeNumber}
                        />
                    )}
                />


                {/* Upload ảnh */}
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
                    src={episode.imgUrl || "https://via.placeholder.com/150"}
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

            {/* Hành động */}
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button disabled={loading} // 🔹 Khi đang loading thì disable nút
                    startIcon={loading && <CircularProgress size={20} color="inherit" />} variant="contained" onClick={addEpisode}>
                    {episode.id ? "Update" : "Add"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
