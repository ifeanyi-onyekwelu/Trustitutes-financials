const Filters = ({ onFilterChange }: any) => {
    return (
        <div className="bg-white p-4 shadow rounded-md mb-4">
            <div className="flex flex-wrap gap-4">
                <div className="flex flex-col flex-1">
                    <label htmlFor="fromDate">From</label>
                    <input
                        type="date"
                        className="p-2 border rounded"
                        placeholder="From Date"
                        onChange={(e) =>
                            onFilterChange("fromDate", e.target.value)
                        }
                    />
                </div>
                <div className="flex flex-col flex-1">
                    <label htmlFor="toDate">To</label>
                    <input
                        type="date"
                        className="p-2 border rounded"
                        placeholder="To Date"
                        onChange={(e) =>
                            onFilterChange("toDate", e.target.value)
                        }
                    />
                </div>
                <div className="flex flex-col flex-1">
                    <label htmlFor="type">Type</label>
                    <select
                        className="p-2 border rounded"
                        onChange={(e) => onFilterChange("type", e.target.value)}
                    >
                        <option value="">All Types</option>
                        <option value="deposit">Deposit</option>
                        <option value="transfer">Transfer</option>
                        <option value="withdrawal">Withdrawal</option>
                    </select>
                </div>
                <div className="flex flex-col flex-1">
                    <label htmlFor="status">Status</label>
                    <select
                        className="p-2 border rounded"
                        onChange={(e) =>
                            onFilterChange("status", e.target.value)
                        }
                    >
                        <option value="">All Statuses</option>
                        <option value="pending">Pending</option>
                        <option value="succeded">Succeded</option>
                        <option value="failed">Failed</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default Filters;
