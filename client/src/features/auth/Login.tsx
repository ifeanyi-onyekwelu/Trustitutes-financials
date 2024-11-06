import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import Image from "../../assets/img/auth.jpg";
import { useLoginMutation } from "./authApiSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import { setCredentials } from "./authSlice";
import Alert from "../../components/common/Alert";
import InputField from "../../components/common/InputField";
import { LoadingBackdrop } from "../../components/common/LoadingBackdrop";

interface FormData {
    accountNumber: string;
    password: string;
}

const Login = () => {
    const [formData, setFormData] = useState<FormData>({
        accountNumber: "",
        password: "",
    });
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [statusType, setStatusType] = useState<"error" | "success">("error");
    const [showAlert, setShowAlert] = useState<boolean>(false);

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const [login, { isLoading }] = useLoginMutation();

    const handleOnSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await login({
                ...formData,
                roles: ["user"],
            }).unwrap();
            const { accessToken } = response;

            dispatch(setCredentials(accessToken));

            setSuccessMessage("Login Successful");
            setStatusType("success");
            setShowAlert(true);

            setTimeout(() => {
                navigate("/user/dashboard");
            }, 3000);
        } catch (error: any) {
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
                className="w-full h-screen bg-cover bg-center relative py-5 flex items-center justify-center"
                style={{ backgroundImage: `url(${Image})` }}
            >
                <div className="absolute inset-0 bg-black opacity-50"></div>

                <div className="relative bg-white bg-opacity-90 p-8 rounded-md w-full max-w-md mx-4 space-y-6 z-10 shadow-lg">
                    <h1 className="font-extrabold text-3xl text-primary text-center">
                        Login
                    </h1>
                    <p className="text-lg font-semibold text-center">
                        Don't have an account?{" "}
                        <Link
                            to={"/secure/sign-up"}
                            className="text-text underline hover:text-primary"
                        >
                            Sign Up
                        </Link>
                    </p>

                    <form onSubmit={handleOnSubmit} className="space-y-2">
                        <InputField
                            label="Account Number"
                            value={formData.accountNumber}
                            onChange={handleOnChange}
                            name="accountNumber"
                            type="text"
                            placeholder="Account Number"
                            required
                        />
                        <InputField
                            label="Password"
                            value={formData.password}
                            onChange={handleOnChange}
                            name="password"
                            type="password"
                            placeholder="Password"
                            required
                        />

                        <Button
                            variant="contained"
                            type="submit"
                            disabled={isLoading}
                        >
                            Login
                        </Button>
                    </form>
                    <Link
                        to="/"
                        className="text-sm text-primary hover:underline mt-5"
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

export default Login;
