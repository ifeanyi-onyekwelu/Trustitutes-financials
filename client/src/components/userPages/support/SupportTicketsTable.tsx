import React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableHead from "@mui/material/TableHead";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { Button } from "@mui/material";
import SupportTicketDetails from "./ViewSupportDialog";

interface SupportTicket {
    _id: string;
    department: string;
    ticketId: string;
    createdAt: any;
    status: string;
}

interface TablePaginationActionsProps {
    count: number;
    page: number;
    rowsPerPage: number;
    onPageChange: (
        event: React.MouseEvent<HTMLButtonElement>,
        newPage: number
    ) => void;
}

interface SupportTicketsTableProps {
    supportTickets: SupportTicket[];
}

function TablePaginationActions(props: TablePaginationActionsProps) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => onPageChange(event, 0);
    const handleBackButtonClick = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => onPageChange(event, page - 1);
    const handleNextButtonClick = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => onPageChange(event, page + 1);
    const handleLastPageButtonClick = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === "rtl" ? (
                    <LastPageIcon />
                ) : (
                    <FirstPageIcon />
                )}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === "rtl" ? (
                    <KeyboardArrowRight />
                ) : (
                    <KeyboardArrowLeft />
                )}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === "rtl" ? (
                    <KeyboardArrowLeft />
                ) : (
                    <KeyboardArrowRight />
                )}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === "rtl" ? (
                    <FirstPageIcon />
                ) : (
                    <LastPageIcon />
                )}
            </IconButton>
        </Box>
    );
}

const SupportTicketsTable: React.FC<SupportTicketsTableProps> = ({
    supportTickets,
}) => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [open, setOpen] = React.useState(false);
    const [selectedTicket, setSelectedTicket] =
        React.useState<SupportTicket | null>(null);

    const handleClose = () => {
        setOpen(false);
        setSelectedTicket(null); // Clear the selected ticket when closing
    };

    const handleViewClick = (ticket: SupportTicket) => {
        setSelectedTicket(ticket);
        setOpen(true);
    };

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number
    ) => setPage(newPage);

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <>
            <TableContainer component={Paper}>
                <Table
                    sx={{ minWidth: 650, bgcolor: "#333e" }}
                    aria-label="supportTicket history table"
                >
                    <TableHead>
                        <TableRow>
                            {[
                                "Department",
                                "Ticket ID",
                                "Date",
                                "Status",
                                "Action",
                            ].map((text, index) => (
                                <TableCell key={index} sx={{ color: "#fff" }}>
                                    {text}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? supportTickets.slice(
                                  page * rowsPerPage,
                                  page * rowsPerPage + rowsPerPage
                              )
                            : supportTickets
                        ).map((supportTicket) => (
                            <TableRow key={supportTicket._id}>
                                <TableCell sx={{ color: "#fff" }}>
                                    {supportTicket.department}
                                </TableCell>
                                <TableCell sx={{ color: "#fff" }}>
                                    {supportTicket._id}
                                </TableCell>
                                <TableCell sx={{ color: "#fff" }}>
                                    {new Date(
                                        supportTicket.createdAt
                                    ).toLocaleDateString()}
                                </TableCell>
                                <TableCell sx={{ color: "#fff" }}>
                                    {supportTicket.status}
                                </TableCell>
                                <TableCell sx={{ color: "#fff" }}>
                                    <Button
                                        type="button"
                                        variant="contained"
                                        color="primary"
                                        onClick={() =>
                                            handleViewClick(supportTicket)
                                        }
                                    >
                                        View
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                sx={{ color: "#fff" }}
                                rowsPerPageOptions={[5, 10]}
                                count={supportTickets.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>

            {/* Modal to view selected ticket details */}
            <SupportTicketDetails
                open={open}
                onClose={handleClose}
                ticket={selectedTicket} // Pass the selected ticket to the dialog
            />
        </>
    );
};

export default SupportTicketsTable;
