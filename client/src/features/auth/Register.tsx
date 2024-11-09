import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import Image from "../../assets/img/auth.jpg";
import { useRegisterMutation } from "./authApiSlice";
import Alert from "../../components/common/Alert";
import InputField from "../../components/common/InputField";
import { LoadingBackdrop } from "../../components/common/LoadingBackdrop";

interface FormData {
    firstName: string;
    middleName: string;
    lastName: string;
    country: string;
    state: string;
    city: string;
    zipcode: string;
    currency: string;
    address: string;
    phoneNumber: string;
    email: string;
    password: string;
    password2: string;
    ssn: string;
    profilePicture: File | null; // For file uploads
}

const Register = () => {
    const [formData, setFormData] = useState<FormData>({
        firstName: "",
        middleName: "",
        lastName: "",
        country: "",
        state: "",
        city: "",
        zipcode: "",
        currency: "",
        address: "",
        phoneNumber: "",
        email: "",
        password: "",
        password2: "",
        ssn: "",
        profilePicture: null,
    });

    const [errorMessage, setErrorMessage] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [statusType, setStatusType] = useState<"error" | "success">("error");
    const [showAlert, setShowAlert] = useState<boolean>(false);

    const navigate = useNavigate();
    const [register, { isLoading }] = useRegisterMutation();

    const handleOnSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await register({
                ...formData,
                roles: ["user"],
            }).unwrap();

            setSuccessMessage("Registration Successful");
            setStatusType("success");
            setShowAlert(true);

            setTimeout(() => {
                navigate("/secure/sign-in");
            }, 3000);
        } catch (error: any) {
            if (error.status === "FETCH_ERROR") {
                setErrorMessage("No server responded!");
            } else {
                setErrorMessage(error.data.message);
            }
            setStatusType("error");
            setShowAlert(true);
        }
    };

    const handleOnChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <>
            <section
                className="w-full h-fit flex items-center justify-center bg-cover bg-center relative py-5"
                style={{
                    backgroundImage: `url(${Image})`,
                    backgroundAttachment: "fixed",
                }}
            >
                <div className="absolute inset-0 bg-black opacity-50"></div>

                <div className="relative bg-white bg-opacity-90 p-8 rounded-md w-full max-w-5xl mx-4 space-y-6 z-10 shadow-lg">
                    <h1 className="font-extrabold text-3xl md:text-4xl text-primary text-center">
                        Create an account
                    </h1>
                    <p className="text-center text-lg font-semibold">
                        Already have an account?{" "}
                        <Link
                            to="/secure/sign-in"
                            className="text-alternate underline hover:text-primary"
                        >
                            Sign In
                        </Link>
                    </p>

                    <form onSubmit={handleOnSubmit} className="space-y-4">
                        <div className="flex flex-col md:flex-row md:space-y-0 space-y-4">
                            <InputField
                                label="First Name"
                                value={formData.firstName}
                                onChange={handleOnChange}
                                name="firstName"
                                type="text"
                                placeholder="First Name"
                                required
                            />
                            <InputField
                                label="Middle Name"
                                value={formData.middleName}
                                onChange={handleOnChange}
                                name="middleName"
                                placeholder="Middle Name"
                                type="text"
                                required
                            />
                            <InputField
                                label="Last Name"
                                value={formData.lastName}
                                onChange={handleOnChange}
                                name="lastName"
                                placeholder="Last Name"
                                type="text"
                                required
                            />
                        </div>
                        <div className="flex md:space-x-5 md:flex-row flex-col w-full md:space-y-0 space-y-4">
                            <InputField
                                label="Country"
                                value={formData.country}
                                onChange={handleOnChange}
                                name="country"
                                type="text"
                                placeholder="Country"
                                required
                            />
                            <InputField
                                label="State"
                                value={formData.state}
                                onChange={handleOnChange}
                                name="state"
                                type="text"
                                placeholder="State"
                                required
                            />
                            <InputField
                                label="City"
                                value={formData.city}
                                onChange={handleOnChange}
                                name="city"
                                type="text"
                                placeholder="City"
                                required
                            />
                            <InputField
                                label="Zipcode"
                                value={formData.zipcode}
                                onChange={handleOnChange}
                                name="zipcode"
                                type="text"
                                placeholder="Zipcode"
                                required
                            />
                        </div>

                        <div className="flex md:space-x-5 md:flex-row flex-col w-full md:space-y-0 space-y-4">
                            <InputField
                                label="Address"
                                value={formData.address}
                                onChange={handleOnChange}
                                name="address"
                                type="text"
                                placeholder="Address"
                                required
                            />

                            <InputField
                                label="Currency"
                                value={formData.currency}
                                onChange={handleOnChange}
                                name="currency"
                                type="select"
                                required
                                placeholder="Select currency"
                                options={[
                                    {
                                        value: "AUD",
                                        label: "AUD",
                                    },
                                    {
                                        value: "USD",
                                        label: "USD",
                                    },
                                    {
                                        value: "EUR",
                                        label: "EUR",
                                    },
                                    {
                                        value: "GBP",
                                        label: "GBP",
                                    },
                                ]}
                            />
                        </div>

                        <div className="flex md:space-x-5 md:flex-row flex-col w-full md:space-y-0 space-y-4">
                            <InputField
                                label="Email Address"
                                value={formData.email}
                                onChange={handleOnChange}
                                name="email"
                                type="email"
                                placeholder="Email Address"
                                required
                            />
                            <InputField
                                label="Phone Number"
                                value={formData.phoneNumber}
                                onChange={handleOnChange}
                                name="phoneNumber"
                                type="text"
                                placeholder="Phone Number"
                                required
                            />
                        </div>

                        <div className="flex md:space-x-5 md:flex-row flex-col w-full md:space-y-0 space-y-4">
                            <InputField
                                label="Password"
                                value={formData.password}
                                onChange={handleOnChange}
                                name="password"
                                type="password"
                                placeholder="Password"
                                required
                            />
                            <InputField
                                label="Re-enter Password"
                                value={formData.password2}
                                onChange={handleOnChange}
                                name="password2"
                                type="password"
                                placeholder="Re-enter Password"
                                required
                            />
                        </div>

                        <Button
                            variant="contained"
                            type="submit"
                            disabled={isLoading}
                        >
                            Register
                        </Button>
                    </form>
                    <Link
                        to="/"
                        className="text-sm text-primary hover:underline"
                    >
                        Back to Site
                    </Link>
                </div>
            </section>

            {showAlert && (
                <Alert
                    successMessage={successMessage}
                    errorMessage={errorMessage}
                    statusType={statusType}
                    showAlert={showAlert}
                    setShowAlert={setShowAlert}
                />
            )}

            <LoadingBackdrop open={isLoading} />
        </>
    );
};

export default Register;
