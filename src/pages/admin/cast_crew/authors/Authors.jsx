import React, { useState } from 'react';
import SearchAdmin from '../../../../components/admin/SearchAdmin';
import ModalAuthor from './ModalAuthor';
import TableAuthor from './TableAuthor';
import { addDocument, updateDocument } from '../../../../services/firebaseService';
const inner = { name: "", about: "", };
function Authors(props) {
    const [author, setAuthor] = useState(inner);
    const [error, setError] = useState(inner);
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setError(inner);
        setOpen(false);

    }
    const handleChange = (e) => {
        setAuthor({ ...author, [e.target.name]: e.target.value });
    };
    const handleClickOpen = () => {
        setAuthor(inner);
        setOpen(true);
    }
    const validation = () => {
        const newError = {};
        newError.name = author.name ? "" : "Name is required";
        newError.description = author.description ? "" : "Description is required";
        setError(newError);
        return Object.values(newError).every(x => x === "");
    }
    const addAuthor = async () => {
        if (!validation()) {
            console.log("error");

            return;
        }
        if (author.id) {
            await updateDocument("authors", author);
        } else {
            // Otherwise, create a new category
            await addDocument("authors", author);
        }
        handleClose();
    }
    const handleEdit = (row) => {
        handleClickOpen();
        setAuthor(row);
    }

    return (
        <div>
            <SearchAdmin handleClickOpen={handleClickOpen} title={"List Author"} add={"+ADD AUTHOR"} />
            <TableAuthor handleEdit={handleEdit} setAuthor={setAuthor} open={open} setOpen={setOpen} author={author} />
            <ModalAuthor error={error} author={author} handleClose={handleClose} handleChange={handleChange} open={open} addAuthor={addAuthor} />
        </div>
    );
}

export default Authors;