import React, { useState } from "react";
import ReplySupportDialog from "./adminPages/ReplySupportDialog";

const SupportTicketsTable = ({ supportTickets }: any) => {
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedTicketId, setSelectedTicketId] = useState<string | null>(
        null
    );

    const handleOpenDialog = (ticketId: string) => {
        setSelectedTicketId(ticketId);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedTicketId(null); // Reset selected ticket ID
    };

    return (
        <div className="overflow-x-auto">
            {supportTickets.length ? (
                <table className="min-w-full bg-white border border-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 text-left text-gray-600 font-semibold">
                                User
                            </th>
                            <th className="px-4 py-2 text-left text-gray-600 font-semibold">
                                Email Address
                            </th>
                            <th className="px-4 py-2 text-left text-gray-600 font-semibold">
                                Department
                            </th>
                            <th className="px-4 py-2 text-left text-gray-600 font-semibold">
                                Status
                            </th>
                            <th className="px-4 py-2 text-left text-gray-600 font-semibold">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {supportTickets.map((ticket: any) => (
                            <tr
                                key={ticket._id}
                                className="border-t hover:bg-gray-50"
                            >
                                <td className="px-4 py-2 text-gray-700">
                                    <button
                                        onClick={() =>
                                            handleOpenDialog(ticket._id)
                                        }
                                    >
                                        {`${ticket?.user?.firstName} ${ticket?.user?.lastName}`}
                                    </button>
                                </td>
                                <td className="px-4 py-2 text-gray-700">
                                    {ticket?.user?.email}
                                </td>
                                <td className="px-4 py-2 text-gray-700">
                                    {ticket?.department}
                                </td>
                                <td className="px-4 py-2 text-gray-700">
                                    {ticket.status}
                                </td>
                                <td className="px-4 py-2 text-blue-500 hover:underline">
                                    <button
                                        onClick={() =>
                                            handleOpenDialog(ticket._id)
                                        }
                                    >
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-gray-600">No support tickets</p>
            )}
            {/* Render the ReplySupportDialog here */}
            {selectedTicketId && (
                <ReplySupportDialog
                    open={openDialog}
                    onClose={handleCloseDialog}
                    ticketId={selectedTicketId}
                />
            )}
        </div>
    );
};

export default SupportTicketsTable;
