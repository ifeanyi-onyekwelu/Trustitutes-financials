import React, { useState } from "react";
import { Tab, Tabs, Button, CircularProgress } from "@mui/material";
import InputField from "../common/InputField";
import { CheckCircle, Error } from "@mui/icons-material";

const TransferForm = ({
    handleSubmit,
    handleOnChange,
    toAccountNumber,
    isFetchingRecipient,
    recipientName,
    amount,
    currency,
    wireDetails,
}: any) => {
    const [selectedTab, setSelectedTab] = useState("account");

    const handleTabChange = (event: any, newValue: any) => {
        setSelectedTab(newValue);
        handleOnChange("transferType", newValue);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-6 p-2 rounded-lg shadow-lg text-white"
        >
            <Tabs
                value={selectedTab}
                onChange={handleTabChange}
                centered
                textColor="inherit"
                indicatorColor="primary"
                sx={{ bgcolor: "#111827" }}
            >
                <Tab label="Inter Bank Transfer" value="account" />
                <Tab label="Transfer to Other Banks" value="otherBank" />
                <Tab label="Wire Transfer" value="wire" />
            </Tabs>
            {selectedTab === "account" && (
                <InputField
                    label="Recipient Account Number"
                    value={toAccountNumber}
                    onChange={handleOnChange}
                    name="toAccountNumber"
                    type="number"
                    placeholder="Recipient Account Number"
                    required
                    extraInfo={
                        isFetchingRecipient && toAccountNumber.length >= 10 ? (
                            <div className="flex items-center space-x-2">
                                <CircularProgress size={16} color="primary" />
                                <p className="text-blue-500">
                                    Checking account...
                                </p>
                            </div>
                        ) : recipientName && toAccountNumber.length >= 10 ? (
                            <div className="flex items-center bg-green-100 text-green-700 p-2 rounded-lg font-bold">
                                <CheckCircle className="mr-2" />
                                Account Holder: {recipientName}
                            </div>
                        ) : toAccountNumber.length >= 10 &&
                          !isFetchingRecipient ? (
                            <div className="flex items-center bg-red-100 text-red-700 p-2 rounded-lg font-bold">
                                <Error className="mr-2" />
                                Account not found.
                            </div>
                        ) : null
                    }
                />
            )}
            {selectedTab === "wire" && (
                <>
                    <div className="flex md:space-x-5 md:flex-row flex-col w-full md:space-y-0 space-y-4">
                        <InputField
                            label="Account Number"
                            value={wireDetails.accountNumber}
                            name="accountNumber"
                            onChange={handleOnChange}
                            type="text"
                            placeholder="Account Number"
                            required
                        />
                        <InputField
                            label="Beneficiary Name"
                            value={wireDetails.beneficiary}
                            name="beneficiaryName"
                            onChange={handleOnChange}
                            type="text"
                            placeholder="Beneficiary Name"
                            required
                        />
                    </div>
                    <div className="flex md:space-x-5 md:flex-row flex-col w-full md:space-y-0 space-y-4">
                        <InputField
                            label="Bank Name"
                            value={wireDetails.bankName}
                            name="bankName"
                            onChange={handleOnChange}
                            type="text"
                            placeholder="Bank Name"
                            required
                        />
                        <InputField
                            label="SWIFT/BIC Code"
                            value={wireDetails.swiftCode}
                            name="swiftCode"
                            onChange={handleOnChange}
                            type="text"
                            placeholder="SWIFT/BIC Code"
                            required
                        />
                    </div>
                    <InputField
                        label="Routing Number"
                        value={wireDetails.routingNumber}
                        name="routingNumber"
                        onChange={handleOnChange}
                        type="text"
                        placeholder="Routing Number"
                        required
                    />
                    <InputField
                        label="Bank Address"
                        value={wireDetails.bankAddress}
                        name="bankAddress"
                        onChange={handleOnChange}
                        type="text"
                        placeholder="Bank Address"
                        required
                    />
                    <InputField
                        label="Recipient’s Address"
                        value={wireDetails.recipientAddress}
                        name="recipientAddress"
                        onChange={handleOnChange}
                        type="text"
                        placeholder="Recipient's Address"
                        required
                    />
                </>
            )}

            {selectedTab === "otherBank" && (
                <>
                    <InputField
                        label="Account Number"
                        value={wireDetails.accountNumber}
                        name="accountNumber"
                        onChange={handleOnChange}
                        type="text"
                        placeholder="Account Number"
                        required
                    />
                    <InputField
                        label="Bank Name"
                        value={wireDetails.bankName}
                        name="bankName"
                        onChange={handleOnChange}
                        type="text"
                        placeholder="Bank Name"
                        required
                    />
                </>
            )}

            <InputField
                label="Currency"
                value={currency}
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

            <InputField
                label="Enter Amount"
                value={amount}
                onChange={handleOnChange}
                type="text"
                name="amount"
                placeholder="$ Enter Amount"
                required
            />

            <Button variant="contained" type="submit" color="primary">
                {isFetchingRecipient ? "Processing..." : "Submit"}
            </Button>
        </form>
    );
};

export default TransferForm;
