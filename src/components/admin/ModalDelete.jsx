import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export function ModalDelete({ openDelete, handleCloseDelete , handleDelete }) {
    return (
        <div>
            <Modal
                open={openDelete}
                onClose={handleCloseDelete}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <  Typography className='flex justify-center' id="modal-modal-title" variant="h6" component="h2">
                        Modal Delete
                    </Typography>
                    <Typography className='flex justify-center ' id="modal-modal-description" sx={{ mt: 2 }}>
                        Bạn có muốn xoá hay không?
                    </Typography>
                    <Stack className='flex justify-center' spacing={2} direction="row" sx={{ mt: 2 }}>

                        <Button onClick={handleCloseDelete} variant="contained">CANCEL
                        </Button>
                        <Button onClick={handleDelete} variant="contained" color='error'>DELETE</Button>
                    </Stack>
                </Box>
            </Modal>
        </div>
    );
}