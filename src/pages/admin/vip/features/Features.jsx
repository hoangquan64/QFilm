import React, { useState } from 'react';
import SearchAdmin from '../../../../components/admin/SearchAdmin';
import TableFearure from './TableFearure';
import ModalFeature from './ModalFeature';
import { or } from 'firebase/firestore';
import { addDocument, updateDocument } from '../../../../services/firebaseService';
const inner = { text : "", planID : "",available:" true || false" };
function Features(props) {
    const[feature,setFeature]=useState(inner);
    const [open, setOpen] = useState(false);
    const [error,setError]=useState(inner);
    const handleClickOpen = () => { 
        setFeature(inner);
        setOpen(true);
    };

    const handleClose = () => {
        setError(inner);
       setOpen(false);
    };
   const handleChange = (e) => {
  const { name, value, type, checked } = e.target;
  setFeature({ 
    ...feature, 
    [name]: type === "checkbox" ? checked : value 
  });
};

      const validation = () => {
        const newError = {};
        newError.planID = feature.planID ? "" : "planID is required";
        newError.text = feature.text ? "" : "text is required";
        return Object.values(newError).every(x => x === "");
      }
      const addFeature = async () => {
        console.log(feature);
        if (!validation()) {
          console.log(error);
          
          return;
    
        } if (feature.id) {
    
          await updateDocument("features", feature);
        } else {
          await addDocument("features", feature);
        }
        handleClose();
    
      }
      const handleEdit = (row) => {
        handleClickOpen();
        setFeature(row);
      }
    return (
        <div>
            <SearchAdmin handleClickOpen={handleClickOpen} title={"List Features"} add={"+ ADD Feature"} />
            <TableFearure handleEdit={handleEdit} open={open} setOpen={setOpen} fearute={feature} setFeature={setFeature} />
            <ModalFeature open={open} handleClose={handleClose} feature={feature} handleChange={handleChange} error={error} addFeature={addFeature} />
            
        </div>
    );
}

export default Features;