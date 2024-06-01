import React, {useState} from "react";
import "./PasswordResetPage.css"
import TopNav from "../TopNav/TopNav";
import SuccessNotification from "../SuccessNotification/SuccessNotification";

const PasswordResetPage = () => {

    const [emailSubmitted, setEmailSubmitted] = useState(false);
    const handleSubmitEmail = () => {
        setEmailSubmitted(true);
    }

    return (
        <div>

            <TopNav/>

            {emailSubmitted && (
                <SuccessNotification text="If the email you submitted is correct, you should receive a message with further instructions"/>
            )}

            <div className="password-content-wrap">
                <div className="password-field">
                    <label>Email</label>
                    <input type="text"/>
                </div>

                <button className="password-button" type="button" onClick={handleSubmitEmail}>Send</button>
            </div>

        </div>
    )
}

export default PasswordResetPage;