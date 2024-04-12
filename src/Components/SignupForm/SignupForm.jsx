import React, {useState} from "react"
import TopNav from "../TopNav/TopNav";
import "./SignupForm.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleXmark} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import axios from "axios";

const SignupForm = () => {
    const [firstName, setFirstName] = useState('')
    const [firstNameError, setFirstNameError] = useState('')
    const [lastName, setLastName] = useState('')
    const [lastNameError, setLastNameError] = useState('')
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState('')
    const [password, setPassword] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [confirmPasswordError, setConfirmPasswordError] = useState('')

    const [role, setRole] = useState('USER')


    const onButtonClick = () => {
        setFirstNameError('')
        setLastNameError('')
        setPasswordError('')
        setConfirmPasswordError('')
        setEmailError('')
        setPasswordError('')

        if ('' === firstName) {
            setFirstNameError('Please enter your name')
        }

        if (!/^[a-zA-Z]+$/.test(firstName)) {
            setFirstNameError('Name can only contain letters')
        }

        if ('' === lastName) {
            setLastNameError('Please enter your name')
        }

        if (!/^[a-zA-Z]+$/.test(lastName)) {
            setLastNameError('Name can only contain letters')
        }

        if ('' === email) {
            setEmailError('Please enter your email')
        }

        if (!/^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            setEmailError('Please enter a valid email')
        }

        if ('' === password) {
            setPasswordError('Please enter a password')
        }

        if (password.length < 8) {
            setPasswordError('The password must be 8 characters or longer')
        }

        if ('' === confirmPassword) {
            setConfirmPasswordError('Please confirm your password')
        }

        if (confirmPassword !== password) {
            setConfirmPasswordError('Passwords don\'t match')
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = { firstName, lastName, email, password, role };
        try {
            if (firstNameError === '' && lastNameError === '' && emailError === ''
                && passwordError === '' && confirmPasswordError === '') {
                const response = await axios.post('http://localhost:8082/public/signupUser', formData);
                console.log(response.data);
                //redirect or notify in some way
            }
        } catch (error) {
            setEmailError(error.response.data);
        }
    }

    return (
        <div className='main-wrap'>

            <TopNav/>

            <form onSubmit={handleSubmit} className='form-wrap'>
                <h2>Sign Up</h2>
                <div className='content-wrap'>
                    <div className='field'>
                        <label>First Name</label>
                        <input value={firstName} type='text' placeholder='First Name'
                               onChange={(ev) => setFirstName(ev.target.value)}/>
                        {firstNameError &&
                            <div className='error-wrap'>
                                <FontAwesomeIcon icon={faCircleXmark} className='x-icon'/>
                                <label className='error-label'>{firstNameError}</label>
                            </div>}
                    </div>

                    <div className='field'>
                        <label>Last Name</label>
                        <input value={lastName} type='text' placeholder='Last Name'
                               onChange={(ev) => setLastName(ev.target.value)}/>
                        {lastNameError &&
                            <div className='error-wrap'>
                                <FontAwesomeIcon icon={faCircleXmark} className='x-icon'/>
                                <label className='error-label'>{lastNameError}</label>
                            </div>}
                    </div>

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

                    <div className='field'>
                        <label>Confirm Password</label>
                        <input value={confirmPassword} type='password' placeholder='Confirm Password'
                               onChange={(ev) => setConfirmPassword(ev.target.value)}/>
                        {confirmPasswordError &&
                            <div className='error-wrap'>
                                <FontAwesomeIcon icon={faCircleXmark} className='x-icon'/>
                                <label className='error-label'>{confirmPasswordError}</label>
                            </div>
                        }
                    </div>

                    <button type="submit" onClick={onButtonClick}>Sign Up</button>
                    <div className='or-login'>
                        <div className='line-wrap'>
                            <div className='line'></div>
                            <label>Or</label>
                            <div className='line'></div>
                        </div>
                        <Link to="/LoginForm" className='login-button'>Log In</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default SignupForm;