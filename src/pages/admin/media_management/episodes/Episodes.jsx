import React, { useState } from 'react';
import SearchAdmin from '../../../../components/admin/SearchAdmin';
import ModalEpsidode from './ModalEpsidode';
import TableEpisode from './TableEpisode';
import { addDocument, updateDocument } from '../../../../services/firebaseService';
const inner = {episodeNumber: "",  movieID: "", imgUrl: ""};
function Episodes(props) {
    const [episode, setEpisode] = useState(inner);
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(inner);
    const [loading, setLoading] = useState(false);
    const handleClickOpen = () => {
        setEpisode(inner);
        setOpen(true);
    };
    const handleClose = () => {
        setError(inner);
        setOpen(false);
    };
    const validation = () => {
        const newError = {};
        newError.episodeNumber = episode.episodeNumber ? "" : "Episode Number is required";
        newError.movieID = episode.movieID ? "" : "Movie ID is required";
        setError(newError);
        return Object.values(newError).every(x => x === "");
    }
    const addEpisode = async () => {
        if (!validation()) {
            console.log("error");

            return;
        } 
        setLoading(true);
        if (episode.id) {
            await updateDocument("episodes", episode);
        } else {
            // Otherwise, create a new category
            await addDocument("episodes", episode);
        }
        handleClose();
        setLoading(false);
    }

    const handleChange = (e) => {
        setEpisode({ ...episode, [e.target.name]: e.target.value });
    };

    const handleEdit = (row) => {
        handleClickOpen();
        setEpisode(row);
    }
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setEpisode({ ...episode, imgUrl: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };


    return (
        <div>
            <SearchAdmin handleClickOpen={handleClickOpen} title={"List Episodes"} add={"+ ADD Episode"} />
            <ModalEpsidode loading={loading} addEpisode={addEpisode} handleImageChange={handleImageChange} open={open} handleClose={handleClose} episode={episode} handleChange={handleChange} error={error} />
            <TableEpisode open={open} setOpen={setOpen} episode={episode} setEpisode={setEpisode} handleEdit={handleEdit} />


        </div>
    );
}

export default Episodes;