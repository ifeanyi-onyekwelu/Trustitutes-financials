import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Base query setup
const baseQuery = fetchBaseQuery({
    // baseUrl: "http://localhost:4567/api/v1",
    baseUrl: "https://trustitutes-financials.onrender.com/api/v1",
    credentials: "include",
    prepareHeaders: (headers, _) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            headers.set("Authorization", "Bearer " + token);
        }
        return headers;
    },
});

// Custom base query with re-authentication logic
const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 500) {
        // Refresh the token
        const refreshResult: any = await baseQuery(
            "/auth/refresh",
            api,
            extraOptions
        );

        if (refreshResult.data) {
            const { accessToken } = refreshResult.data;
            localStorage.setItem("accessToken", accessToken);
            // Retry the original query with the new token
            result = await baseQuery(args, api, extraOptions);
        } else {
            // Handle refresh failure
            if (refreshResult.error?.status === 500) {
            }
        }
    }

    return result;
};

// Base API setup
const baseApi = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: () => ({}),
});

export default baseApi;
