import React, { useState } from 'react';
import SearchAdmin from '../../../../components/admin/SearchAdmin';
import ModalActor from './ModalActor';
import TableActor from './TableActor';
import { addDocument, updateDocument } from '../../../../services/firebaseService';
const inner = { name: "", description: "", };
function Actors(props) {
  const [open, setOpen] = useState(false);
  const [actor, setActor] = useState(inner);
  const [error, setError] = useState(inner);
  const [loading, setLoading] = useState(false);
  const handleClose = () => {
    setError(inner);
    setOpen(false);

  }
  const handleChange = (e) => {
    setActor({ ...actor, [e.target.name]: e.target.value });

  }
  const handleClickOpen = () => {
    setActor(inner);
    setOpen(true);
  };
  const validation = () => {
    const newError = {};
    newError.name = actor.name ? "" : "Name is required";
    newError.description = actor.description ? "" : "Description is required";
    setError(newError);
    return Object.values(newError).every(x => x === "");
  }
  const addActor = async () => {
    if (!validation()) {
      console.log("error");

      return;
    }
    setLoading(true);
    if (actor.id) {
      await updateDocument("actors", actor);
    } else {
      // Otherwise, create a new category
      await addDocument("actors", actor);
    }

    handleClose();
        setLoading(false);
  }
  const handleEdit = (row) => {
    handleClickOpen();
    setActor(row);
  }
const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setActor({ ...actor, imgUrl: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };


  return (
    <div>
      <SearchAdmin handleClickOpen={handleClickOpen} title={"List Actor"} add={"+ADD ACTOR"} />
      <TableActor handleEdit={handleEdit} actor={actor} setActor={setActor} open={open} setOpen={setOpen} />
      <ModalActor handleImageChange={handleImageChange} loading={loading} addActor={addActor} actor={actor} open={open} handleChange={handleChange} handleClose={handleClose} error={error} />
    </div>
  );
}


export default Actors;