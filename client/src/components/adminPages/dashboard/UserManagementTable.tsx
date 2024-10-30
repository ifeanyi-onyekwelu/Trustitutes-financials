const UserManagementTable = ({
    users,
    activateUserAccount,
    deleteUserAccount,
    openModal,
    suspendUserAccount,
    handleMutation,
}: any) => {
    return (
        <div className="overflow-auto">
            <table className="w-full text-left table-auto">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Username</th>
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
                                    {user.username}
                                </td>
                                <td className="border px-4 py-2">
                                    {user.isActive ? (
                                        <p className="bg-green-600 text-white rounded-md text-center text-sm">
                                            Active
                                        </p>
                                    ) : (
                                        <p className="bg-red-600 text-white rounded-md text-center text-sm">
                                            Inactive
                                        </p>
                                    )}
                                </td>
                                <td className="border px-4 py-2 flex justify-between space-x-2">
                                    {user.isActive ? (
                                        <>
                                            <button
                                                className="bg-yellow-500 text-white px-2 py-1 rounded"
                                                onClick={() =>
                                                    handleMutation(
                                                        suspendUserAccount,
                                                        user._id
                                                    )
                                                }
                                            >
                                                Suspend
                                            </button>
                                            <button
                                                className="bg-red-500 text-white px-2 py-1 rounded"
                                                onClick={() =>
                                                    openModal({
                                                        title: "Delete User",
                                                        message: `Are you sure you want to delete ${user.firstName} ${user.lastName}?`,
                                                        onConfirm: () =>
                                                            handleMutation(
                                                                deleteUserAccount,
                                                                user._id
                                                            ),
                                                    })
                                                }
                                            >
                                                Delete
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button
                                                className="bg-green-500 text-white px-2 py-1 rounded"
                                                onClick={() =>
                                                    handleMutation(
                                                        activateUserAccount,
                                                        user._id
                                                    )
                                                }
                                            >
                                                Activate
                                            </button>

                                            <button
                                                className="bg-red-500 text-white px-2 py-1 rounded"
                                                onClick={() =>
                                                    openModal({
                                                        title: "Delete User",
                                                        message: `Are you sure you want to delete ${user.firstName} ${user.lastName}?`,
                                                        onConfirm: () =>
                                                            handleMutation(
                                                                deleteUserAccount,
                                                                user._id
                                                            ),
                                                    })
                                                }
                                            >
                                                Delete
                                            </button>
                                        </>
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
