import React from "react";
import "./ChangePassword.css";
import TopNav from "../TopNav/TopNav";
import {useLocation} from "react-router-dom";

const ChangePassword = () => {
    let { state } = useLocation();
    console.log(state)

    return (
        <div className="main-wrap">

            <TopNav/>

            <div className="form-wrap">
                <h2>Change Password</h2>
                <div className="content-wrap">
                    <div className="field">
                        <label>Previous Password</label>
                        <input type="password" placeholder="Previous Password"/>
                    </div>

                    <div className="field">
                        <label>New Password</label>
                        <input type="password" placeholder="New Password"/>
                    </div>

                    <div className="field">
                        <label>Confirm Password</label>
                        <input type="password" placeholder="Confirm Password"/>
                    </div>

                    <button type="submit">Submit</button>

                </div>
            </div>

        </div>
    )
}

export default ChangePassword;