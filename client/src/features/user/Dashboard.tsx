import FirstSection from "../../components/userPages/dashboard/FirstSection";
import { useFetchUserAccountQuery } from "./userApiSlice";
import "../../assets/css/Dashboard.css";
import Overview from "../../components/userPages/dashboard/Overview";
import CurrentAccount from "../../components/userPages/dashboard/CurrentAccount";
import LineOfCredit from "../../components/userPages/dashboard/LineOfCredit";
import Support from "../../components/userPages/dashboard/Support";
import { useUser } from "../../context/UserContext";

const Dashboard = () => {
    const userData: any = useUser();
    const { data: accountData, isLoading } =
        useFetchUserAccountQuery("userAccount");

    if (isLoading) return <p>Loading...</p>;

    const account = accountData?.account || {};
    console.log("Account", account);

    return (
        <div className="md:p-6 p-2 min-h-screen space-y-6">
            <FirstSection
                fullName={`${userData?.user?.firstName} ${userData?.user?.lastName}`}
            />

            <div className="flex md:space-x-5 space-x-0 md:flex-row flex-col py-5 md:space-y-0 space-y-5">
                <Overview
                    balance={account?.balance}
                    fullName={`${userData?.user?.firstName} ${userData?.user?.lastName}`}
                    lastLogin="15 December 2020"
                    ip={userData?.ipAddress}
                    currency={userData?.user?.currency}
                />
                <div className="flex flex-col space-y-5 w-full md:w-1/2">
                    <CurrentAccount
                        balance={account?.balance}
                        accountNumber={account?.accountNumber}
                        currency={userData?.user?.currency}
                    />
                    <LineOfCredit currency={userData?.user?.currency} />
                </div>
            </div>

            <Support />
        </div>
    );
};

export default Dashboard;
