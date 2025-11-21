import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { FaRegEdit, FaUsers } from 'react-icons/fa';
import { MdCategory, MdDelete, MdPermIdentity } from 'react-icons/md';
import { Button, Box, Tooltip } from '@mui/material';
import { useContext } from 'react';
import { ChacracterContext } from '../../../../contexts/ChacracterProvider';
import { ModalDelete } from '../../../../components/admin/ModalDelete';
import { useState } from 'react';
import { deleteDocument } from '../../../../services/firebaseService';
import TablePaginationPage from '../../../../components/admin/TablePagination';
import { MovieContext } from '../../../../contexts/MovieProvider';
import { Movie_typeContext } from '../../../../contexts/Movie_typeProvider';
import { PlanContext } from '../../../../contexts/PlanProvider';
import { AuthorContext } from '../../../../contexts/AuthorProvider';
import { CategoryContext } from '../../../../contexts/CategoryProvider';
import { ActorContext } from '../../../../contexts/ActorProvider';
import { CountryContext } from '../../../../contexts/CountryProvider';
import { convertString, getOjectById } from '../../../../untils/reponsity';
import { list } from 'firebase/storage';


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

export default function CustomizedTables({ handleEdit }) {
    const movies = useContext(MovieContext);
    const movie_Type = useContext(Movie_typeContext);
    const plans = useContext(PlanContext);
    const authors = useContext(AuthorContext);
    const categories = useContext(CategoryContext);
    const actors = useContext(ActorContext);
    const characters = useContext(ChacracterContext);
    const countris = useContext(CountryContext);

    const [openDelete, setOpenDelete] = useState(false);
    const [MovieIdToDelete, setMovieIdToDelete] = useState(null);
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
        setMovieIdToDelete(id);
    }
    const handleCloseDelete = () => {
        setOpenDelete(false);
    }
    const handleDelete = async () => {

        await deleteDocument("movies", MovieIdToDelete);

        handleCloseDelete();
    }

    function ShowToolTipCate({ data }) {
        return (
            <div>
                {data && data.length > 0 ? (
                    data.map((item, index) => (
                        <span
                            key={index}
                        >
                            {getOjectById(categories, item)?.name} ,
                        </span>
                    ))
                ) : (
                    <span>Không có thể loại</span>
                )}
            </div>
        );
    }
function ShowToolTipActor({  dataActor, dataCharacter }) {
  // Gộp dữ liệu actor và character thành 1 mảng duy nhất
  const mergedList = [
    ...(dataActor?.map((id) => ({ imgUrl: getOjectById(actors, id)?.imgUrl })) || []),
    ...(dataCharacter?.map((id) => ({ imgUrl: getOjectById(characters, id)?.imgUrl })) || []),
  ];

  return (
    <div className="flex gap-1">
      {mergedList.length > 0 ? (
        mergedList.map((item, index) => (
          <img
            key={index}
            src={item.imgUrl}
            alt="#"
            style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              objectFit: "cover",
              marginRight: 6,
            }}
          />
        ))
      ) : (
        <span>Không có diễn viên</span>
      )}
    </div>
  );
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
                            <StyledTableCell>Duration </StyledTableCell>
                            <StyledTableCell>MovieTypeID </StyledTableCell>
                            <StyledTableCell>PlanId </StyledTableCell>
                            <StyledTableCell>CoutryID </StyledTableCell>
                            <StyledTableCell>AuthorId </StyledTableCell>
                            <StyledTableCell>CategoryId</StyledTableCell>
                            <StyledTableCell>Entity</StyledTableCell>
                            <StyledTableCell align="center">Action</StyledTableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {movies?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                            <StyledTableRow key={row.id || index}>
                                <StyledTableCell>{page * rowsPerPage + index + 1}</StyledTableCell>
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


                                <StyledTableCell>{convertString(row.description)}</StyledTableCell>
                                <StyledTableCell>{row.duration}</StyledTableCell>
                                <StyledTableCell>{getOjectById(movie_Type, row.movieTypeID)?.name}</StyledTableCell>
                                <StyledTableCell>{getOjectById(plans, row.planID)?.level}</StyledTableCell>
                                <StyledTableCell>{getOjectById(countris, row.countryID)?.name}</StyledTableCell>
                                <StyledTableCell>{getOjectById(authors, row.authorID)?.name}</StyledTableCell>
                                <StyledTableCell>
                                    <Tooltip title={<ShowToolTipCate data={row.listCategoryID} />} arrow>
                                        <Button><MdCategory /></Button>
                                    </Tooltip>
                                </StyledTableCell>
                                <StyledTableCell>
                                    <Tooltip
                                        title={
                                            <ShowToolTipActor                        
                                                dataActor={row.listActorID}             
                                                dataCharacter={row.listCharacterID}      
                                            />
                                        }
                                        arrow
                                    >
                                        <Button>
                                            <FaUsers />
                                        </Button>
                                    </Tooltip>


                                </StyledTableCell>
                                <StyledTableCell align="center" sx={{ whiteSpace: "nowrap" }}>
                                    <Button onClick={() => handleEdit(row)}
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                        sx={{ mr: 1, }}
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
            <TablePaginationPage rowsPerPage={rowsPerPage} page={page} handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage} count={movies.length} />
        </>
    );
}
