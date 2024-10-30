import React, { createContext, useContext } from "react";

const UserContext = createContext(null);

export const UserProvider = ({ children, profile }: any) => (
    <UserContext.Provider value={profile}>{children}</UserContext.Provider>
);

export const useUser = () => useContext(UserContext);
