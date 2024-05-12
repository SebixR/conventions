import React from "react"
import "./ErrorNotification.css";
import {faCircleXmark} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const ErrorNotification = ( {text} ) => {
    return (
        <div className='error-notification-wrap'>
            <div className='error-notification'>
                <FontAwesomeIcon icon={faCircleXmark} className='error-icon'/>
                <label className="error-text">{text}</label>
            </div>
        </div>

    )
}

export default ErrorNotification;
