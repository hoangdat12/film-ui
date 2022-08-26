import React, {useState, useContext} from "react";
import {Link, useParams} from 'react-router-dom'

import {AiOutlineEyeInvisible, AiOutlineEye, AiOutlineGoogle} from 'react-icons/ai'
import {SiFacebook} from 'react-icons/si'

import { AuthContext } from "../../context/authContext";


import './login.scss'

const Login = () => {

    const {loginUser, registerUser} = useContext(AuthContext)

    const [showPassword, setShowPassword] = useState(false)
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [password2, setPassword2] = useState('')
    const [email, setEmail] = useState('')
    const [fistName, setFistName] = useState('')
    const [lastName, setLastName] = useState('')

    let {login} = useParams()

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    // useEffect(() => {
    //     const enterEvent = (e) => {
    //         console.log('re-render')
    //         if (e.keycode === 13) {
    //             login === 'login' ? loginUser() : registerUser()
    //         }
    //     }
    //     document.addEventListener('keydown', enterEvent)
    //     return () => {document.removeEventListener('keydown', enterEvent)}
    // }, [login, loginUser, registerUser])

    return (
        <>
        <div className="login">
            <div className="continue__button">
                <Link to='/'>Continue Watching</Link>
            </div>
            <div className="form">
                <h4 className="title">{login === 'login' ? 'Login' : 'Signup'}</h4>
                <form>
                    <div className={login === 'login' ? "field input-field block" : "field input-field"}>
                        <input 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email" 
                            placeholder="Email" 
                            className="input" 
                        />
                    </div>

                    <div className="field input-field">
                        <input 
                            value={username}
                            onChange={ (e) => setUsername(e.target.value)}
                            type="username" 
                            placeholder="User name" 
                            className="input"
                        />
                    </div>

                    <div className="field input-field">
                        <input 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type={showPassword ? "text" : "password" }
                            placeholder="Password" 
                            className="password" 
                        />
                        <i onClick={handleShowPassword} className='eye-icon'>{showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}</i>
                    </div>

                    <div className={login === 'login' ? "field input-field block" : "field input-field"}>
                        <input 
                            value={password2}
                            onChange={(e) => setPassword2(e.target.value)}
                            type="password" 
                            placeholder="Repeat Password" 
                            className="password" 
                        />
                        <i onClick={handleShowPassword} className='eye-icon'>{showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}</i>
                    </div>

                    <div className={login === 'login' ? "block name__user__register" : "name__user__register"}>
                        <input 
                            value={fistName}
                            onChange={(e) => setFistName(e.target.value) }
                            type="text" 
                            placeholder="First Name" 
                        />
                        <input 
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value) }
                            type="text" 
                            placeholder="Last Name" 
                        />
                    </div>

                </form>
                
                <div className={login === 'login' ? "checkbox-text block" : "checkbox-text"}>
                    <div className="checkbox-content">
                        <input type="checkbox" id="termCon" />
                        <label htmlFor="termCon" className="text">I accepted all terms and conditions</label>
                    </div>
                </div>

                <div className={login === 'login' ? "form__link" : "form__link block"}>
                    <Link to="#" className="forgot-pass">Forgot password?</Link>
                </div>

                <div className="from__button">
                    <button
                        onClick={
                            login === 'login' ? 
                            () => loginUser({'username': username, 'password':password})
                            : 
                            () => registerUser({'username': username, 'email': email, 'password':password, 'password2':password2, 'first_name':fistName, 'last_name':lastName})
                        }
                    >
                        {login === 'login' ? 'Login' : 'Signup'}
                    </button>
                </div>

                <div className="form__link">
                    <span className="">{login === 'login' ? "Don't have an account ?" : "Already have an account ?" }</span>
                    <Link to={login === 'login' ? '/person/signup' : '/person/login'} className="signup">{login === 'login' ? "Signup" : 'Login'}</Link>
                </div>

                <div className={login === 'login' ? "line" : "line block"}></div>
                <div className={login === 'login' ? "login__facebook" : "login__facebook block"}>
                    <span><SiFacebook /></span>
                    Login with Facebook
                </div>
                <div className={login === 'login' ? "login__google" : "login__google block"}>
                    <span><AiOutlineGoogle /></span>
                    Login with Google
                </div>
            </div>
        </div>
        </>
    )
}

export default Login