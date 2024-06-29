import React, { useRef, useState, useEffect } from 'react'
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './register.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'


const USER_REGEX = /^[A-z][A-z0-9-_ -]{3,23}$/;
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;



const Register = () => {
    const api = process.env.REACT_APP_API_KEY;
    const navigate = useNavigate();

    const userRef = useRef();
    const errRef = useRef();

    const [username, setUsername] = useState('');
    const [validName, setValidName] = useState(false);
    const [usernameFocus, setUsernameFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [repeatPassword, setRepeatPassword] = useState('');
    const [validRepeatPassword, setValidRepeatPassword] = useState(false);
    const [repeatPasswordFocus, setRepeatPasswordFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);



    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(username));
    }, [username])

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password));
        setValidRepeatPassword(password === repeatPassword);
    }, [password, repeatPassword])

    useEffect(() => {
        setErrMsg('');
    }, [username, email, password, repeatPassword])


    const handleSubmit = async (e) => {
        e.preventDefault();
        const v1 = USER_REGEX.test(username);
        const v2 = PWD_REGEX.test(password);
        const v3 = EMAIL_REGEX.test(email);
        if (!v1 || !v2 || !v3) {
            setErrMsg("Invalid Entry");
            return;
        // }

        // if(password.current.value !== repeatPassword.current.value){
        // password.current.setCustomValidity("Password don't match!")
        }else{
            const user = {
                username,
                email,
                password,
                profilePicture : "https://i.postimg.cc/J0fBJh5C/images.png"
            };
            try {
                await axios.post(`${api}/auth/register/`, user);
                setSuccess(true);
                setUsername('');
                setEmail('');
                setPassword('');
                setRepeatPassword('');
                navigate('/login');

            } catch (error) {
                if (!error?.response) {
                    setErrMsg('No Server Response');
                } else if (error.response?.status === 409) {
                    setErrMsg('Username Taken');
                } else {
                    setErrMsg('Registration Failed')
                }
                errRef.current.focus();
            }
        }

    };

    return (
      <div className="register">
          <div className="registerWrapper">
              <div className="registerLeft">
                <h3 className="registerLogo">Social Media</h3>
                <span className="registerDesc">Create account & connect each with others</span>
              </div>
              <div className="registerRight">
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                <form className="registerBox" onSubmit={handleSubmit}>

                    <label htmlFor="username">
                        Username:
                        <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                        <FontAwesomeIcon icon={faTimes} className={validName || !username ? "hide" : "invalid"} />
                    </label>
                    <input className="registerInput"
                        type="text"                             
                        id="username"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        required
                        aria-invalid={validName ? "false" : "true"}
                        aria-describedby="usernote"
                        onFocus={() => setUsernameFocus(true)}
                        onBlur={() => setUsernameFocus(false)} 
                        placeholder="Username"
                    />
                    <p id="usernote" className={usernameFocus && username && !validName ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        4 to 24 characters.<br />
                        Must begin with a letter.<br />
                        Letters, numbers, underscores, hyphens allowed.
                    </p>


                    <label htmlFor="email">
                        Email:
                        <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"} />
                        <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hide" : "invalid"} />
                    </label>
                    <input className="registerInput" 
                        type="text"                             
                        id="email"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                        aria-invalid={validEmail ? "false" : "true"}
                        aria-describedby="emailnote"
                        onFocus={() => setEmailFocus(true)}
                        onBlur={() => setEmailFocus(false)}
                        placeholder="Email" 
                    />
                    <p id="emailnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        Please provide a valid email.
                    </p>


                    <label htmlFor="password">
                        Password:
                        <FontAwesomeIcon icon={faCheck} className={validPassword ? "valid" : "hide"} />
                        <FontAwesomeIcon icon={faTimes} className={validPassword || !password ? "hide" : "invalid"} />
                    </label>
                    <input className="registerInput"                             
                        type="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                        aria-invalid={validPassword ? "false" : "true"}
                        aria-describedby="passwordnote"
                        onFocus={() => setPasswordFocus(true)}
                        onBlur={() => setPasswordFocus(false)}
                        minLength="6" 
                        placeholder="Password"
                    />
                    <p id="passwordnote" className={passwordFocus && !validPassword ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        8 to 24 characters.
                        Must include uppercase<br/> and lowercase letters, a number and a special character.<br/>
                        Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                    </p>


                    <label htmlFor="confirm_password">
                        Repeat Password:
                        <FontAwesomeIcon icon={faCheck} className={validRepeatPassword && repeatPassword ? "valid" : "hide"} />
                        <FontAwesomeIcon icon={faTimes} className={validRepeatPassword || !repeatPassword ? "hide" : "invalid"} />
                    </label>
                    <input className="registerInput"                             
                        type="password"
                        id="confirm_password"
                        onChange={(e) => setRepeatPassword(e.target.value)}
                        value={repeatPassword}
                        required
                        aria-invalid={validRepeatPassword ? "false" : "true"}
                        aria-describedby="repeatpasswordnote"
                        onFocus={() => setRepeatPasswordFocus(true)}
                        onBlur={() => setRepeatPasswordFocus(false)} 
                        minLength="6" 
                        placeholder="Repeat Password"
                    />
                    <p id="repeatpasswordnote" className={repeatPasswordFocus && !validRepeatPassword ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        Must match the first password input field.
                    </p>

                    <button className="registerButton" disabled={!validName || !validEmail || !validPassword || !validRepeatPassword ? true : false} type="submit" >Sign Up</button>
                    <Link className="registerLink" to="/login">
                        <button className="registerRegister">Log Into Account</button>
                    </Link>
                </form>
              </div>
          </div>
      </div>
    )
  }

export default Register
