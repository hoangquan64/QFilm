import React, { createContext, useContext, useState } from 'react';
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
import { CountryContext } from '../../../../contexts/CountryProvider';
import { deleteDocument } from '../../../../services/firebaseService';
import { ModalDelete } from '../../../../components/admin/ModalDelete';
import TablePaginationPage from '../../../../components/admin/TablePagination';
import { convertString } from '../../../../untils/reponsity';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
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

// 👉 ví dụ dữ liệu giả

export default function TableCountry({handleEdit }) {
  const[openDelete,setOpenDelete]=useState(false);
  const[countryIdToDelete,setCountryIdToDelete]=useState(null);
   const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
  const handleOpenDelete=(id)=>{
    setOpenDelete(true);
    setCountryIdToDelete(id);
  }
  const handleCloseDelete=()=>{ setOpenDelete(false);
  }
  const handlDelete=async()=>{

    await deleteDocument("countries",countryIdToDelete);
    // Thực hiện hành động xóa ở đây
    // await deleteDocument("countries",countryIdToDelete);
    handleCloseDelete();
  }
  const countries = useContext(CountryContext)
    return (
        <>
            <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>#</StyledTableCell>
            <StyledTableCell>Name</StyledTableCell>
            
            <StyledTableCell>Description</StyledTableCell>
            <StyledTableCell align="center">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {countries?.slice(page*rowsPerPage, page*rowsPerPage + rowsPerPage ).map((row,index) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell>{page*rowsPerPage + index +1}</StyledTableCell>
              <StyledTableCell>{row.name}</StyledTableCell>
              
              <StyledTableCell>{convertString(row.description)}</StyledTableCell>
              <StyledTableCell align="center">
  {/* Nút Edit */}
  <Button
    onClick={() => handleEdit(row)}
    variant="contained"
    size="small"
    sx={{
      mr: 1,
      background: 'linear-gradient(90deg, #7F00FF, #00C6FF)', // gradient tím → xanh
      color: 'white',
      boxShadow: '0 4px 15px rgba(0,0,0,0.25)',
      '&:hover': {
        background: 'linear-gradient(90deg, #9C27B0, #00BFFF)',
        boxShadow: '0 6px 20px rgba(50,100,200,0.4)',
      },
    }}
  >
    <FaRegEdit />
  </Button>

  {/* Nút Delete */}
  <Button
    onClick={() => handleOpenDelete(row.id)}
    variant="contained"
    size="small"
    sx={{  
      background: 'linear-gradient(90deg, #FF416C, #FF4B2B)', // gradient đỏ sang trọng
      color: 'white',
      boxShadow: '0 4px 15px rgba(0,0,0,0.25)',
      '&:hover': {
        background: 'linear-gradient(90deg, #FF5A75, #FF6B45)',
        boxShadow: '0 6px 20px rgba(200,50,50,0.4)',
      },
    }}
  >
    <MdDelete />
  </Button>
</StyledTableCell>

            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      <ModalDelete openDelete={openDelete} handleCloseDelete={handleCloseDelete} handleDelete={handlDelete}/>
    </TableContainer>
     <TablePaginationPage rowsPerPage={rowsPerPage} page={page} handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage} count={countries.length} />
         </>
            
      
    );
}

