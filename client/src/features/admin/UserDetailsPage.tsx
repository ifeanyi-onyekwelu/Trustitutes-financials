import { useParams } from "react-router-dom";
import {
    useSuspendUserAccountMutation,
    useActivateUserAccountMutation,
    useDeleteUserAccountMutation,
    useFetchAUserQuery,
} from "./adminApiSlie";

const UserDetailsPage = () => {
    const { userId } = useParams();
    const { data: user, isLoading, isError } = useFetchAUserQuery(userId);

    console.log(user);

    const [suspendUserAccount] = useSuspendUserAccountMutation();
    const [activateUserAccount] = useActivateUserAccountMutation();
    const [deleteUserAccount] = useDeleteUserAccountMutation();

    const handleSuspendAccount = async () => {
        try {
            await suspendUserAccount(userId);
        } catch (error) {
            // Handle error
        }
    };

    const handleActivateAccount = async () => {
        try {
            await activateUserAccount(userId);
            // Optionally: Update user state or show success message
        } catch (error) {
            // Handle error
        }
    };

    const handleDeleteAccount = async () => {
        try {
            await deleteUserAccount(userId);
            // Optionally: Redirect or show success message
        } catch (error) {
            // Handle error
        }
    };

    if (isLoading) {
        return <p>Loading user details...</p>;
    }

    if (isError || !user) {
        return <p>Error loading user details.</p>;
    }

    // Determine which action button to display based on user's isActive status
    let actionButton;
    if (user.isActive) {
        actionButton = (
            <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                onClick={handleSuspendAccount}
            >
                Suspend Account
            </button>
        );
    } else {
        actionButton = (
            <button
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
                onClick={handleActivateAccount}
            >
                Activate Account
            </button>
        );
    }

    return (
        <div className="p-6">
            <h1 className="text-3xl font-semibold mb-6">User Details</h1>
            <div className="bg-white shadow-lg rounded-lg p-6">
                <div className="mb-4">
                    <h2 className="text-xl font-semibold">User</h2>
                    <p>
                        {user.firstName} {user.lastName}
                    </p>
                </div>
                <div className="mb-4">
                    <h2 className="text-xl font-semibold">Email Address</h2>
                    <p>{user.email}</p>
                </div>
                <div className="mb-4">
                    <h2 className="text-xl font-semibold">Username</h2>
                    <p>{user.username}</p>
                </div>
                <div className="mb-4">
                    <h2 className="text-xl font-semibold">Status</h2>
                    <p>{user.isActive ? "Active" : "Inactive"}</p>
                </div>
                <div className="flex space-x-4 mb-4">
                    {actionButton}
                    <button
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                        onClick={handleDeleteAccount}
                    >
                        Delete Account
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserDetailsPage;
