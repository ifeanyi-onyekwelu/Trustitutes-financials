import { useState } from "react";
import { Button } from "@mui/material";
import Alert from "../../components/common/Alert";
import { useNavigate, useParams } from "react-router-dom";
import {
    useSuspendUserAccountMutation,
    useActivateUserAccountMutation,
    useDeleteUserAccountMutation,
    useFetchUserByIdQuery,
    useBlockUserAccountMutation,
    useUnblockUserAccountMutation,
} from "./adminApiSlie";
import { BiLock, BiLockOpen, BiTrash } from "react-icons/bi";
import { Link } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";

const UserDetailsPage = () => {
    const { userId } = useParams();
    const {
        data: userData,
        isLoading,
        isError,
    } = useFetchUserByIdQuery(userId);

    const user = userData?.user;

    const [suspendUserAccount] = useSuspendUserAccountMutation();
    const [activateUserAccount] = useActivateUserAccountMutation();
    const [deleteUserAccount] = useDeleteUserAccountMutation();

    const [blockUserAccount] = useBlockUserAccountMutation();
    const [unblockUserAccount] = useUnblockUserAccountMutation();

    const [errorMessage, setErrorMessage] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [statusType, setStatusType] = useState<"error" | "success">("error");
    const [showAlert, setShowAlert] = useState<boolean>(false);

    const navigate = useNavigate();

    const handleAccountAction = async (
        action: () => Promise<any>,
        successMsg: string
    ) => {
        try {
            await action();
            setSuccessMessage(successMsg);
            setStatusType("success");
        } catch (error) {
            console.error("Action failed:", error);
            setErrorMessage("An error occurred while processing your request.");
            setStatusType("error");
        } finally {
            setShowAlert(true);
            location.href = "/admin/dashboard/users";
        }
    };

    if (isLoading) {
        return <p>Loading user details...</p>;
    }

    if (isError || !user) {
        return <p>Error loading user details.</p>;
    }

    return (
        <>
            <Button
                type="button"
                variant="contained"
                startIcon={<IoChevronBack />}
                color="primary"
                sx={{ marginBottom: "30px" }}
                onClick={() => navigate("/admin/dashboard/users")}
            >
                Go Back
            </Button>

            <form className="space-y-10">
                <div className="flex space-x-5 items-center">
                    <span className="p-2 px-3 rounded-full text-gray-400 border-2">
                        01
                    </span>
                    <p className="text-2xl font-semibold text-gray-400">
                        Personal Details
                    </p>
                </div>
                <div className="space-y-3">
                    <div className="flex md:space-x-5 md:flex-row flex-col w-full md:space-y-0 space-y-4">
                        <input
                            className="w-full py-2 px-4 bg-gray-900 text-gray-100 border rounded-md border-gray-300 focus:border-blue-800 focus:outline-none font-medium"
                            value={user.firstName}
                            disabled
                        />
                        <input
                            className="w-full py-2 px-4 bg-gray-900 text-gray-100 border rounded-md border-gray-300 focus:border-blue-800 focus:outline-none font-medium"
                            value={user.middleName}
                            disabled
                        />
                        <input
                            className="w-full py-2 px-4 bg-gray-900 text-gray-100 border rounded-md border-gray-300 focus:border-blue-800 focus:outline-none font-medium"
                            value={user.lastName}
                            disabled
                        />
                    </div>

                    <div className="flex md:space-x-5 md:flex-row flex-col w-full md:space-y-0 space-y-4">
                        <input
                            className="w-full py-2 px-4 bg-gray-900 text-gray-100 border rounded-md border-gray-300 focus:border-blue-800 focus:outline-none font-medium"
                            value={user.country}
                            disabled
                        />
                        <input
                            className="w-full py-2 px-4 bg-gray-900 text-gray-100 border rounded-md border-gray-300 focus:border-blue-800 focus:outline-none font-medium"
                            value={user.state}
                            disabled
                        />
                        <input
                            className="w-full py-2 px-4 bg-gray-900 text-gray-100 border rounded-md border-gray-300 focus:border-blue-800 focus:outline-none font-medium"
                            value={user.city}
                            disabled
                        />
                        <input
                            className="w-full py-2 px-4 bg-gray-900 text-gray-100 border rounded-md border-gray-300 focus:border-blue-800 focus:outline-none font-medium"
                            value={user.zipcode}
                            disabled
                        />
                    </div>

                    <input
                        className="w-full py-2 px-4 bg-gray-900 text-gray-100 border rounded-md border-gray-300 focus:border-blue-800 focus:outline-none font-medium"
                        value={user.address}
                        disabled
                    />

                    <div className="flex md:space-x-5 md:flex-row flex-col w-full md:space-y-0 space-y-4">
                        <input
                            className="w-full py-2 px-4 bg-gray-900 text-gray-100 border rounded-md border-gray-300 focus:border-blue-800 focus:outline-none font-medium"
                            value={user.email}
                            disabled
                        />
                        <input
                            className="w-full py-2 px-4 bg-gray-900 text-gray-100 border rounded-md border-gray-300 focus:border-blue-800 focus:outline-none font-medium"
                            value={user.dateOfBirth}
                            disabled
                        />
                        <input
                            className="w-full py-2 px-4 bg-gray-900 text-gray-100 border rounded-md border-gray-300 focus:border-blue-800 focus:outline-none font-medium"
                            value={user.phoneNumber}
                            disabled
                        />
                    </div>

                    <input
                        className="w-full py-2 px-4 bg-gray-900 text-gray-100 border rounded-md border-gray-300 focus:border-blue-800 focus:outline-none font-medium"
                        value={user.ssn}
                        disabled
                    />
                </div>
            </form>

            <div className="flex space-x-5 items-center my-10">
                <span className="p-2 px-3 rounded-full text-red-600 border-2 border-red-700">
                    02
                </span>
                <p className="text-2xl font-semibold text-red-700">Danger</p>
            </div>

            <div className="bg-gray-900 p-6 border border-red-900 rounded-lg space-y-6">
                {/* Suspend/Activate Account Section */}
                <div className="flex flex-col space-y-3 md:flex-row md:space-y-0 md:space-x-3 justify-between text-white items-center">
                    <div className="flex-1">
                        <h3 className="text-xl font-medium">
                            {user.isActive
                                ? "Suspend Account"
                                : "Activate Account"}
                        </h3>
                        <p>
                            {user.isActive
                                ? "Temporarily disable user access."
                                : "Restore user access to the account."}
                        </p>
                    </div>
                    <Button
                        type="button"
                        variant="contained"
                        startIcon={user.isActive ? <BiLock /> : <BiLockOpen />}
                        color={user.isActive ? "error" : "success"}
                        className="w-full md:w-auto"
                        onClick={() =>
                            handleAccountAction(
                                user.isActive
                                    ? () => suspendUserAccount(userId)
                                    : () => activateUserAccount(userId),
                                user.isActive
                                    ? "Account suspended successfully."
                                    : "Account activated successfully."
                            )
                        }
                    >
                        {user.isActive ? "Suspend Account" : "Activate Account"}
                    </Button>
                </div>

                {/* Block/Unblock Account Section */}
                <div className="flex flex-col space-y-3 md:flex-row md:space-y-0 md:space-x-3 justify-between text-white items-center">
                    <div className="flex-1">
                        <h3 className="text-xl font-medium">
                            {user.isBlocked
                                ? "Unblock Account"
                                : "Block Account"}
                        </h3>
                        <p>
                            {user.isBlocked
                                ? "Allow user to make transfers again."
                                : "Restrict user from making transfers."}
                        </p>
                    </div>
                    <Button
                        type="button"
                        variant="contained"
                        startIcon={user.isBlocked ? <BiLockOpen /> : <BiLock />}
                        color={user.isBlocked ? "success" : "warning"}
                        className="w-full md:w-auto"
                        onClick={() =>
                            handleAccountAction(
                                user.isBlocked
                                    ? () => unblockUserAccount(userId)
                                    : () => blockUserAccount(userId),
                                user.isBlocked
                                    ? "Account unblocked successfully."
                                    : "Account blocked successfully."
                            )
                        }
                    >
                        {user.isBlocked ? "Unblock Account" : "Block Account"}
                    </Button>
                </div>

                {/* Delete Account Section */}
                <div className="flex flex-col space-y-3 md:flex-row md:space-y-0 md:space-x-3 justify-between text-white items-center">
                    <div className="flex-1">
                        <h3 className="text-xl font-medium">Delete Account</h3>
                        <p>Permanently remove user account and data.</p>
                    </div>
                    <Button
                        type="button"
                        variant="contained"
                        startIcon={<BiTrash />}
                        color="error"
                        className="w-full md:w-auto"
                        onClick={() =>
                            handleAccountAction(
                                () => deleteUserAccount(userId),
                                "Account deleted successfully."
                            )
                        }
                    >
                        Delete Account
                    </Button>
                </div>
            </div>

            {showAlert && (
                <Alert
                    successMessage={successMessage}
                    errorMessage={errorMessage}
                    statusType={statusType}
                    showAlert={showAlert}
                    setShowAlert={setShowAlert}
                />
            )}
        </>
    );
};

export default UserDetailsPage;
