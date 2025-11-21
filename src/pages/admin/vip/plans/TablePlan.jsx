import React, { useContext, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button'; // 👈 cần import
import { FaRegEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { ModalDelete } from '../../../../components/admin/ModalDelete';
import { CategoryContext } from '../../../../contexts/CategoryProvider';
import { deleteDocument } from '../../../../services/firebaseService';
import TablePaginationPage from '../../../../components/admin/TablePagination';
import { PlanContext } from '../../../../contexts/PlanProvider';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
[`&.${tableCellClasses.head}`]: {
    background: "linear-gradient(90deg, #8a00ff, #00eaff)", // tím neon → xanh neon
    color: "#ffffff",
    fontWeight: "700",
    textShadow: "0 0 6px rgba(0,0,0,0.4)", // chữ sắc nét hơn
    boxShadow: "0px 4px 12px rgba(0, 234, 255, 0.45)", // bóng xanh neon
    borderRight: "none !important",
    borderLeft: "none !important",
    letterSpacing: "0.7px",
},



  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

// 👉 sửa lại createData
function createData(id, name, description) {
  return { id, name, description };
}



export default function TablePlan({ handleEdit }) {
  const plans = useContext(PlanContext);
  const [openDelete, setOpenDelete] = useState(false);
  const [planIdToDelete, setPlanIdToDelete] = useState(null); // Lưu ID của thể loại cần xóa
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleOpenDelete = (id) => {
    setOpenDelete(true);
    setPlanIdToDelete(id); // Lưu ID của thể loại cần xóa
  }
  const handleCloseDelete = () => setOpenDelete(false);



  const handleDelete = async () => {
    // Thực hiện hành động xóa ở đây
    await deleteDocument("plans", planIdToDelete);
    handleCloseDelete(); // Đóng modal sau khi xóa
  }
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>#</StyledTableCell>
               <StyledTableCell>level</StyledTableCell>
              <StyledTableCell>PricePerMoth</StyledTableCell>
              <StyledTableCell>Title</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {plans.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
              <StyledTableRow key={row.id || index}>
                <StyledTableCell>{page * rowsPerPage + index + 1}</StyledTableCell>
                <StyledTableCell>{row.level}</StyledTableCell>
                <StyledTableCell>{row.pricePerMoth}</StyledTableCell>
                <StyledTableCell>{row.title}</StyledTableCell>
                <StyledTableCell align="center">
                  <Button onClick={() => handleEdit(row)} variant="contained" color="primary" size="small" sx={{ mr: 1 }}>
                    <FaRegEdit />
                  </Button>
                  <Button onClick={() => handleOpenDelete(row.id)} variant="contained" color="error" size="small">
                    <MdDelete />
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
        <ModalDelete openDelete={openDelete} handleCloseDelete={handleCloseDelete} handleDelete={handleDelete} />
      </TableContainer>
      <TablePaginationPage rowsPerPage={rowsPerPage} page={page} handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage} count={plans.length} />
    </>
  );
}
