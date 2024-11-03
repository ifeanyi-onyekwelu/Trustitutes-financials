import { useFetchAllAccountsQuery } from "./adminApiSlie";
import AccountsTable from "../../components/AccountsTable";

const AccountList = () => {
    const { data: accountsData, isLoading } =
        useFetchAllAccountsQuery("allAccounts");

    if (isLoading) return <p>Loading....</p>;

    const accounts = accountsData?.accounts || [];

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="container mx-auto p-4">
                <AccountsTable accounts={accounts} />
            </div>
        </div>
    );
};

export default AccountList;
