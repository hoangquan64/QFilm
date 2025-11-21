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
import { deleteDocument } from '../../../../services/firebaseService';
import TablePaginationPage from '../../../../components/admin/TablePagination';
import { SectionContext } from '../../../../contexts/SectionProvider';
import Movies from '../movies/Movies';
import { MovieContext } from '../../../../contexts/MovieProvider';
import { getOjectById } from '../../../../untils/reponsity';
import { Box } from '@mui/material';
import { EpisodeContext } from '../../../../contexts/EpisodeProvider';

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



export default function TableCategory({ handleEdit }) {
    const episodes = useContext(EpisodeContext);
    const movies  = useContext(MovieContext);
    const [openDelete, setOpenDelete] = useState(false);
    const [episodeIdToDelete, setEpisodeIdToDelete] = useState(null); // Lưu ID của thể loại cần xóa
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
        setEpisodeIdToDelete(id); // Lưu ID của thể loại cần xóa
    }
    const handleCloseDelete = () => setOpenDelete(false);



    const handleDelete = async () => {
        // Thực hiện hành động xóa ở đây
        await deleteDocument("episodes", episodeIdToDelete);
        handleCloseDelete(); // Đóng modal sau khi xóa
    }
    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>#</StyledTableCell>
                             <StyledTableCell>ImgUrl</StyledTableCell>
                            <StyledTableCell>MovieID</StyledTableCell>
                            <StyledTableCell>EpisodeNumber</StyledTableCell>
                           
                            <StyledTableCell align="center">Action</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {episodes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                            <StyledTableRow key={row.id || index}>
                                <StyledTableCell>{page * rowsPerPage + index + 1}</StyledTableCell>
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
                                <StyledTableCell>{row.episodeNumber}</StyledTableCell>
                                <StyledTableCell>{getOjectById(movies, row.movieID)?.name}</StyledTableCell>
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
            <TablePaginationPage rowsPerPage={rowsPerPage} page={page} handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage} count={episodes.length} />
        </>
    );
}
