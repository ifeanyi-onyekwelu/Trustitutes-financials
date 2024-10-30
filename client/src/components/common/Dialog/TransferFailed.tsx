import React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import ErrorIcon from "@mui/icons-material/Error";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
    },
}));

const TransferFailed = ({ open, onClose }: any) => {
    return (
        <BootstrapDialog
            onClose={onClose}
            aria-labelledby="customized-dialog-title"
            open={open}
        >
            <DialogTitle
                sx={{
                    m: 0,
                    p: 2,
                    bgcolor: "error.main",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                }}
                id="customized-dialog-title"
            >
                <ErrorIcon sx={{ mr: 1 }} /> Transfer Failed
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: "white",
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                <Typography gutterBottom color="error">
                    Unfortunately, your transfer could not be processed at this
                    time. Please check your details and try again.
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button
                    autoFocus
                    onClick={onClose}
                    color="error"
                    variant="contained"
                >
                    Close
                </Button>
            </DialogActions>
        </BootstrapDialog>
    );
};

export default TransferFailed;
