import React, {useContext, useEffect, useState} from 'react';
import './UserSearchPage.css'
import TopNav from "../TopNav/TopNav";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLock, faUnlockAlt, faUser} from "@fortawesome/free-solid-svg-icons";
import {UserSearchContext} from "../TopNav/UserSearchContext";
import ErrorNotification from "../ErrorNotification/ErrorNotification";
import axios from "../../config/axios";
import {Link} from "react-router-dom";
import Footer from "../Footer/Footer";

const UserSearchPage = () => {

    const { userSearchResults } = useContext(UserSearchContext);

    const [userSearchResultsCopy, setUserSearchResultsCopy] = useState(userSearchResults);
    useEffect(() => {
        setUserSearchResultsCopy(userSearchResults);
    }, [userSearchResults])

    const handleBlockUserClick = (userRole, userId) => {
        if (userRole === 'BLOCKED') {
            try {
                axios.post(`auth/unblockAppUser/${userId}`).then(() => {
                    setUserSearchResultsCopy(prevUsers => prevUsers.map(user =>
                        user.id === userId ? {...user, role: 'USER'} : user));
                    console.log("Unblocked user");
                })
            } catch (error) {
                console.log("Error unblocking user");
            }
        } else {
            try {
                axios.post(`auth/blockAppUser/${userId}`).then(() => {
                    setUserSearchResultsCopy(prevUsers => prevUsers.map(user =>
                        user.id === userId ? {...user, role: 'BLOCKED'} : user));
                    console.log("Blocked user");
                })
            } catch (error) {
                console.log("Error unblocking user");
            }
        }
    }

    return (
        <div className='main-wrap'>

            <TopNav/>

            <div className="user-search-content-wrap">
                <label className="searched-user-label">Users:</label>

                {userSearchResults.length === 0 && <ErrorNotification text="No matching results found"/>}

                {userSearchResultsCopy.map((user) => (
                    <div key={user.id} className="user-search-item-wrap">
                        <div className="user-search-item">

                            {user.role === 'BLOCKED' && (
                                <div className="user-blocked-cover">
                                    <FontAwesomeIcon icon={faLock} className="icon"/>
                                </div>
                            )}

                            <div className="search-user-info-wrap">
                                <label>First Name</label>
                                <label className="search-user-info-label">{user.firstName}</label>
                            </div>
                            <div className="search-user-info-wrap">
                                <label>Last Name</label>
                                <label className="search-user-info-label">{user.lastName}</label>
                            </div>
                            <div className="search-user-info-wrap">
                                <label>Email</label>
                                <label className="search-user-info-label">{user.email}</label>
                            </div>
                        </div>

                        <div className="search-user-item-buttons">
                            <button className="search-user-item-buttons-button" onClick={() => handleBlockUserClick(user.role, user.id)}>
                                {user.role === 'BLOCKED' ? (
                                    <FontAwesomeIcon icon={faUnlockAlt} className="icon"/>
                                ) : (
                                    <FontAwesomeIcon icon={faLock} className="icon"/>
                                )}
                            </button>
                            <Link className="search-user-item-buttons-button" to={"/AccountPage/" + user.id}>
                                <FontAwesomeIcon icon={faUser} className="icon"/>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            <Footer/>

        </div>
    )
}

export default UserSearchPage;