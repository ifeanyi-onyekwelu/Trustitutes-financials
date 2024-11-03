import baseApi from "../../services/apiSlice";

export const adminApiSlice = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        pama: builder.mutation({
            query: (userData) => ({
                url: "/admin/login",
                method: "POST",
                body: { ...userData },
            }),
        }),
        register: builder.mutation({
            query: (userData) => ({
                url: "/admin/register",
                method: "POST",
                body: userData,
            }),
        }),
        fetchAllUsers: builder.query({
            query: () => ({
                url: "/admin/users",
                method: "GET",
            }),
        }),
        fetchAUser: builder.query({
            query: (userId) => ({
                url: `/admin/users/${userId}`,
                method: "GET",
            }),
        }),
        fetchAllTransactions: builder.query({
            query: () => ({
                url: "/admin/transactions",
                method: "GET",
            }),
        }),
        fetchATransactions: builder.query({
            query: (transactionId) => ({
                url: `/admin/transactions/${transactionId}`,
                method: "GET",
            }),
        }),
        suspendUserAccount: builder.mutation({
            query: (userId) => ({
                url: `/admin/users/suspend-user/${userId}`,
                method: "PUT",
            }),
        }),
        activateUserAccount: builder.mutation({
            query: (userId) => ({
                url: `/admin/users/activate-user/${userId}`,
                method: "PUT",
            }),
        }),
        deleteUserAccount: builder.mutation({
            query: (userId) => ({
                url: `/admin/users/delete-user/${userId}`,
                method: "PUT",
            }),
        }),
        confirmDeposit: builder.mutation({
            query: (transactionId: string) => ({
                url: `/admin/transactions/confirm-deposit/${transactionId}`,
                method: "PUT",
            }),
        }),
        confirmWithdraw: builder.mutation({
            query: (transactionId: string) => ({
                url: `/admin/transactions/confirm-withdrawal/${transactionId}`,
                method: "PUT",
            }),
        }),
    }),
});

export const {
    usePamaMutation,
    useRegisterMutation,
    useFetchAllUsersQuery,
    useFetchAUserQuery,
    useFetchAllTransactionsQuery,
    useActivateUserAccountMutation,
    useSuspendUserAccountMutation,
    useDeleteUserAccountMutation,
    useConfirmDepositMutation,
    useConfirmWithdrawMutation,
    useFetchATransactionsQuery,
} = adminApiSlice;
