import { useState } from "react";
import { Button } from "@mui/material";
import ProfileDetailsForm from "./ProfileDetailsForm";
import ChangePasswordModal from "./ChangePasswordModal";
import { Divider } from "@mui/material";
import ProfileImageUpload from "./ProfileImageUpload";

const ProfileForm = () => {
    const [showPasswordModal, setShowPasswordModal] = useState(false);

    const handleFileUpload = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            console.log("File selected:", file);
            // You can add logic here to handle the file upload to your server or preview the image
        }
    };

    return (
        <>
            <ProfileImageUpload />
            <ProfileDetailsForm />
            <Divider sx={{ border: "1px solid white" }} />
            <Button
                variant="outlined"
                onClick={() => setShowPasswordModal(true)}
            >
                Change Password
            </Button>
            <ChangePasswordModal
                open={showPasswordModal}
                onClose={() => setShowPasswordModal(false)}
            />
        </>
    );
};

export default ProfileForm;
