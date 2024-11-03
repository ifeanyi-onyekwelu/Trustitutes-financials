import { useFetchAllSupportTicketsQuery } from "./adminApiSlie";
import SupportTicketsTable from "../../components/SupportTicketsTable";

const SupportTicketsLists = () => {
    const { data: supportTicketData, isLoading } =
        useFetchAllSupportTicketsQuery("allSupportTickets");

    if (isLoading) return <p>Loading....</p>;

    const supportTickets = supportTicketData?.tickets || [];

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="container mx-auto p-4">
                <SupportTicketsTable supportTickets={supportTickets} />
            </div>
        </div>
    );
};

export default SupportTicketsLists;
