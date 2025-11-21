import { Modal, Tab } from '@mui/material';
import React, { useState } from 'react';
import ModalSection from './ModalSection';
import TableSection from './TableSection';
import SearchAdmin from '../../../../components/admin/SearchAdmin';
import { addDocument, updateDocument } from '../../../../services/firebaseService';
const inner = { name: "", description: ""  , imgUrl: ""};
function Sections(props) {
    const [open, setOpen] = useState(false);
    const [section, setSection] = useState(inner);
    const [error, setError] = useState(inner);
    const [loading, setLoading] = useState(false);

    const handleClickOpen = () => {
        setSection(inner);
        setOpen(true);
    }
    const handleClose = () => {
        setError(inner); setOpen(false);
    };

    const validation = () => {
        const newError = {};
        newError.name = section.name ? "" : "Name is required";
        newError.description = section.description ? "" : "Description is required";
        setError(newError);
        return Object.values(newError).every(x => x === "");
    }
    const addSection = async () => {
        console.log(section);
        
     
        if (!validation()) {
            console.log("error");


            return;
        } setLoading(true); 
        if (section.id) {
            await updateDocument("sections", section);
        } else {
            // Otherwise, create a new category
            await addDocument("sections", section);
        }

        handleClose();
        setLoading(false);
    }

    const handleChange = (e) => {
        setSection({ ...section, [e.target.name]: e.target.value });
    };

    const handleEdit = (row) => {
        handleClickOpen();
        setSection(row);
    }
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setSection({ ...section, imgUrl: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };


    return (
        <div>
            <SearchAdmin handleClickOpen={handleClickOpen} title={"List Section"} add={"+ADD Section"} />
            <TableSection section={section} setSection={setSection} open={open} setOpen={setOpen} handleEdit={handleEdit} />
            <ModalSection loading={loading} handleImageChange={handleImageChange} handleChange={handleChange} error={error} open={open} section={section} handleClose={handleChange} addSection={addSection} />
        </div>
    );
}

export default Sections;