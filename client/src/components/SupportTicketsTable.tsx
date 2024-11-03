import { Link } from "react-router-dom";

const SupportTicketsTable = ({ supportTickets }: any) => {
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
                                <td className="px-4 py-2 text-gray-700">{`${ticket?.user?.firstName} ${ticket?.user?.lastName}`}</td>
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
                                    <Link to={`${ticket._id}`}>View</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-gray-600">No supportTickets</p>
            )}
        </div>
    );
};

export default SupportTicketsTable;
