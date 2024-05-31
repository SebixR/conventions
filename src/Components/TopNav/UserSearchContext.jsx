import React, {createContext, useState} from "react";
import axios from "../../config/axios";

export const UserSearchContext = createContext();

export const UserSearchProvider = ({ children }) => {
    const [userSearchResults, setUserSearchResults] = useState([]);

    const handleUserSearch = (keyword) => {
        if (keyword.trim() === '') {
            try {
                axios.get('auth/getAllAppUsers').then((result) => {
                    let users = result.data;
                    users = users.filter(user => user.role !== 'ADMIN');
                    setUserSearchResults(users);
                    console.log(users);
                })
            } catch (error) {
                console.log("Error fetching all users");
            }
        } else {
            try {
                axios.get('auth/searchAppUsers', {params: {keyword: keyword}}).then((result) => {
                    let users = result.data;
                    users = users.filter(user => user.role !== 'ADMIN');
                    setUserSearchResults(users);
                    console.log(users);
                })
            } catch (error) {
                console.log("Error searching for keyword " + keyword);
            }
        }
    }


    const [conventionSearchResults, setConventionSearchResults] = useState([]);

    const handleConventionSearch = (keyword) => {
        if (keyword.trim === '') {
            try {
                axios.get('public/getAllConventions').then((result) => {
                    const conventions = result.data;
                    setConventionSearchResults(conventions);
                    console.log(conventions);
                })
            } catch (error) {
                console.log("Error fetching all conventions");
            }
        } else {
            try {
                axios.get('public/searchConventions', {params: {keyword: keyword}}).then((result) => {
                    const conventions = result.data;
                    setConventionSearchResults(conventions);
                    console.log(conventions);
                })
            } catch (error) {
                console.log("Error fetching all conventions");
            }
        }
    }

    return (
            <UserSearchContext.Provider value={ { userSearchResults, handleUserSearch, conventionSearchResults, handleConventionSearch } }>
                {children}
            </UserSearchContext.Provider>
        )
}