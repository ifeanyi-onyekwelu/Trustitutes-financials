import FirstSection from "../../components/userPages/dashboard/FirstSection";
import {
    useFetchUserProfileQuery,
    useFetchUserAccountQuery,
    useFetchTransactionsQuery,
} from "./userApiSlice";
import "../../assets/css/Dashboard.css";
import { useState, useEffect } from "react";
import Overview from "../../components/userPages/dashboard/Overview";
import CurrentAccount from "../../components/userPages/dashboard/CurrentAccount";
import LineOfCredit from "../../components/userPages/dashboard/LineOfCredit";
import Support from "../../components/userPages/dashboard/Support";

const Dashboard = () => {
    const { data: profileData } = useFetchUserProfileQuery("userProfile");
    const { data: accountData } = useFetchUserAccountQuery("userAccount");

    const profile = profileData?.user || {};
    const account = accountData?.account || {};

    return (
        <div className="p-6 min-h-screen space-y-6">
            <FirstSection fullName="Sarah Oprah" />

            <div className="flex md:space-x-5 space-x-0 md:flex-row flex-col py-5 md:space-y-0 space-y-5">
                <Overview
                    balance={0}
                    fullName="Sarah Oprah"
                    lastLogin="15 December 2020"
                />
                <div className="flex flex-col space-y-5 w-full md:w-1/2">
                    <CurrentAccount balance={0} accountNumber={0} />
                    <LineOfCredit />
                </div>
            </div>

            <Support />
        </div>
    );
};

export default Dashboard;
