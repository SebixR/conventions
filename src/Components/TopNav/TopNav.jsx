import React, {useEffect, useRef, useState} from "react";
import {Link} from "react-router-dom";
import './TopNav.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass,  faUser} from '@fortawesome/free-solid-svg-icons';

const TopNav = () => {
    const [drop, setDrop] = useState(false)
    const dropRef = useRef(null);

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
            </div>
            <button className='profile-button' onClick={dropButton}>
                <FontAwesomeIcon icon={faUser} className='user-icon'/>
            </button>

            {drop &&
                <div ref={dropRef} className='drop-wrap'>
                    <div className='drop-content'>
                        <Link to="/LoginForm" className='drop-link'>Log In</Link>
                        <Link to="/SignupForm" className='drop-link'>Sign Up</Link>
                    </div>
                </div>
            }

        </div>
    )
}

export default TopNav;