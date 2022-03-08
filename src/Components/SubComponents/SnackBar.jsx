import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export default function SimpleSnackbar({ snackbarProps, setSnackbarProps }) {


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackbarProps({ open: false, message: snackbarProps.message })
    };



    const action = (

        <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
        >
            <CloseIcon fontSize="small" />
        </IconButton>
    );

    return (

        <Snackbar
            open={snackbarProps.open}
            autoHideDuration={7000}
            onClose={handleClose}
            message={snackbarProps.messgae}
            action={action}
        />

    );
}