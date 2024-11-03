import { useFetchAllUsersQuery } from "./adminApiSlie";
import UsersTable from "../../components/UsersTable";

const UserList = () => {
    const { data: usersData, isLoading } = useFetchAllUsersQuery("allUsers");

    if (isLoading) return <p>Loading....</p>;

    const users = usersData?.users || [];
    return (
        <div className="min-h-screen bg-gray-100">
            <div className="container mx-auto p-4">
                <UsersTable users={users} />
            </div>
        </div>
    );
};

export default UserList;
