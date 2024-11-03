import { Button } from "@mui/material";
import { BiLockOpen, BiTrash } from "react-icons/bi";
import { BiLock } from "react-icons/bi";

const UserManagementTable = ({
    users,
    activateUserAccount,
    suspendUserAccount,
    handleMutation,
}: any) => {
    return (
        <div className="overflow-auto">
            <table className="w-full text-left table-auto">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Email</th>
                        <th className="px-4 py-2">Status</th>
                        <th className="px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users &&
                        users.map((user: any) => (
                            <tr key={user._id}>
                                <td className="border px-4 py-2">
                                    {user.firstName} {user.lastName}
                                </td>
                                <td className="border px-4 py-2">
                                    {user.email}
                                </td>
                                <td className="border px-4 py-2">
                                    {user.isActive ? (
                                        <p className="bg-green-600 text-white rounded-sm text-center text-sm py-2 uppercase font-bold px-4">
                                            Active
                                        </p>
                                    ) : (
                                        <p className="bg-red-600 text-white rounded-sm  text-center text-sm py-3 uppercase font-bold">
                                            Inactive
                                        </p>
                                    )}
                                </td>
                                <td className="border px-4 py-2 flex justify-end space-x-2">
                                    {user.isActive ? (
                                        <Button
                                            type="button"
                                            variant="contained"
                                            color="error"
                                            startIcon={<BiLock />}
                                            onClick={() =>
                                                handleMutation(
                                                    suspendUserAccount,
                                                    user._id
                                                )
                                            }
                                        >
                                            Deactivate
                                        </Button>
                                    ) : (
                                        <Button
                                            type="button"
                                            variant="contained"
                                            color="success"
                                            startIcon={<BiLockOpen />}
                                            onClick={() =>
                                                handleMutation(
                                                    activateUserAccount,
                                                    user._id
                                                )
                                            }
                                        >
                                            Activate
                                        </Button>
                                    )}
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserManagementTable;
