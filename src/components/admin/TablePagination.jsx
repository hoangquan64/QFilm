import * as React from 'react';
import TablePagination from '@mui/material/TablePagination';

export default function TablePaginationPage({rowsPerPage, page, handleChangePage, handleChangeRowsPerPage, count}) {

  return (
    <TablePagination 
     sx={{color : "white" , backgroundColor : "gray" }}
      component="div"
      count={count}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
}
