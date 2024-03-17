import React, {useState} from "react";
import "./LoginForm.css"
import TopNav from "../TopNav/TopNav";

const LoginForm = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')

    const onButtonClick = () => {
        setEmailError('')
        setPasswordError('')

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
    }

    return (
        <div className='main-wrap'>

            <TopNav/>

            <div className='form-wrap'>
                <h2>Log In</h2>
                <div className='content-wrap'>
                    <div className='field'>
                        <label>Email</label>
                        <input value={email} type='text' placeholder='Email'
                               onChange={(ev) => setEmail(ev.target.value)}/>
                        {emailError &&
                            <div className='error-wrap'>
                            <label className='error-label'>{emailError}</label>
                        </div>}
                    </div>

                    <div className='field'>
                        <label>Password</label>
                        <input value={password} type='password' placeholder='Password'
                               onChange={(ev) => setPassword(ev.target.value)}/>
                        {passwordError &&
                            <div className='error-wrap'>
                            <label className='error-label'>{passwordError}</label>
                        </div>}
                    </div>

                    <button onClick={onButtonClick}>Log In</button>
                    <div className='or-signup'>
                        <div className='line-wrap'>
                            <div className='line'></div>
                            <label>Or</label>
                            <div className='line'></div>
                        </div>
                        <button>Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
