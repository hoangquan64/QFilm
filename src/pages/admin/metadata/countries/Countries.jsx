import React, { useState } from 'react';
import SearchAdmin from '../../../../components/admin/SearchAdmin';
import { Modal } from '@mui/material';
import ModalCountry from './ModalCountry';
import TableCountry from './TableCountry';
import { addDocument, updateDocument } from '../../../../services/firebaseService';
const inner = { name: "", description: "" };
function Countries(props) {
    
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(inner);
    const [country, setCountry] = useState(inner);
    const handleClickOpen = () => {
        setCountry (inner);
        setOpen(true);
    };
    const handleClose = () => {
        setError(inner), setOpen(false);
    };
    const validation = () => {      
        const newError = {};
        newError.name = country.name ? "" : "Name is required";
        newError.description = country.description ? "" : "Description is required";
        setError(newError);
        return Object.values(newError).every(x => x === "");
    }
    const addCountry = async ()=>{
        if(!validation()){
            return;
        }
        if(country.id) {
             await updateDocument("countries",country)

        } else {
            await addDocument("countries",country);
        }
       
        handleClose();
    }
    const handleChange = (e) => {
    setCountry({ ...country, [e.target.name]: e.target.value });
  };
  const handleEdit = (row) => {
       handleClickOpen();
       setCountry(row);
 }
 

    return (
        <div>
            <SearchAdmin handleClickOpen={handleClickOpen} title={"List Country"} add={"ADD Country"} />
            <ModalCountry  open={open} handleClose={handleClose} error ={error} country ={country} handleChange={handleChange} addCountry={addCountry}/>
            <TableCountry handleEdit={handleEdit} setCountry={setCountry} open ={open} setOpen={setOpen} country ={country} />


        </div>
    );
}

export default Countries;