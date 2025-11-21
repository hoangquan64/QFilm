import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { FaRegEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { Button } from '@mui/material';
import { AuthorContext } from '../../../../contexts/AuthorProvider';
import { useContext } from 'react';
import { ModalDelete } from '../../../../components/admin/ModalDelete';
import { useState } from 'react';
import { deleteDocument } from '../../../../services/firebaseService';
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
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

export default function CustomizedTables({handleEdit }) {
   const authors = useContext(AuthorContext);

   const [openDelete, setOpenDelete] = useState(false);
    const [authorIdToDelete, setAuthorIdToDelete ] = useState(null);
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
         setAuthorIdToDelete(id);
         
     }
     const handleCloseDelete = () => {
         setOpenDelete(false);
     }
     const handleDelete = async () => {
 
         await deleteDocument("authors", authorIdToDelete); 
    
         handleCloseDelete();
     }
 
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
          {authors.slice(page*rowsPerPage, page*rowsPerPage + rowsPerPage).map((row,index) => (
            <StyledTableRow key={row.id || index}>
              <StyledTableCell>{page*rowsPerPage+index + 1}</StyledTableCell>
              <StyledTableCell>{row.name}</StyledTableCell>
              <StyledTableCell>{convertString(row.description)}</StyledTableCell>
              <StyledTableCell align="center">
                <Button onClick={()=> handleEdit(row)} variant="contained" color="primary" size="small" sx={{ mr: 1 }}>
                 <FaRegEdit  />
                </Button>
                <Button onClick={()=> handleOpenDelete(row.id)} variant="contained" color="error" size="small">
                  <MdDelete  />
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      <ModalDelete openDelete={openDelete} handleCloseDelete={handleCloseDelete} handleDelete={handleDelete} />
    </TableContainer>
    <TablePaginationPage rowsPerPage={rowsPerPage} page={page} handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage} count={authors.length} />
    </>

  );
}
