import React, {useContext, useEffect, useRef, useState} from "react";
import {Link} from "react-router-dom";
import './TopNav.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass, faUser, faPlus, faHome} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from "../../provider/AuthProvider";
import {fetchAdmin} from "../../fetchAdmin";
import {UserSearchContext} from "./UserSearchContext";
import {useSearchPagination} from "./SearchPaginationContext";

const TopNav = () => {
    const { setSearch } = useSearchPagination();

    const [drop, setDrop] = useState(false)
    const dropRef = useRef(null);
    const { isAuth, setTokenNull } = useAuth();

    const [isAdmin, setIsAdmin] = useState(false);
    const { token } = useAuth();
    useEffect(() => {
        if (token) {
            fetchAdmin(token, setIsAdmin);
        }
    }, [token])

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropRef.current && !dropRef.current.contains(event.target)) {
                setDrop(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropRef])


    const dropButton = () => {
        setDrop(!drop)
    }

    const handleLogout = () => {
        setTokenNull();
        setIsAdmin(false)
    }


    const [userSearch, setUserSearch] = useState('');
    const { handleUserSearch } = useContext(UserSearchContext);
    const performUserSearch = () => {
        handleUserSearch(userSearch);
    }

    const [conventionSearch, setConventionSearch] = useState('');
    const { handleConventionSearch } = useContext(UserSearchContext);
    const performConventionSearch = () => {
        if (conventionSearch.trim() !== '')
            handleConventionSearch(conventionSearch, 0);
    }

    const handleSearchChange = (keyword) => {
        setSearch(keyword);
        setConventionSearch(keyword);
    }

    return (
        <div className='topnav'>
            <div className='left-wrap'>
                <Link className='home-button' to="/">
                    <FontAwesomeIcon icon={faHome}/>
                </Link>
                <div className='input-container'>
                    <input onChange={(ev) => handleSearchChange(ev.target.value)} type="search" className='search-bar'/>
                    <button onClick={performConventionSearch} className='search-button'>
                        <FontAwesomeIcon icon={faMagnifyingGlass} className='search-icon'/>
                    </button>
                </div>

                {isAdmin && (
                    <div className='input-container'>
                        <input onChange={(e) => setUserSearch(e.target.value)} type="search" className='search-bar'/>
                        <Link to="/UserSearchPage" className='search-button' onClick={performUserSearch}>
                            <FontAwesomeIcon icon={faUser} className='search-icon'/>
                        </Link>
                    </div>
                )}
            </div>

            {isAuth() && !isAdmin && (
                <Link to="/AddConventionPage" className='add-convention-button'>
                    <FontAwesomeIcon icon={faPlus}/>
                </Link>
            )}

            <button className='profile-button' onClick={dropButton}>
                <FontAwesomeIcon icon={faUser} className='user-icon'/>
            </button>

            {drop && (
                    isAuth() ? (
                        <div ref={dropRef} className='drop-wrap'>
                            <div className='drop-content'>
                                {!isAdmin && (
                                    <Link to="/AccountPage" className='drop-link'>My Account</Link>
                                )}
                                <Link to="/" onClick={handleLogout} className='drop-link'>Log Out</Link>
                            </div>
                        </div>
                    ) : (
                        <div ref={dropRef} className='drop-wrap'>
                            <div className='drop-content'>
                                <Link to="/LoginForm" className='drop-link'>Log In</Link>
                                <Link to="/SignupForm" className='drop-link'>Sign Up</Link>
                            </div>
                        </div>
                    )
                )
            }

        </div>
    )
}

export default TopNav;