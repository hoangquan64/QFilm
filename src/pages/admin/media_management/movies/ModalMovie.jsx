import React, { use, useContext, useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Slide,
    Fade,
    TextField,
    Typography,
    Grid,
    Box,
    Autocomplete,
    listClasses,
    Avatar,
    CircularProgress,
} from "@mui/material";
import { Movie_typeContext } from "../../../../contexts/Movie_typeProvider";
import { getOjectById } from "../../../../untils/reponsity";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { FaRegImage, FaRegUserCircle, FaUser, FaUserCircle } from "react-icons/fa";
import { PlanContext } from "../../../../contexts/PlanProvider";
import { CountryContext } from "../../../../contexts/CountryProvider";
import { AuthorContext } from "../../../../contexts/AuthorProvider";
import styled from "@emotion/styled";
import ModalChoose from "./ModalChoose";
import { ChacracterContext } from "../../../../contexts/ChacracterProvider";
import { ActorContext } from "../../../../contexts/ActorProvider";
import { CategoryContext } from "../../../../contexts/CategoryProvider";
import { list } from "firebase/storage";


// Hiệu ứng Fade + Slide
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
export default function MovieDialog({ setMovie, loading, open, handleClose, handleImageChange, movie, error, handleChange, addMovie }) {
    const Movies_type = useContext(Movie_typeContext);
    const plans = useContext(PlanContext);
    const countries = useContext(CountryContext);
    const authors = useContext(AuthorContext);
    const characters = useContext(ChacracterContext);
    console.log("charac", characters);

    const actors = useContext(ActorContext);
    const categories = useContext(CategoryContext);
    const [dataChoose, setDataChoose] = useState([]);
    const [openChoose, setOpenChoose] = useState(false);
    const [typeChoose, setTypeChoose] = useState("");
    const [selectedCategories, setSelectedCategories] = useState([]);
    const[textSearch,setTextSearch]= useState("");
    const handleCloseChoose = () => {

        setOpenChoose(false);
    };

    const handleOpdenChoose = (type) => {
        setOpenChoose(true);
        setTypeChoose(type);
        switch (type) {
            case "category":
                setDataChoose(categories);
                break;
            case "actor":
                setDataChoose(actors);
                break;
            case "character":
                setDataChoose(characters);
                break;
            default:
                setDataChoose([]);
        }
    };

    const handleClickChoose = (id) => {

        setMovie(pre => {
            switch (typeChoose) {
                case "category":
                    return { ...pre, listCategoryID: toggle(pre.listCategoryID, id) };
                case "actor":
                    return { ...pre, listActorID: toggle(pre.listActorID, id) };
                case "character":
                    return { ...pre, listCharacterID: toggle(pre.listCharacterID, id) };
                default:

            }
        });
    }

    const toggle = (data, id) => {
        return data.includes(id) ? data.filter(item => item !== id) : [...data, id];
    }
    const getDataChoose = () => {
        switch (typeChoose) {
            case "category":
                return movie.listCategoryID;
            case "actor":
                return movie.listActorID;
            case "character":
                return movie.listCharacterID;
            default:
                return [];
        }
    }

    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
                maxWidth="md"
                TransitionComponent={Transition}
                keepMounted
            >
                {/* Tiêu đề */}
                <DialogTitle
                    sx={{ fontWeight: "bold", fontSize: 22, textTransform: "uppercase" }}
                >
                   {movie.id ? "Edit Movie" : "Add Movie"}
                </DialogTitle>

                {/* Nội dung */}
                <DialogContent dividers>
                    <div className="grid md:grid-cols-2 gap-4 grid-cols-1">
                        {/* left */}
                        <div className="col-span-1">
                            <TextField
                                label="Movie Name"
                                name="name"
                                fullWidth
                                margin="normal"
                                error={!!error.name}
                                helperText={error.name}
                                value={movie.name || ""}
                                onChange={handleChange}

                            />
                            <TextField
                                label="Description"
                                name="description"
                                fullWidth
                                margin="normal"
                                error={!!error.description}
                                helperText={error.description}
                                value={movie.description || ""}
                                onChange={handleChange}

                            />
                            <TextField
                                label="Duration (minutes)"
                                name="duration"
                                type="number"
                                fullWidth
                                margin="normal"
                                error={!!error.duration}
                                helperText={error.duration}
                                value={movie.duration || ""}
                                onChange={handleChange}
                            />
                            <div className="flex gap-4">
                                <Autocomplete
                                    options={Movies_type}
                                    getOptionLabel={(option) => option.name || ""}
                                    disablePortal
                                    fullWidth
                                    sx={{ mt: 2 }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Find movie type"
                                        />
                                    )}
                                    error={!!error.movieTypeID}
                                    helperText={error.movieTypeID}
                                    onChange={(event, value) => handleChange({
                                        target: { name: "movieTypeID", value: value ? value.id : "" },
                                    })}
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

                            </div>
                            <div className="flex gap-4">
                                <Autocomplete
                                    options={countries}
                                    getOptionLabel={(option) => option.name || ""}
                                    disablePortal
                                    fullWidth
                                    sx={{ mt: 2 }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Find country"
                                        />
                                    )}
                                    error={!!error.countryID}
                                    helperText={error.countryID}

                                    onChange={(event, value) => handleChange({
                                        target: { name: "countryID", value: value ? value.id : "" },
                                    })}
                                />



                                <Autocomplete
                                    options={authors}
                                    getOptionLabel={(option) => option.name || ""}
                                    disablePortal
                                    fullWidth
                                    sx={{ mt: 2 }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Find Author"
                                        />
                                    )}
                                    error={!!error.authorID}
                                    helperText={error.authorID}
                                    onChange={(event, value) => handleChange({
                                        target: { name: "authorID", value: value ? value.id : "" },
                                    })}
                                />
                            </div>



                        </div>
                        {/* right */}

                        <div className="col-span-1">
                            <div className="flex items-center gap-2 ">
                                <p>Categories</p>
                                <BiSolidCategoryAlt onClick={() => handleOpdenChoose("category")} className="text-amber-500 text-2xl " />
                            </div>
                            <div className="flex flex-wrap gap-3 px-3 py-2">
                                {movie.listCategoryID.map((id) => {
                                    const cat = categories.find((c) => c.id === id);
                                    if (!cat) return null;
                                    return (
                                        <button
                                            key={id}
                                            className="relative px-3 py-1 rounded-md border bg-amber-300 hover:bg-amber-400 transition"
                                        >
                                            {cat.name}
                                            <AiOutlineClose
                                                onClick={() =>
                                                    setMovie((pre) => ({
                                                        ...pre,
                                                        listCategoryID: pre.listCategoryID.filter((i) => i !== id),
                                                    }))
                                                }
                                                className="absolute -top-2 -right-2 rounded-full p-[2px] text-sm cursor-pointer bg-red-500 text-white"
                                            />
                                        </button>
                                    );
                                })}
                            </div>

                            <div className="flex items-center gap-2 ">
                                <p>Actor</p>
                                <FaUser onClick={() => handleOpdenChoose("actor")} className="text-gray-600 text-2xl" />

                            </div>
                            <div className="flex flex-wrap gap-3 mt-2">
                                {movie.listActorID.map((id) => {
                                    const actor = actors.find((a) => a.id === id);
                                    if (!actor) return null;

                                    return (
                                        <div
                                            key={id}
                                            className="relative flex items-center gap-2 border rounded-lg px-2 py-1 bg-amber-100 hover:bg-amber-200 transition"
                                        >
                                            <Avatar src={actor.imgUrl} alt={actor.name} sx={{ width: 32, height: 32 }} />
                                            
                                            <AiOutlineClose
                                                onClick={() =>
                                                    setMovie((pre) => ({
                                                        ...pre,
                                                        listActorID: pre.listActorID.filter((i) => i !== id),
                                                    }))
                                                }
                                                className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-[2px] cursor-pointer text-sm"
                                            />
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="flex items-center gap-2 ">
                                <p>Character</p>
                                <FaUser onClick={() => handleOpdenChoose("character")} className="text-gray-600 text-2xl" />

                            </div>
                           <div className="flex flex-wrap gap-3 mt-2">
                                {movie.listCharacterID.map((id) => {
                                    const character = characters.find((a) => a.id === id);
                                    if (!character) return null;

                                    return (
                                        <div
                                            key={id}
                                            className="relative flex items-center gap-2 border rounded-md px-2 py-1 bg-amber-100 hover:bg-amber-200 transition"
                                        >
                                            <Avatar src={character.imgUrl} alt={character.name} sx={{ width: 32, height: 32 }} />
                                            
                                            <AiOutlineClose
                                                onClick={() =>
                                                    setMovie((pre) => ({
                                                        ...pre,
                                                        listCharacterID: pre.listCharacterID.filter((i) => i !== id),
                                                    }))
                                                }
                                                className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-[2px] cursor-pointer text-sm"
                                            />
                                        </div>
                                    );
                                })}
                            </div>
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
                                  src={movie.imgUrl || "https://via.placeholder.com/150"}
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



                        </div>
                    </div>
                </DialogContent>

                {/* Nút hành động */}
                 <DialogActions>
                       <Button onClick={handleClose}>Cancel</Button>
                       <Button  disabled={loading} // 🔹 Khi đang loading thì disable nút
                         startIcon={loading && <CircularProgress size={20} color="inherit" />}  variant="contained" onClick={addMovie}>
                         {movie.id ? "Update" : "Add"}
                       </Button>
                     </DialogActions>
            </Dialog>
            <ModalChoose textSearch={textSearch} setTextSearch={setTextSearch} getDataChoose={getDataChoose()} handleClickChoose={handleClickChoose} typeChoose={typeChoose} dataChoose={dataChoose} openChoose={openChoose} handleCloseChoose={handleCloseChoose} />
        </>
    );

}
