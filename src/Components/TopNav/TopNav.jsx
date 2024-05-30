import React, {useEffect, useRef, useState} from "react";
import {Link} from "react-router-dom";
import './TopNav.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass,  faUser, faPlus} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from "../../provider/AuthProvider";
import axios from "../../config/axios";
import {fetchAdmin} from "../../fetchAdmin";

const TopNav = () => {
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

    return (
        <div className='topnav'>
            <div className='left-wrap'>
                <Link className='home-button' to="/">Home</Link>
                <div className='input-container'>
                    <input type="search" className='search-bar'/>
                    <button className='search-button'>
                        <FontAwesomeIcon icon={faMagnifyingGlass} className='search-icon'/>
                    </button>
                </div>

                {isAdmin && (
                    <div className='input-container'>
                        <input type="search" className='search-bar'/>
                        <button className='search-button'>
                            <FontAwesomeIcon icon={faUser} className='search-icon'/>
                        </button>
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