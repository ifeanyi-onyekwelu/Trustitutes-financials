import { Doughnut } from "react-chartjs-2";

const Charts = ({ userStatusData, transactionTypeData }: any) => {
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-white shadow-lg rounded-lg p-4">
                    <h2 className="text-xl font-semibold mb-4">User Status</h2>
                    <Doughnut data={userStatusData} />
                </div>
                <div className="bg-white shadow-lg rounded-lg p-4">
                    <h2 className="text-xl font-semibold mb-4">
                        Transaction Types
                    </h2>
                    <Doughnut data={transactionTypeData} />
                </div>
            </div>
        </div>
    );
};

export default Charts;
