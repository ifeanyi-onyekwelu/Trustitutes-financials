"use client";

import { useState } from "react";
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    DialogTitle,
} from "@headlessui/react";
import {
    ExclamationTriangleIcon,
    CheckCircleIcon,
} from "@heroicons/react/24/outline";

interface Props {
    successMessage: string;
    errorMessage: string;
    statusType: string;
    showAlert: boolean;
    setShowAlert: any;
}

const Alert = ({
    successMessage,
    errorMessage,
    statusType,
    showAlert,
    setShowAlert,
}: Props) => {
    const message = statusType === "error" ? errorMessage : successMessage;
    console.log("MESSAGE", message);
    const icon =
        statusType === "error" ? (
            <ExclamationTriangleIcon
                aria-hidden="true"
                className="h-6 w-6 text-red-600"
            />
        ) : (
            <CheckCircleIcon
                aria-hidden="true"
                className="h-6 w-6 text-green-600"
            />
        );
    const textColor =
        statusType === "error" ? "text-red-600" : "text-green-600";

    return (
        <Dialog
            open={showAlert}
            onClose={() => setShowAlert(false)}
            className="relative z-10 top-0 right-0"
        >
            <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-center">
                                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                    {icon}
                                </div>
                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                    <DialogTitle
                                        as="h3"
                                        className={`text-base font-semibold leading-6 ${textColor}`}
                                    >
                                        {message}
                                    </DialogTitle>
                                </div>
                            </div>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    );
};

export default Alert;
