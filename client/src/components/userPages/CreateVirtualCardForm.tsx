import React, { useState } from "react";
import InputField from "../common/InputField";
import { Button } from "@mui/material";
import { useUser } from "../../context/UserContext";
import { IoInformation } from "react-icons/io5";
import { Link } from "react-router-dom";

const CreateVirtualCardForm = ({ handleSubmit, handleOnChange }: any) => {
    const userData: any = useUser();
    const [formData, setFormData] = useState({
        holderName: userData?.fullName || "",
        phoneNumber: userData?.phoneNumber || "",
        email: userData?.email || "",
        address: userData?.address || "",
        cardType: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="space-y-10">
                <div className="flex space-x-5 items-center">
                    <span className="p-2 px-3 rounded-full text-gray-400 border-2">
                        01
                    </span>
                    <p className="text-2xl font-semibold text-gray-400">
                        Personal Details
                    </p>
                </div>

                <div className="space-y-3">
                    <div className="flex space-x-3 mb-6">
                        <span className="bg-gray-400 h-5 min-w-5 flex items-center justify-center rounded-full">
                            <IoInformation />
                        </span>
                        <p className="text-gray-400">
                            Please fill out the form with your personal details.
                            You can't edit these details once you submitted the
                            form
                        </p>
                    </div>

                    <InputField
                        label="Card Holder Name"
                        value={formData.holderName}
                        onChange={handleInputChange}
                        name="holderName"
                        type="text"
                        placeholder="Card Holder Name"
                        required
                    />

                    <div className="flex md:space-x-5 md:flex-row flex-col w-full md:space-y-0 space-y-4">
                        <InputField
                            label="Phone Number"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                            name="phoneNumber"
                            type="text"
                            placeholder="Phone Number"
                            required
                        />

                        <InputField
                            label="Email Address"
                            value={formData.email}
                            onChange={handleInputChange}
                            name="email"
                            type="email"
                            placeholder="Email Address"
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
                </div>

                <div className="space-y-3 flex flex-col text-white">
                    <label htmlFor="terms">
                        <input
                            type="checkbox"
                            name="terms"
                            id="terms"
                            required
                        />{" "}
                        I Have Read The{" "}
                        <Link to="" className="text-blue-600">
                            Terms of Condition
                        </Link>{" "}
                        and{" "}
                        <Link to="" className="text-blue-600">
                            Privacy Policy
                        </Link>
                    </label>

                    <label htmlFor="correct">
                        <input
                            type="checkbox"
                            name="correct"
                            id="correct"
                            required
                        />{" "}
                        All The Personal Information I Have Entered Is Correct
                    </label>
                </div>

                <Button variant="contained" type="submit">
                    Submit
                </Button>
            </form>
        </>
    );
};

export default CreateVirtualCardForm;
