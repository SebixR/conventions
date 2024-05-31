import React, {useContext} from 'react';
import './UserSearchPage.css'
import TopNav from "../TopNav/TopNav";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLock, faUser} from "@fortawesome/free-solid-svg-icons";
import {UserSearchContext} from "../TopNav/UserSearchContext";

const UserSearchPage = () => {

    const { userSearchResults } = useContext(UserSearchContext);

    return (
        <div className='main-wrap'>

            <TopNav/>

            <div className="user-search-content-wrap">
                <label className="searched-user-label">Users:</label>

                {userSearchResults.map((user) => (
                    <div key={user.id} className="user-search-item-wrap">
                        <div className="user-search-item">
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
                            <button>
                                <FontAwesomeIcon icon={faLock} className="icon"/>
                            </button>
                            <button>
                                <FontAwesomeIcon icon={faUser} className="icon"/>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default UserSearchPage;