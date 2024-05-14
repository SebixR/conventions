import React from "react"
import "./SuccessNotification.css";
import {faCheckCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const SuccessNotification = ( {text} ) => {
    return (
        <div className='error-notification-wrap'>
            <div className='error-notification'>
                <FontAwesomeIcon icon={faCheckCircle} className='check-icon'/>
                <label className="error-text">{text}</label>
            </div>
        </div>

    )
}

export default SuccessNotification;
