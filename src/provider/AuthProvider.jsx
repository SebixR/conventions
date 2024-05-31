//https://dev.to/sanjayttg/jwt-authentication-in-react-with-react-router-1d03

import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "../config/axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
    const tokenKey = "authToken";
    const [token, setToken] = useState(localStorage.getItem(tokenKey) || null);

    const getToken = () => {
        return token;
    };

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        } else {
            delete axios.defaults.headers.common["Authorization"];
        }
    }, [token]);

    const addToken = (token) => {
        setToken(token);
        localStorage.setItem(tokenKey, token);
    };

    const setTokenNull = () => {
        setToken(null);
        localStorage.removeItem(tokenKey);
    };

    const isAuth = () => {
        return !!token;
    };

    return (
        <AuthContext.Provider value={{ token, addToken, getToken, setTokenNull, isAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;