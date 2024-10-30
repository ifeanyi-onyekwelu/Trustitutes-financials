import { useState } from "react";
import Filters from "../../components/Filters";
import TransactionsTable from "../../components/TransactionsTable";
import { useFetchAllTransactionsQuery } from "./adminApiSlie";

const Transaction = () => {
    const [filters, setFilters] = useState({
        fromDate: "",
        toDate: "",
        type: "",
        status: "",
        search: "",
    });

    const { data: transactionsData } =
        useFetchAllTransactionsQuery("allTransactions");

    const transactions = transactionsData?.transactions || [];

    console.log(transactions);

    const handleFilterChange = (key: string, value: string) => {
        setFilters({
            ...filters,
            [key]: value,
        });
    };

    // Apply filters to transactions
    const filteredTransactions = transactions.filter((transaction: any) => {
        // Filter by date range
        if (
            filters.fromDate &&
            new Date(transaction.date) < new Date(filters.fromDate)
        ) {
            return false;
        }
        if (
            filters.toDate &&
            new Date(transaction.date) > new Date(filters.toDate)
        ) {
            return false;
        }

        // Filter by type
        if (filters.type && transaction.type !== filters.type) {
            return false;
        }

        // Filter by status
        if (filters.status && transaction.status !== filters.status) {
            return false;
        }

        // Filter by search keyword
        if (
            filters.search &&
            !transaction.description.toLowerCase().includes(filters.search)
        ) {
            return false;
        }

        return true;
    });

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="container mx-auto p-4">
                <Filters onFilterChange={handleFilterChange} />
                <TransactionsTable transactions={filteredTransactions} />
            </div>
        </div>
    );
};

export default Transaction;
