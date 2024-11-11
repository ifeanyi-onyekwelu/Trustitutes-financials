import React, { useState } from "react";
import { Button } from "@mui/material";
import { useUploadProfileImageMutation } from "../../features/user/userApiSlice";
import Alert from "../common/Alert";
import { LoadingBackdrop } from "../common/LoadingBackdrop";

const ProfileImageUpload = () => {
    const [selectedImage, setSelectedImage] = useState<any>();
    const [preview, setPreview] = useState<string | null>(null);
    const [uploadImage, { isLoading }] = useUploadProfileImageMutation();

    const [errorMessage, setErrorMessage] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [statusType, setStatusType] = useState<"error" | "success">("error");
    const [showAlert, setShowAlert] = useState<boolean>(false);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setSelectedImage(file);
        setPreview(URL.createObjectURL(file!));

        try {
            const formData = new FormData();
            formData.append("file", file!);

            await uploadImage(formData);
            setSuccessMessage("Profile image uploaded successfully");
            setShowAlert(true);
            setStatusType("success");
            location.reload();
        } catch (error: any) {
            setErrorMessage("Could not upload profile image");
            setShowAlert(true);
            setStatusType("error");
        }
    };

    const handleRemove = () => {
        setSelectedImage(null);
        setPreview(null);
    };

    return (
        <>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <label htmlFor="upload-profile-image">
                    <input
                        id="upload-profile-image"
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={handleFileUpload}
                    />
                    <Button variant="contained" component="span">
                        Upload Profile Image
                    </Button>
                </label>
                {preview && (
                    <>
                        <img
                            src={preview}
                            alt="Selected"
                            style={{
                                width: "100px",
                                height: "100px",
                                borderRadius: "50%",
                            }}
                        />
                        <Button variant="outlined" onClick={handleRemove}>
                            Remove
                        </Button>
                    </>
                )}
            </div>

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

export default ProfileImageUpload;
