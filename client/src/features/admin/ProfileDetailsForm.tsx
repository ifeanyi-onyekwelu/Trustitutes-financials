import React, { useState } from "react";
import { useUser } from "../../context/UserContext";
import InputField from "../../components/common/InputField";
import { Button } from "@mui/material";
import { useUpdateProfileInformationMutation } from "../../features/user/userApiSlice";
import Alert from "../../components/common/Alert";

const ProfileDetailsForm = () => {
    const userData: any = useUser();
    const [formData, setFormData] = useState({
        firstName: userData?.user?.firstName || "",
        lastName: userData?.user?.lastName || "",
        middleName: userData?.user?.middleName || "",
        email: userData?.user?.email || "",
        phoneNumber: userData?.user?.phoneNumber || "",
        address: userData?.user?.address || "",
        country: userData?.user?.country || "",
        state: userData?.user?.state || "",
        city: userData?.user?.city || "",
        zipcode: userData?.user?.zipcode || "",
        dateOfBirth: userData?.user?.dateOfBirth,
        ssn: userData?.user?.ssn,
    });

    const [errorMessage, setErrorMessage] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [statusType, setStatusType] = useState<"error" | "success">("error");
    const [showAlert, setShowAlert] = useState<boolean>(false);

    const [updateProfile, { isLoading }] =
        useUpdateProfileInformationMutation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await updateProfile({ ...formData });
            setSuccessMessage("Profile Updated Successful");
            setStatusType("success");
            setShowAlert(true);
        } catch (error: any) {
            setErrorMessage(error.data.message || "Transfer Failed");
            setStatusType("error");
            setShowAlert(true);
        }
    };

    const handleInputChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="space-y-10">
                <div className="space-y-3">
                    <div className="flex md:space-x-5 md:flex-row flex-col w-full md:space-y-0 space-y-4">
                        <InputField
                            label="First Name"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            name="firstName"
                            type="text"
                            placeholder="First Name"
                            required
                        />
                        <InputField
                            label="Middle Name"
                            value={formData.middleName}
                            onChange={handleInputChange}
                            name="middleName"
                            type="text"
                            placeholder="Middle Name"
                            required
                        />
                        <InputField
                            label="Last Name"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            name="lastName"
                            type="text"
                            placeholder="Last Name"
                            required
                        />
                    </div>

                    <div className="flex md:space-x-5 md:flex-row flex-col w-full md:space-y-0 space-y-4">
                        <InputField
                            label="Country"
                            value={formData.country}
                            onChange={handleInputChange}
                            name="country"
                            type="text"
                            placeholder="Country"
                            required
                        />
                        <InputField
                            label="State"
                            value={formData.state}
                            onChange={handleInputChange}
                            name="state"
                            type="text"
                            placeholder="State"
                            required
                        />
                        <InputField
                            label="City"
                            value={formData.city}
                            onChange={handleInputChange}
                            name="city"
                            type="text"
                            placeholder="City"
                            required
                        />
                        <InputField
                            label="Zipcode"
                            value={formData.zipcode}
                            onChange={handleInputChange}
                            name="zipcode"
                            type="text"
                            placeholder="Zipcode"
                            required
                        />
                    </div>

                    <InputField
                        label="Address"
                        value={formData.address}
                        onChange={handleInputChange}
                        name="address"
                        type="text"
                        placeholder="Address"
                        required
                    />

                    <div className="flex md:space-x-5 md:flex-row flex-col w-full md:space-y-0 space-y-4">
                        <InputField
                            label="Email Address"
                            value={formData.email}
                            onChange={handleInputChange}
                            name="email"
                            type="email"
                            placeholder="Email Address"
                            required
                        />
                        <InputField
                            label="Phone Number"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                            name="phoneNumber"
                            type="text"
                            placeholder="Phone Number"
                            required
                        />
                    </div>

                    <InputField
                        label="SSN"
                        value={formData.ssn}
                        onChange={handleInputChange}
                        name="ssn"
                        type="text"
                        placeholder="SSN"
                        required
                    />
                </div>

                <Button type="submit" variant="contained" color="primary">
                    Save Changes
                </Button>
            </form>

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

export default ProfileDetailsForm;
