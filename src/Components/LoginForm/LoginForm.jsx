import React, {useState} from "react";
import "./LoginForm.css"
import TopNav from "../TopNav/TopNav";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleXmark} from "@fortawesome/free-solid-svg-icons";
import axios from "../../config/axios";
import {Link, Navigate} from "react-router-dom";
import {useAuth} from "../../provider/AuthProvider";

const LoginForm = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [loggedIn, setLoggedIn] = useState(false)

    const { addToken, isAuth} = useAuth();

    const onButtonClick = () => {
        setEmailError('')
        setPasswordError('')

        if ('' === email) {
            setEmailError('Please enter your email')
        }

        if ('' === password) {
            setPasswordError('Please enter a password')
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = { email, password };
        try {
            if (emailError === '' && passwordError === '') {
                const response = await axios.post('auth/loginUser', formData);
                const token = response.data.token;
                addToken(token);
                setLoggedIn(true)
                console.log(response.data);
            }
        } catch (error) {
            setEmailError(error.response.data)
        }
    }

    if (isAuth && loggedIn) return <Navigate to="/" />

    return (
        <div className='main-wrap'>

            <TopNav/>

            <form onSubmit={handleSubmit} className='form-wrap'>
                <h2>Log In</h2>
                <div className='content-wrap'>
                    <div className='field'>
                        <label>Email</label>
                        <input value={email} type='text' placeholder='Email'
                               onChange={(ev) => setEmail(ev.target.value)}/>
                        {emailError &&
                            <div className='error-wrap'>
                                <FontAwesomeIcon icon={faCircleXmark} className='x-icon'/>
                            <label className='error-label'>{emailError}</label>
                        </div>}
                    </div>

                    <div className='field'>
                        <label>Password</label>
                        <input value={password} type='password' placeholder='Password'
                               onChange={(ev) => setPassword(ev.target.value)}/>
                        {passwordError &&
                            <div className='error-wrap'>
                                <FontAwesomeIcon icon={faCircleXmark} className='x-icon'/>
                                <label className='error-label'>{passwordError}</label>
                            </div>
                        }
                    </div>

                    <button type="submit" onClick={onButtonClick}>Log In</button>
                    <div className='or-signup'>
                        <div className='line-wrap'>
                            <div className='line'></div>
                            <label>Or</label>
                            <div className='line'></div>
                        </div>
                        <Link to="/SignupForm" className='signup-button'>Sign Up</Link>
                    </div>
                </div>
            </form>

            <Link className="forgot-password-link" to="/PasswordReset">Forgot your password?</Link>
        </div>
    );
};

export default LoginForm;
