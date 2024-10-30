import React, { useState, useEffect } from "react";
import {
    useChangePasswordMutation,
    useDeleteAccountMutation,
    useFetchUserProfileQuery,
    usePauseAccountMutation,
    useResumeAccountMutation,
    useUpdateProfileInformationMutation,
    useUploadProfileImageMutation,
} from "../user/userApiSlice";
import { useNavigate } from "react-router-dom";

interface FormData {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    address: string;
    state: string;
    zipcode: string;
    country: string;
}

const Profile = () => {
    const { data: profileData } = useFetchUserProfileQuery("userProfile");
    const [profile, setProfile] = useState(profileData?.user || {});
    const [successMsg, setSuccessMsg] = useState("");

    const [currentPassword, setCurrentPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");

    const navigate = useNavigate();

    const [formData, setFormData] = useState<FormData>({
        firstName: profile.firstName || "",
        lastName: profile.lastName || "",
        username: profile.username || "",
        email: profile.email || "",
        address: profile.address || "",
        state: profile.state || "",
        zipcode: profile.zipcode || "",
        country: profile.country || "",
    });

    useEffect(() => {
        if (profileData) {
            setProfile(profileData.user);
            setFormData({
                firstName: profileData.user.firstName,
                lastName: profileData.user.lastName,
                username: profileData.user.username,
                email: profileData.user.email,
                address: profileData.user.address,
                state: profileData.user.state,
                zipcode: profileData.user.zipcode,
                country: profileData.user.country,
            });
        }
    }, [profileData]);

    const [activeTab, setActiveTab] = useState("overview");
    const [errorMsg, setErrorMsg] = useState("");

    const [updateProfile, { isLoading: updateProfileLoading }] =
        useUpdateProfileInformationMutation();

    const [uploadImage] = useUploadProfileImageMutation();

    const [deleteAccount] = useDeleteAccountMutation();

    const [activateAccount, { isLoading: activateAccountLoading }] =
        useResumeAccountMutation();

    const [pauseAccount, { isLoading: pauseAccountLoading }] =
        usePauseAccountMutation();

    const [changePassword, { isLoading: changePasswordLoading }] =
        useChangePasswordMutation();

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const updateProfileInformation = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await updateProfile(formData).unwrap();
            setProfile(response.user); // Update the local profile state
            setFormData(response.user); // Update the form data state
            setSuccessMsg("Profile updated successfully!");
            setErrorMsg("");
        } catch (err: any) {
            setErrorMsg(err);
        }
    };

    const handleDeleteAccount = async () => {
        console.log("DELETE ACCOUNT!");
        try {
            await deleteAccount("deleteAccount").unwrap();
            setErrorMsg("");
            setProfile((prevState: any) => ({
                ...prevState,
                isActive: false,
                isDeleted: true,
            }));
            localStorage.removeItem("accessToken");
            navigate("/");
        } catch (err: any) {
            setErrorMsg(err);
        }
    };

    const handlePauseAccount = async () => {
        console.log("PAUSE ACCOUNT!");
        try {
            await pauseAccount("pauseAccount");
            setProfile((prevState: any) => ({
                ...prevState,
                isActive: false,
            }));
            setErrorMsg("");
        } catch (err: any) {
            setErrorMsg(err);
        }
    };

    const handleResumeAccount = async () => {
        console.log("RESUME ACCOUNT!");
        try {
            await activateAccount("resumeAccount").unwrap();
            setErrorMsg("");
            setProfile((prevState: any) => ({
                ...prevState,
                isActive: true,
            }));
        } catch (err: any) {
            setErrorMsg(err);
        }
    };

    const handleUploadImage = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            // Example of uploading image using FormData
            const formData = new FormData();
            formData.append("file", file);

            // Replace 'uploadProfileImage' with your API endpoint for uploading images
            const response: any = await uploadImage(formData);

            setProfile((prevProfile: any) => ({
                ...prevProfile,
                profilePicture: response.imageUrl,
            }));
            setSuccessMsg("Profile image updated successfully!");
        } catch (err: any) {
            setErrorMsg(err.message || "An error occurred");
        }
    };

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await changePassword({ currentPassword, newPassword });
            setSuccessMsg("Password changed");
            setErrorMsg("");
            setCurrentPassword("");
            setNewPassword("");
        } catch (err: any) {
            setErrorMsg(err.message || "An error occurred");
        }
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case "overview":
                return (
                    <div className="pt-3">
                        <h3 className="text-2xl font-bold border-b-2 mb-4">
                            Profile Information
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-1 text-gray-700 font-medium">
                                Full Name
                            </div>
                            <div className="col-span-1">{`${profile.firstName} ${profile.lastName}`}</div>
                            <div className="col-span-1 text-gray-700 font-medium">
                                Email
                            </div>
                            <div className="col-span-1">{profile.email}</div>
                            <div className="col-span-1 text-gray-700 font-medium">
                                Username
                            </div>
                            <div className="col-span-1">{profile.username}</div>
                        </div>
                    </div>
                );
            case "edit":
                return (
                    <div className="pt-3">
                        <form onSubmit={updateProfileInformation}>
                            <div className="mb-3 flex flex-col sm:flex-row">
                                <label
                                    htmlFor="profileImage"
                                    className="sm:w-1/4 font-medium"
                                >
                                    Profile Image
                                </label>
                                <div className="sm:w-3/4 flex items-center">
                                    <img
                                        src={
                                            profile.profilePicture ||
                                            "/default-profile.png"
                                        }
                                        alt="Profile"
                                        className="w-16 h-16 rounded-full object-cover mr-4"
                                    />
                                    <div className="flex space-x-2">
                                        <label className="bg-blue-500 text-white p-2 rounded text-sm hover:bg-blue-600 transition cursor-pointer">
                                            Upload
                                            <input
                                                type="file"
                                                className="hidden"
                                                onChange={handleUploadImage}
                                            />
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-3 flex flex-col sm:flex-row">
                                <label
                                    htmlFor="firstName"
                                    className="sm:w-1/4 font-medium"
                                >
                                    First Name
                                </label>
                                <div className="sm:w-3/4">
                                    <input
                                        name="firstName"
                                        type="text"
                                        className="form-control w-full p-2 border border-gray-300 rounded"
                                        id="firstName"
                                        value={formData.firstName}
                                        onChange={onChange}
                                    />
                                </div>
                            </div>
                            <div className="mb-3 flex flex-col sm:flex-row">
                                <label
                                    htmlFor="lastName"
                                    className="sm:w-1/4 font-medium"
                                >
                                    Last Name
                                </label>
                                <div className="sm:w-3/4">
                                    <input
                                        name="lastName"
                                        type="text"
                                        className="form-control w-full p-2 border border-gray-300 rounded"
                                        id="lastName"
                                        value={formData.lastName}
                                        onChange={onChange}
                                    />
                                </div>
                            </div>
                            <div className="mb-3 flex flex-col sm:flex-row">
                                <label
                                    htmlFor="username"
                                    className="sm:w-1/4 font-medium"
                                >
                                    Username
                                </label>
                                <div className="sm:w-3/4">
                                    <input
                                        name="username"
                                        type="text"
                                        className="form-control w-full p-2 border border-gray-300 rounded"
                                        id="username"
                                        value={formData.username}
                                        onChange={onChange}
                                    />
                                </div>
                            </div>
                            <div className="mb-3 flex flex-col sm:flex-row">
                                <label
                                    htmlFor="email"
                                    className="sm:w-1/4 font-medium"
                                >
                                    Email Address
                                </label>
                                <div className="sm:w-3/4">
                                    <input
                                        name="email"
                                        type="text"
                                        className="form-control w-full p-2 border border-gray-300 rounded"
                                        id="email"
                                        value={formData.email}
                                        onChange={onChange}
                                        disabled
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="bg-deepNavyBlue text-white p-2 rounded text-sm hover:bg-black transition"
                                >
                                    {updateProfileLoading
                                        ? "Loading..."
                                        : "Save Changes"}
                                </button>
                            </div>
                            <p>{successMsg && successMsg}</p>
                        </form>
                    </div>
                );
            case "security":
                return (
                    <div className="pt-3">
                        <h3 className="text-2xl font-bold mb-3">
                            Change Password
                        </h3>
                        <form onSubmit={handleChangePassword}>
                            <div className="mb-3 flex flex-col sm:flex-row">
                                <label
                                    htmlFor="currentPassword"
                                    className="sm:w-1/4 font-medium"
                                >
                                    Current Password
                                </label>
                                <div className="sm:w-3/4">
                                    <input
                                        name="currentPassword"
                                        type="password"
                                        className="form-control w-full p-2 border border-gray-300 rounded"
                                        id="currentPassword"
                                        value={currentPassword}
                                        onChange={(e) =>
                                            setCurrentPassword(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                            <div className="mb-3 flex flex-col sm:flex-row">
                                <label
                                    htmlFor="currentPassword"
                                    className="sm:w-1/4 font-medium"
                                >
                                    New Password
                                </label>
                                <div className="sm:w-3/4">
                                    <input
                                        name="newPassword"
                                        type="password"
                                        className="form-control w-full p-2 border border-gray-300 rounded"
                                        id="newPassword"
                                        value={newPassword}
                                        onChange={(e) =>
                                            setNewPassword(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="bg-deepNavyBlue text-white p-2 rounded text-sm hover:bg-black transition"
                                >
                                    {changePasswordLoading
                                        ? "Loading..."
                                        : "Save Changes"}
                                </button>
                            </div>
                            <p>{successMsg && successMsg}</p>
                        </form>
                    </div>
                );
            case "account":
                return (
                    <div className="pt-3">
                        <h3 className="text-xl font-bold mb-4">
                            Account Settings
                        </h3>
                        <div className="flex justify-between items-center mb-4">
                            <span>Delete Account</span>
                            <button
                                className="bg-red-500 text-white p-2 rounded text-sm hover:bg-red-600 transition"
                                onClick={handleDeleteAccount}
                            >
                                {pauseAccountLoading
                                    ? "Deleting..."
                                    : "Delete Account"}
                            </button>
                        </div>
                        <div className="flex justify-between items-center">
                            {profile.isActive ? (
                                <>
                                    <span>Pause Account</span>
                                    <button
                                        className="bg-yellow-500 text-white p-2 rounded text-sm hover:bg-yellow-600 transition"
                                        onClick={handlePauseAccount}
                                    >
                                        {pauseAccountLoading
                                            ? "Pausing..."
                                            : "Pause Account"}
                                    </button>
                                </>
                            ) : (
                                <>
                                    <span>Activate Account</span>
                                    <button
                                        className="bg-green-500 text-white p-2 rounded text-sm hover:bg-yellow-600 transition"
                                        onClick={handleResumeAccount}
                                    >
                                        {activateAccountLoading
                                            ? "Activating..."
                                            : "Resume Account"}
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="flex">
            <div className="w-1/4 border-r-2 p-3">
                <ul className="space-y-2">
                    <li
                        className={`cursor-pointer ${
                            activeTab === "overview" ? "font-bold" : ""
                        }`}
                        onClick={() => setActiveTab("overview")}
                    >
                        Profile Overview
                    </li>
                    <li
                        className={`cursor-pointer ${
                            activeTab === "edit" ? "font-bold" : ""
                        }`}
                        onClick={() => setActiveTab("edit")}
                    >
                        Edit Profile
                    </li>
                    <li
                        className={`cursor-pointer ${
                            activeTab === "security" ? "font-bold" : ""
                        }`}
                        onClick={() => setActiveTab("security")}
                    >
                        Security
                    </li>
                    <li
                        className={`cursor-pointer ${
                            activeTab === "account" ? "font-bold" : ""
                        }`}
                        onClick={() => setActiveTab("account")}
                    >
                        Account Settings
                    </li>
                </ul>
            </div>
            <div className="w-3/4 p-3">
                {errorMsg && <p className="text-red-500 mb-3">{errorMsg}</p>}
                {renderTabContent()}
            </div>
        </div>
    );
};

export default Profile;
