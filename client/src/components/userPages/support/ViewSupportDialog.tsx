import * as React from "react";
import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function ScrollDialog({ open, onClose, ticket }: any) {
    const [scroll, setScroll] = React.useState<DialogProps["scroll"]>("paper");

    const descriptionElementRef = React.useRef<HTMLElement>(null);
    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    return (
        <Dialog
            open={open}
            onClose={onClose}
            scroll={scroll}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
        >
            <DialogTitle id="scroll-dialog-title">
                Support Ticket Info
            </DialogTitle>
            <DialogContent dividers={scroll === "paper"}>
                <Box sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom>
                        Ticket Details
                    </Typography>
                    <Typography variant="body1">
                        <strong>Department:</strong> {ticket?.department}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Status:</strong> {ticket?.status}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Complaint:</strong>{" "}
                        {ticket?.complaint || "No response"}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Reply:</strong>{" "}
                        {ticket?.response || "No response"}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Date:</strong>{" "}
                        {new Date(ticket?.createdAt).toLocaleString()}
                    </Typography>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}
