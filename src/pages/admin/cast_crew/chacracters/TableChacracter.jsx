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
import { Button, Box } from '@mui/material';
import { useContext } from 'react';
import { ChacracterContext } from '../../../../contexts/ChacracterProvider';
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
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export default function CustomizedTables({handleEdit }) {
    const chacracters = useContext(ChacracterContext);

    const [openDelete, setOpenDelete] = useState(false);
    const [chacracterIdToDelete, setChacracterIdToDelete] = useState(null);
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
        setChacracterIdToDelete(id);
    }
    const handleCloseDelete = () => {
        setOpenDelete(false);
    }
    const handleDelete = async () => {

        await deleteDocument("chacracters", chacracterIdToDelete);

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
                        <StyledTableCell>Image</StyledTableCell>
                        <StyledTableCell>Description</StyledTableCell>
                        <StyledTableCell align="center">Action</StyledTableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {chacracters.slice(page*rowsPerPage, page*rowsPerPage + rowsPerPage ).map((row, index) => (
                        <StyledTableRow key={row.id || index}>
                            <StyledTableCell>{page*rowsPerPage+index + 1}</StyledTableCell>
                            <StyledTableCell>{row.name}</StyledTableCell>

                            {/* 👉 Hiển thị ảnh */}
                            <StyledTableCell>
                                <Box
                                    component="img"
                                    src={row.imgUrl}
                                    alt={row.name}
                                    sx={{
                                        width: 40,
                                        height: 40,
                                        objectFit: 'cover',
                                        borderRadius: 1,
                                        boxShadow: 2,
                                    }}
                                    onError={(e) => {
                                        e.target.src =
                                            'https://via.placeholder.com/80x100?text=No+Image';
                                    }}
                                />
                            </StyledTableCell>

                            <StyledTableCell> {convertString(row.description)}</StyledTableCell>

                            <StyledTableCell align="center" sx={{whiteSpace : "nowrap"}}>
                                <Button onClick={() => handleEdit(row)}
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    sx={{ mr: 1 }}
                                >
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
        <TablePaginationPage rowsPerPage={rowsPerPage} page={page} handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage} count={chacracters.length} />
           </>
    );
}
