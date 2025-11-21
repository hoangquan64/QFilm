import React, { useState } from 'react';
import SearchAdmin from '../../../../components/admin/SearchAdmin';
import { Modal, Table } from '@mui/material';
import TablePackage from './TablePackage';
import ModalPackage from './ModalPackage';
import { addDocument, updateDocument } from '../../../../services/firebaseService';
const inner={discount:"",planID:"",time:"" };
function Packages(props) {
  const [packageData,setPackageData] = useState(inner);
    const [open, setOpen] = useState(false); 
    const [error,setError] = useState(inner);
    const handleClickOpen = () => {
      setPackageData(inner);
        setOpen(true);
    };

    const handleClose = () => {
       setError(inner); setOpen(false);
    };
    const handleChange = (e) => {
        setPackageData({ ...packageData, [e.target.name]: e.target.value });
      };
      const validation = () => {
        const newError = {};  
        newError.discount = packageData.discount ? "" : "discount is required";
        newError.planID = packageData.planID ? "" : "Plan is required";
        newError.time = packageData.time ? "" : "time is required";
        setError(newError);
        return Object.values(newError).every(x => x == "");
      }
      const addPackageData = async () => {
        console.log(packageData);
        
        if (!validation()) {
            console.log(error);     
          return;
        }
         if(packageData.id) {
    
          await updateDocument("packages", packageData);
        } else {
          await addDocument("packages", packageData);
        }
        handleClose();
    
      }
      const handleEdit = (row) => {
        handleClickOpen();
        setPackageData(row);
      }


    return (
        <div>
            <SearchAdmin handleClickOpen={handleClickOpen} title={"List Packages"} add={" + ADD Package"} />
            <TablePackage handleEdit={handleEdit} open={open} setOpen={setOpen} packageData={packageData} setPackageData={setPackageData} />
            <ModalPackage handleChange={handleChange} open={open} handleClose={handleClose} packageData={packageData} error={error} addPackageData={addPackageData} />
        </div>
    );
}

export default Packages;