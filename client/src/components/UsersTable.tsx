import { Link } from "react-router-dom";

const UsersTable = ({ users }: any) => {
    return (
        <div className="overflow-x-auto">
            {users.length ? (
                <table className="min-w-full bg-white border border-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 text-left text-gray-600 font-semibold">
                                Full Name
                            </th>
                            <th className="px-4 py-2 text-left text-gray-600 font-semibold">
                                Email
                            </th>
                            <th className="px-4 py-2 text-left text-gray-600 font-semibold">
                                Username
                            </th>
                            <th className="px-4 py-2 text-left text-gray-600 font-semibold">
                                Status
                            </th>
                            <th className="px-4 py-2 text-left text-gray-600 font-semibold">
                                Verified
                            </th>
                            <th className="px-4 py-2 text-left text-gray-600 font-semibold">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user: any) => (
                            <tr
                                key={user._id}
                                className="border-t hover:bg-gray-50"
                            >
                                <td className="px-4 py-2 text-gray-700">{`${user.firstName} ${user.lastName}`}</td>
                                <td className="px-4 py-2 text-gray-700">
                                    {user.email}
                                </td>
                                <td className="px-4 py-2 text-gray-700">
                                    {user.username}
                                </td>
                                <td className="px-4 py-2 text-gray-700">
                                    <span
                                        className={`inline-block px-2 py-1 text-sm font-semibold rounded-full ${
                                            user.isActive
                                                ? "bg-green-100 text-green-800"
                                                : "bg-red-100 text-red-800"
                                        }`}
                                    >
                                        {user.isActive ? "Active" : "Inactive"}
                                    </span>
                                </td>
                                <td className="px-4 py-2 text-gray-700">
                                    <span
                                        className={`inline-block px-2 py-1 text-sm font-semibold rounded-full ${
                                            user.isVerified
                                                ? "bg-blue-100 text-blue-800"
                                                : "bg-yellow-100 text-yellow-800"
                                        }`}
                                    >
                                        {user.isVerified
                                            ? "Verified"
                                            : "Not Verified"}
                                    </span>
                                </td>
                                <td className="px-4 py-2 text-blue-500 hover:underline">
                                    <Link to={`${user._id}`}>View</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-gray-600">No users</p>
            )}
        </div>
    );
};

export default UsersTable;
