import React, { useState } from 'react';
import SearchAdmin from '../../../../components/admin/SearchAdmin';
import TablePlan from './TablePlan';
import ModalPlan from './ModalPlan';
import { addDocument, updateDocument } from '../../../../services/firebaseService';
const inner = { name: "", title: "" };
function Plans(props) {
  const [plan, setPlan] = useState([inner]);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(inner);
  const handleClickOpen = () => {
    setPlan(inner);
    setOpen(true);
  };

  const handleClose = () => {
    setError(inner);
    setOpen(false);
  };
  const handleChange = (e) => {
    setPlan({ ...plan, [e.target.name]: e.target.value });
  };
  const validation = () => {
    const newError = {};
   
    newError.level = plan.level ? "" : "level is required";
    newError.pricePerMoth = plan.pricePerMoth ? "" : "Price is required";
    newError.title = plan.title ? "" : "title is required";
    setError(newError);
    return Object.values(newError).every(x => x === "");
  }
  const addPlan = async () => {
    if (!validation()) {
      return;

    } if (plan.id) {

      await updateDocument("plans", plan);
    } else {
      await addDocument("plans", plan);
    }
    handleClose();

  }
  const handleEdit = (row) => {
    handleClickOpen();
    setPlan(row);
  }


  return (
    <div>
      <SearchAdmin handleClickOpen={handleClickOpen} title={"List Plans"} add={" + ADD Plan"} />
      <TablePlan handleEdit={handleEdit} open={open} setOpen={setOpen} plan={plan} setPlan={setPlan} />
      <ModalPlan open={open} handleClose={handleClose} error={error} handleChange={handleChange} addPlan={addPlan} plan={plan} />


    </div>
  );
}

export default Plans;