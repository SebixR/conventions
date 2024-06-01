import React, {useState} from "react";
import "./ChangePassword.css";
import TopNav from "../TopNav/TopNav";
import {useLocation, useNavigate} from "react-router-dom";
import axios from "../../config/axios";
import ErrorNotification from "../ErrorNotification/ErrorNotification";
import {useAuth} from "../../provider/AuthProvider";
import Footer from "../Footer/Footer";

const ChangePassword = () => {
    let { state } = useLocation();
    const navigate = useNavigate();
    const { setTokenNull } = useAuth();

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordRepeat, setNewPasswordRepeat] = useState('');

    const [errors, setErrors] = useState([]);
    const validateForm = () => {
        let errors = {};
        let isValid = true;

        if (!newPasswordRepeat.trim()) errors.newPasswordRepeat = 'Please input your new password again.';
        if (!newPassword.trim()) errors.newPassword = 'Please input your new password.';
        if (!oldPassword.trim()) errors.oldPassword = 'Please input your previous password.';
        if (newPassword !== newPasswordRepeat) errors.match = 'Passwords don\'t match';
        if (newPassword.length < 8) errors.length = 'The new password must be 8 characters or longer';

        if (Object.keys(errors).length !== 0) isValid = false;

        setErrors(errors);
        return isValid;
    }

    const [requestError, setRequestError] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();

        let isValid = validateForm();
        if (!isValid) return;

        const email = state.userEmail;
        const formData = {oldPassword, newPassword, email};
        try {
            const response = await axios.post('/changePassword', formData);
            console.log(response.data);
        } catch (error) {
            setRequestError("Failed to change the password");
        }

        setTokenNull();
        navigate("/LoginForm");
    }

    return (
        <div className="main-wrap">

            <TopNav/>

            {Object.keys(errors).map((errorKey) => (
                <ErrorNotification key={errorKey} text={errors[errorKey]} />
            ))}

            {requestError && (<ErrorNotification text={requestError}/>)}

            <form onSubmit={handleSubmit} className="form-wrap">
                <h2>Change Password</h2>
                <div className="content-wrap">
                    <div className="field">
                        <label>Previous Password</label>
                        <input type="password" placeholder="Previous Password" value={oldPassword}
                        onChange={(ev) => setOldPassword(ev.target.value)}/>
                    </div>

                    <div className="field">
                        <label>New Password</label>
                        <input type="password" placeholder="New Password" value={newPassword}
                               onChange={(ev) => setNewPassword(ev.target.value)}/>
                    </div>

                    <div className="field">
                        <label>Confirm Password</label>
                        <input type="password" placeholder="Confirm Password" value={newPasswordRepeat}
                               onChange={(ev) => setNewPasswordRepeat(ev.target.value)}/>
                    </div>

                    <button type="submit">Submit</button>

                </div>
            </form>

           <Footer/>

        </div>
    )
}

export default ChangePassword;