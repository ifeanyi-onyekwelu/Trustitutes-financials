import baseApi from "../../services/apiSlice";

export const adminApiSlice = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // Admin login
        pama: builder.mutation({
            query: (userData) => ({
                url: "/admin/login",
                method: "POST",
                body: { ...userData },
            }),
        }),
        // Admin registration
        adminReg: builder.mutation({
            query: (userData) => ({
                url: "/admin/register",
                method: "POST",
                body: userData,
            }),
        }),
        // Fetch all users
        fetchAllUsers: builder.query({
            query: () => ({
                url: "/admin/users",
                method: "GET",
            }),
        }),
        // Fetch a specific user by ID
        fetchUserById: builder.query({
            query: (userId) => ({
                url: `/admin/users/${userId}`,
                method: "GET",
            }),
        }),
        fetchAllAccounts: builder.query({
            query: () => ({
                url: "/admin/accounts",
                method: "GET",
            }),
        }),
        fetchAccount: builder.query({
            query: (accountId) => ({
                url: `/admin/accounts/${accountId}`,
                method: "GET",
            }),
        }),
        fetchTotalBalance: builder.query({
            query: (accountId) => ({
                url: `/admin/total-balance`,
                method: "GET",
            }),
        }),
        // Fetch all transactions
        fetchAllTransactions: builder.query({
            query: () => ({
                url: "/admin/transactions",
                method: "GET",
            }),
        }),
        // Fetch a specific transaction by ID
        fetchTransactionById: builder.query({
            query: (transactionId) => ({
                url: `/admin/transactions/${transactionId}`,
                method: "GET",
            }),
        }),
        updateTransactionDate: builder.mutation({
            query: ({ transactionId, data }) => ({
                url: `/admin/transactions/${transactionId}/update`,
                method: "PUT",
                body: data,
            }),
        }),
        // Suspend a user account
        suspendUserAccount: builder.mutation({
            query: (userId) => ({
                url: `/admin/users/suspend-user/${userId}`,
                method: "PUT",
            }),
        }),
        // Activate a user account
        activateUserAccount: builder.mutation({
            query: (userId) => ({
                url: `/admin/users/activate-user/${userId}`,
                method: "PUT",
            }),
        }),
        // Delete a user account (soft delete)
        deleteUserAccount: builder.mutation({
            query: (userId) => ({
                url: `/admin/users/delete-user/${userId}`,
                method: "PUT",
            }),
        }),
        fetchAllSupportTickets: builder.query({
            query: () => ({
                url: `/admin/support-tickets`,
                method: "GET",
            }),
        }),
        fetchSupportTicketById: builder.query({
            query: (ticketId) => ({
                url: `/admin/support-tickets/${ticketId}`,
                method: "GET",
            }),
        }),
        replySupportTicket: builder.mutation({
            query: ({ ticketId, data }) => ({
                url: `/admin/support-tickets/${ticketId}/reply`,
                method: "POST",
                body: data,
            }),
        }),
        updateUserBalance: builder.mutation({
            query: ({ accountId, data }) => ({
                url: `/admin/accounts/${accountId}/update`,
                method: "POST",
                body: data,
            }),
        }),
    }),
});

// Export hooks for usage in functional components
export const {
    usePamaMutation,
    useAdminRegMutation,
    useFetchAllUsersQuery,
    useFetchUserByIdQuery,
    useFetchAllTransactionsQuery,
    useFetchTransactionByIdQuery,
    useUpdateTransactionDateMutation,
    useSuspendUserAccountMutation,
    useActivateUserAccountMutation,
    useDeleteUserAccountMutation,
    useFetchAccountQuery,
    useFetchTotalBalanceQuery,
    useFetchAllAccountsQuery,
    useFetchAllSupportTicketsQuery,
    useFetchSupportTicketByIdQuery,
    useReplySupportTicketMutation,
    useUpdateUserBalanceMutation,
} = adminApiSlice;
