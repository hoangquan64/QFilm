import React, { useState } from 'react';
import SearchAdmin from '../../../../components/admin/SearchAdmin';
import TableCategory from './TableCategory';
import ModalCategory from './ModalCategory';
import { addDocument, updateDocument } from '../../../../services/firebaseService';
 const inner = {name: "",description: ""};
function Categories(props) {
     
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(inner);
    const [category, setCategory] = useState(inner);

    const handleClickOpen = () => {
        setCategory(inner);
        setOpen(true);
    };

    const handleClose = () => {
        setError(inner); setOpen(false);
    };
    const validation = () => {
        const newError = {};
        newError.name = category.name ? "" : "Name is required";
        newError.description = category.description ? "" : "Description is required";
        setError(newError);
        return Object.values(newError).every(x => x === "");
    }

    const addCategory = async () => {
        if (!validation()) {
            console.log("error");
            
            return;
        }
        if(category.id){
           await updateDocument("categories", category); 
        } else {
           // Otherwise, create a new category
         await addDocument("categories", category);
        }
        handleClose();
    }

      const handleChange = (e) => {
        setCategory({ ...category, [e.target.name]: e.target.value });
      };
    
 const handleEdit = (row) => {
       handleClickOpen();
       setCategory(row);
 }
    return (
        <div>
            <SearchAdmin handleClickOpen={handleClickOpen} title={"List Categories"} add={"+ ADD CATEGORY"} />
            <TableCategory  handleEdit={handleEdit}  setCategory={setCategory}  open={open} setOpen={setOpen} category={category} />
            <ModalCategory  handleChange={handleChange} error={error} category={category} open={open} handleClose={handleClose} addCategory={addCategory} />
        </div>
    );
}

export default Categories;