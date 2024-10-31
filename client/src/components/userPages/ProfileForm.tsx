import { useState } from "react";
import { Button } from "@mui/material";
import ProfileDetailsForm from "./ProfileDetailsForm";
import ChangePasswordModal from "./ChangePasswordModal";
import { Divider } from "@mui/material";

const ProfileForm = () => {
    const [showPasswordModal, setShowPasswordModal] = useState(false);

    return (
        <>
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
