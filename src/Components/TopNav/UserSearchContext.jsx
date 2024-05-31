import React, {createContext, useState} from "react";
import axios from "../../config/axios";

export const UserSearchContext = createContext();

export const UserSearchProvider = ({ children }) => {
    const [userSearchResults, setUserSearchResults] = useState([]);

    const handleUserSearch = (keyword) => {
        if (keyword.trim() === '') {
            try {
                axios.get('auth/getAllAppUsers', {params: {keyword: keyword}}).then((result) => {
                    const users = result.data;
                    setUserSearchResults(users);
                    console.log(users);
                })
            } catch (error) {
                console.log("Error fetching all users");
            }
        } else {
            try {
                axios.get('auth/searchAppUsers', {params: {keyword: keyword}}).then((result) => {
                    const users = result.data;
                    setUserSearchResults(users);
                    console.log(users);
                })
            } catch (error) {
                console.log("Error searching for keyword " + keyword);
            }
        }
    }

    return (
            <UserSearchContext.Provider value={ { userSearchResults, handleUserSearch } }>
                {children}
            </UserSearchContext.Provider>
        )
}