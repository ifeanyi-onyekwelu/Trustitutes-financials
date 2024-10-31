import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
} from "@mui/material";
import InputField from "../common/InputField";
import { useChangePasswordMutation } from "../../features/user/userApiSlice";

const ChangePasswordModal = ({ open, onClose }: any) => {
    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const [changePassword, { isLoading }] = useChangePasswordMutation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.newPassword !== formData.confirmNewPassword) {
            alert("New passwords do not match.");
            return;
        }

        try {
            const response = await changePassword({ ...formData }).unwrap();
            console.log(response);
        } catch (e: any) {
            console.error("Error:", e);
        }

        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle
                sx={{
                    bgcolor: "#0A0F2C",
                    color: "white",
                    padding: "20px 40px 0",
                    fontSize: "30px",
                    fontWeight: "bold",
                    textAlign: "center",
                }}
            >
                Change Password
            </DialogTitle>
            <form onSubmit={handleSubmit} className="bg-dashboard p-5">
                <DialogContent
                    sx={{ display: "flex", flexFlow: "column", gap: "20px" }}
                >
                    <InputField
                        label="Current Password"
                        value={formData.currentPassword}
                        onChange={handleInputChange}
                        name="currentPassword"
                        type="password"
                        placeholder="Enter Current Password"
                        required
                    />
                    <InputField
                        label="New Password"
                        value={formData.newPassword}
                        onChange={handleInputChange}
                        name="newPassword"
                        type="password"
                        placeholder="Enter New Password"
                        required
                    />
                    <InputField
                        label="Confirm New Password"
                        value={formData.confirmNewPassword}
                        onChange={handleInputChange}
                        name="confirmNewPassword"
                        type="password"
                        placeholder="Confirm New Password"
                        required
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={onClose}
                        color="primary"
                        variant="outlined"
                    >
                        Cancel
                    </Button>
                    <Button type="submit" variant="contained" color="primary">
                        Save Changes
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default ChangePasswordModal;
