import React, { useState } from 'react';
import SearchAdmin from '../../../../components/admin/SearchAdmin';
import TableChacracter from './TableChacracter';
import ModalChacracters from './ModalChacracter';
import { addDocument, updateDocument } from '../../../../services/firebaseService';
const inner = { name: "", description: "", imgUrl: "" };
function Chacracters(props) {
    const [chacracter, setChacracter] = useState(inner);
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(inner);
    const [loading, setLoading] = useState(false); // Trạng thái loading
    const handleClickOpen = () => {
        setChacracter(inner);
        setOpen(true);
    }
    const handleClose = () => {
        setError(inner);
        setOpen(false);
    }
    const handleChange = (e) => {
        setChacracter({ ...chacracter, [e.target.name]: e.target.value });

    }
    const validation = () => {
        const newError = {};
        newError.name = chacracter.name ? "" : "Name is required";
        newError.description = chacracter.description ? "" : "Description is required";
        setError(newError);
        return Object.values(newError).every(x => x === "");
    }
    const addChacracter = async () => {
        if (!validation()) {
            console.log("error");
            return;
        }
        setLoading(true); // Bắt đầu loading
        if (chacracter.id) {
            await updateDocument("chacracters", chacracter);
        } else {
            // Otherwise, create a new category
            await addDocument("chacracters", chacracter);
        }
        handleClose();
        setLoading(false); // Kết thúc loading
    }
    const handleEdit = (row) => {
        handleClickOpen();
        setChacracter(row);
    }

const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setChacracter({ ...chacracter, imgUrl: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div>
            <SearchAdmin handleClickOpen={handleClickOpen} title={"List Chacracters"} add={"+ADD CHACRACTER"} />
            <TableChacracter handleEdit={handleEdit} setChacracters={setChacracter} open={open} setOpen={setOpen} chacracter={chacracter} />
            <ModalChacracters loading={loading} handleImageChange={handleImageChange} chacracter={chacracter} error={error} handleChange={handleChange} handleClose={handleClose} addChacracter={addChacracter} open={open} />
        </div>
    );
}

export default Chacracters;