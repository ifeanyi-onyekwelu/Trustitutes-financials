import baseApi from "../../services/apiSlice";

export const userApiSlice = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        fetchUserProfile: builder.query({
            query: () => ({
                url: "/profile/get-profile",
                method: "GET",
            }),
        }),
        fetchUserAccount: builder.query({
            query: () => ({
                url: "/profile/get-account",
                method: "GET",
            }),
        }),
        fetchTransactions: builder.query({
            query: () => ({
                url: "/transact/transactions",
                method: "GET",
            }),
        }),
        fetchATransactions: builder.query({
            query: (transactionId) => ({
                url: `/transact/transactions/${transactionId}`,
                method: "GET",
            }),
        }),
        deposit: builder.mutation({
            query: (data) => ({
                url: "/transact/deposit",
                method: "POST",
                body: data,
            }),
        }),
        transfer: builder.mutation({
            query: (data) => ({
                url: "/transact/transfer",
                method: "POST",
                body: data,
            }),
        }),
        withdraw: builder.mutation({
            query: (data) => ({
                url: "/transact/withdraw",
                method: "POST",
                body: { ...data },
            }),
        }),
        getRecpientAccount: builder.query({
            query: (data) => ({
                url: `/transact/get-account?accountNumber=${data}`,
                method: "GET",
            }),
        }),
        updateProfileInformation: builder.mutation({
            query: (userData) => ({
                url: "profile/update-profile-information",
                method: "POST",
                body: userData,
            }),
        }),
        updateContactInformation: builder.mutation({
            query: (userData) => ({
                url: "profile/update-contact-information",
                method: "POST",
                body: userData,
            }),
        }),
        uploadProfileImage: builder.mutation({
            query: (userData) => ({
                url: "profile/upload-profile-picture",
                method: "POST",
                body: userData,
            }),
        }),
        deleteAccount: builder.mutation({
            query: () => ({
                url: "profile/delete-account",
                method: "POST",
            }),
        }),
        pauseAccount: builder.mutation({
            query: () => ({
                url: "profile/pause-account",
                method: "POST",
            }),
        }),
        resumeAccount: builder.mutation({
            query: () => ({
                url: "profile/resume-account",
                method: "POST",
            }),
        }),
        changePassword: builder.mutation({
            query: (data) => ({
                url: "profile/change-password",
                method: "POST",
                body: data,
            }),
        }),
    }),
});

export const {
    useFetchUserProfileQuery,
    useFetchUserAccountQuery,
    useFetchTransactionsQuery,
    useDepositMutation,
    useTransferMutation,
    useWithdrawMutation,
    useGetRecpientAccountQuery,
    useUpdateProfileInformationMutation,
    useUpdateContactInformationMutation,
    useDeleteAccountMutation,
    usePauseAccountMutation,
    useResumeAccountMutation,
    useUploadProfileImageMutation,
    useChangePasswordMutation,
    useFetchATransactionsQuery,
} = userApiSlice;
