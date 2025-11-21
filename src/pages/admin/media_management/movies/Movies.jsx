import React, { useState } from 'react';
import SearchAdmin from '../../../../components/admin/SearchAdmin';
import { Modal, Table } from '@mui/material';
import ModalMovie from './ModalMovie';
import TableMovie from './TableMovie';
import { addDocument, updateDocument } from '../../../../services/firebaseService';
const inner = { name: "", description: "", imgUrl: "", countryID: "", planID: "" , movieTypeID: "" ,authorID : "" , duration : "" , listCategoryID: [],listActorID: [],listCharacterID: [] };
function Movies(props) {
    const [open, setOpen] = useState(false);
    const [movie, setMovie] = useState(inner);
    const [error, setError] = useState(inner);
    const [loading, setLoading] = useState(false); // Trạng thái loading
    const handleClickOpen = () => {
        setMovie(inner);
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const validation = () => {
        const newError = {};
        newError.name = movie.name ? "" : "Name is required";
        newError.description = movie.description ? "" : "Description is required";
        setError(newError);
        return Object.values(newError).every(x => x === "");
    }
    const addMovie = async () => {
                console.log(movie);
        if (!validation()) {       
            console.log(error);
            
            return;

        } setLoading(true);


        if (movie.id) {
            await updateDocument("movies", movie);
        } else {
            // Otherwise, create a new category
            await addDocument("movies", movie);
        }
        handleClose();
        setLoading(false);
    }

    const handleChange = (e) => {
        setMovie({ ...movie, [e.target.name]: e.target.value });
    };
    const handleEdit = (row) => {
        handleClickOpen();
        setMovie(row);
    }
   const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setMovie({ ...movie, imgUrl: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div>
            <SearchAdmin handleClickOpen={handleClickOpen} title={"List Movies"} add={"+ADD MOVIE"} />
            <ModalMovie setMovie={setMovie} error={error} handleChange={handleChange} addMovie={addMovie} handleImageChange={handleImageChange} loading={loading} open={open} handleClose={handleClose} movie={movie} />
             <TableMovie movie={movie} setMovie={setMovie} open={open} setOpen={setOpen} handleEdit={handleEdit}/>

        </div>
    );
}

export default Movies;