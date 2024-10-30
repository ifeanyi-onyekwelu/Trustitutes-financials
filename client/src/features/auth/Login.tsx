import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormGroup from "../../components/common/FormGroup";
import Image from "../../assets/img/auth.jpg";
import { useLoginMutation } from "./authApiSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import { setCredentials } from "./authSlice";
import Alert from "../../components/common/Alert";

interface FormData {
    emailOrUsername: string;
    password: string;
}

const Login = () => {
    const [formData, setFormData] = useState<FormData>({
        emailOrUsername: "",
        password: "",
    });
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [statusType, setStatusType] = useState<string>("");
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
            console.log("RESPONSE:", response);
            console.log("ACCESS TOKEN:", accessToken);

            dispatch(setCredentials(accessToken));

            setSuccessMessage("Login Successful");
            setStatusType("success");
            setShowAlert(true);

            setTimeout(() => {
                navigate("/user/dashboard");
            }, 3000);
        } catch (error: any) {
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
        <section className="w-full p-3 md:h-screen bg-white">
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

                <div className="md:w-1/2 w-full p-16 px-28 flex flex-col justify-center space-y-3">
                    <h1 className="font-extrabold md:text-5xl text-3xl text-primary">
                        Login
                    </h1>
                    <p className="text-lg font-semibold">
                        Don't have an account?{" "}
                        <Link
                            to={"/auth/sign-up"}
                            className="text-alternate underline hover:text-primary"
                        >
                            Sign Up
                        </Link>
                    </p>

                    <form onSubmit={handleOnSubmit}>
                        <FormGroup
                            value={formData.emailOrUsername}
                            name="emailOrUsername"
                            label="Email Address or Username"
                            onChange={handleOnChange}
                            type="text"
                        />
                        <FormGroup
                            value={formData.password}
                            name="password"
                            label="Password"
                            onChange={handleOnChange}
                            type="password"
                        />
                        <div className="flex items-center mb-5 gap-2">
                            <input
                                type="checkbox"
                                name="rememberMe"
                                id="rememberMe"
                            />
                            <label htmlFor="rememberMe">Remember Me</label>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-primary text-white font-semibold rounded-lg p-3 transition-all duration-300 hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-secondary"
                        >
                            Login
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

export default Login;
