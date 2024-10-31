import baseApi from "../../services/apiSlice";
import { logout as logOut } from "./authSlice";

export const authApiSlice = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (userData) => ({
                url: "/auth/login",
                method: "POST",
                body: { ...userData },
            }),
        }),
        register: builder.mutation({
            query: (userData) => ({
                url: "/auth/register",
                method: "POST",
                body: userData,
            }),
        }),
        registerAsAdmin: builder.mutation({
            query: (userData) => ({
                url: "/auth/register",
                method: "POST",
                body: userData,
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: "/auth/logout",
                method: "POST",
            }),
            async onQueryStarted(_, { dispatch }) {
                try {
                    dispatch(logOut());
                    setTimeout(() => {
                        dispatch(baseApi.util.resetApiState());
                    }, 1000);
                } catch (err: any) {
                    console.log(err);
                }
            },
        }),
    }),
});

export const {
    useLoginMutation,
    useRegisterMutation,
    useRegisterAsAdminMutation,
    useLogoutMutation,
} = authApiSlice;

export default authApiSlice;
