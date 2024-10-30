import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface T {
    token: string | null;
}

const initialState: T = {
    token: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<any>) => {
            state.token = action.payload;
            localStorage.setItem("accessToken", state.token as string);
        },
        logout: (state) => {
            state.token = null;
            localStorage.removeItem("accessToken");
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;
export const selectCurrentToken = (state: RootState) => state.auth.token;
export default authSlice.reducer;
