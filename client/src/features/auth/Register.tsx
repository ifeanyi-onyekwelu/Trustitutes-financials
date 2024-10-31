import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormGroup from "../../components/common/FormGroup";
import Image from "../../assets/img/auth.jpg";
import { useRegisterMutation } from "./authApiSlice";
import Alert from "../../components/common/Alert";

interface FormData {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
}

const Register = () => {
    const [formData, setFormData] = useState<FormData>({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
    });
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [statusType, setStatusType] = useState<string>("");
    const [showAlert, setShowAlert] = useState<boolean>(false);

    const navigate = useNavigate();

    const [login, { isLoading }] = useRegisterMutation();

    const handleOnSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await login({
                ...formData,
                roles: ["user"],
            }).unwrap();
            console.log("RESPONSE:", response);

            setSuccessMessage("Registration Successful");
            setStatusType("success");
            setShowAlert(true);
        } catch (error: any) {
            console.log("ERROR:", error);
            console.log("ERROR:", error);
            if (error.status === "FETCH_ERROR") {
                setErrorMessage("No server responded!");
                setShowAlert(true);
                setStatusType("error");
            } else {
                setErrorMessage(error.data.message);
                setStatusType("error");
                setShowAlert(true);
            }
        }
    };

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <section className="w-full p-3 md:h-screen bg-gray-50">
            <div className="flex flex-row md:space-x-3 h-full">
                <div className="w-1/2 md:flex hidden relative">
                    <img
                        src={Image}
                        alt="Auth Image"
                        className="w-full h-full object-cover rounded-md"
                    />
                    <Link
                        to="/"
                        className="absolute top-4 right-4 text-white backdrop-blur-md bg-white/30 px-3 py-1 rounded transition hover:bg-white/50"
                    >
                        Back to Site
                    </Link>
                </div>

                <div className="md:w-1/2 w-full p-16 px-28 flex flex-col justify-center space-y-6">
                    <h1 className="font-extrabold md:text-5xl text-3xl text-primary">
                        Create an account
                    </h1>
                    <p className="text-lg font-semibold">
                        Already have an account?{" "}
                        <Link
                            to={"/secure/sign-in"}
                            className="text-alternate underline hover:text-primary"
                        >
                            Sign In
                        </Link>
                    </p>

                    <form onSubmit={handleOnSubmit}>
                        <div className="flex md:flex-row flex-col md:gap-4">
                            <FormGroup
                                value={formData.firstName}
                                name="firstName"
                                label="First Name"
                                onChange={handleOnChange}
                            />
                            <FormGroup
                                value={formData.lastName}
                                name="lastName"
                                label="Last Name"
                                onChange={handleOnChange}
                            />
                        </div>
                        <FormGroup
                            value={formData.username}
                            name="username"
                            label="Username"
                            onChange={handleOnChange}
                            type="username"
                        />
                        <FormGroup
                            value={formData.email}
                            name="email"
                            label="Email Address"
                            onChange={handleOnChange}
                            type="email"
                        />
                        <FormGroup
                            value={formData.password}
                            name="password"
                            label="Password"
                            onChange={handleOnChange}
                            type="password"
                        />
                        <button
                            type="submit"
                            className="w-full bg-primary text-white font-semibold rounded-lg p-3 transition-all duration-300 hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-secondary"
                        >
                            Register
                        </button>
                    </form>
                </div>
            </div>

            <Alert
                successMessage={successMessage}
                errorMessage={errorMessage}
                statusType={statusType}
                showAlert={showAlert}
                setShowAlert={setShowAlert}
            />
        </section>
    );
};

export default Register;
