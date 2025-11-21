import React, { useState } from 'react';
import SearchAdmin from '../../../../components/admin/SearchAdmin';
import TableMovies_type from './TableMovies_type';
import ModalMovieType from './ModalMovie_type';
import { addDocument, updateDocument } from '../../../../services/firebaseService';
 const inner = {name: "",description: ""};
function Movies_type(props) {
    const [error,setError] = useState(inner);
    const [movieType,setMovieType] = useState(inner);
    const [open, setOpen] = useState(false); 
    const handleClickOpen = () => {
      setMovieType(inner);
        setOpen(true);
    };

    const handleClose = () => {
       setError(inner); setOpen(false);
    };
      const handleChange = (e) => {
        setMovieType({ ...movieType, [e.target.name]: e.target.value });
      };
      const validation = () => {
        const newError = {};
        newError.name = movieType.name ? "" : "Name is required";
        newError.description = movieType.description ? "" : "Description is required";
        setError(newError);
        return Object.values(newError).every(x => x === "");
    }
      const addMovie_type = async ()=>{
        if(!validation()){
            return;

        } if(movieType.id){

        await updateDocument("movies_Type",movieType);
        }else{
          await addDocument("movies_Type",movieType);
        }
        handleClose();

      }
      const handleEdit = (row) => {
           handleClickOpen();
           setMovieType(row);
     }

     
    return (
        <div>
            <SearchAdmin handleClickOpen={handleClickOpen} title={"List Movies Type"} add={"ADD Movie Type"} />
            <TableMovies_type handleEdit={handleEdit} open ={open} setMovieType={setMovieType} setOpen={setOpen} movieType={movieType}/>
            <ModalMovieType open={open} handleClose={handleClose} error = {error} handleChange={handleChange} addMovie_type={addMovie_type} movieType={movieType}/>  
            
        </div>
    );
}

export default Movies_type;