import React, { useContext, useRef } from 'react'
import './login.css'
import { loginCall } from '../../apiCalls';
import { AuthContext } from '../../Context/AuthContext/AuthContext';
import {CircularProgress} from '@material-ui/core';
import { Link } from 'react-router-dom';

const Login = () => {
    const email = useRef();
    const password = useRef();
    const { user, isFetching, error, dispatch } = useContext(AuthContext);

    const handleClick = (e) => {
        e.preventDefault();
        loginCall({ email: email.current.value, password: password.current.value }, dispatch);
    };

  return (
    <div className="login">
        <div className="loginWrapper">
            <div className="loginLeft">
                <h3 className="loginLogo">Social Media</h3>
                <span className="loginDesc">Connecting people...</span>
            </div>
            <div className="loginRight">
                <form className="loginBox" onSubmit={handleClick}>
                    <input className="loginInput" type="email" placeholder="Email" required ref={email}/>
                    <input className="loginInput" type="password" placeholder="Password" minLength="6" required ref={password}/>
                    <button className={isFetching ? "loginProgress" :"loginButton"} >Login</button>
                    {error? <p className="loginFaild"> {error} </p> : <> {isFetching? <p className="loginsuccess"> Trying to signIn </p> : <span className="loginForgot">Forgot Password?</span>}</> }
                    <Link className="loginLink" to='/register'>
                        <button className="loginRegister" >{isFetching ? <CircularProgress color="white" size="25px" /> : "Create New Account"}</button>
                    </Link>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Login
