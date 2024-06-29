import React, {useContext, useState, useEffect, useRef} from 'react';
import { AuthContext } from '../../Context/AuthContext/AuthContext';
import {Link, useNavigate, useLocation} from 'react-router-dom';

const events = [
  "load",
  "mousemove",
  "mousedown",
  "onmouseup",
  "onmouseover",
  "onmouseout",
  "click",
  "scroll",
  "keypress",
]
  
const AppLogout = ({ children }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const {dispatch} = useContext(AuthContext);
    let timer;
  
  // this function sets the timer that logs out the user after 10 secs
  const handleLogoutTimer = () => {
    timer = setTimeout(() => {
      // clears any pending timer.
      resetTimer();
      // Listener clean up. Removes the existing event listener from the window
      Object.values(events).forEach((item) => {
        window.removeEventListener(item, resetTimer);
      });
      // logs out user
      logoutAction();
    }, 300000); // 10000ms = 10secs. You can change the time.
  };
  
  // this resets the timer if it exists.
  const resetTimer = () => {
    if (timer) clearTimeout(timer);
  };
  
  // when component mounts, it adds an event listeners to the window
  // each time any of the event is triggered, i.e on mouse move, click, scroll, keypress etc, the timer to logout user after 10 secs of inactivity resets.
  // However, if none of the event is triggered within 10 secs, that is app is inactive, the app automatically logs out.
  useEffect(() => {
    Object.values(events).forEach((item) => {
      window.addEventListener(item, () => {
        resetTimer();
        handleLogoutTimer();
      });
    });
  }, []);
  
  // logs out user by clearing out auth token in localStorage and redirecting url to /signin page.
  const logoutAction = () => {
    dispatch({type: "LOGOUT", payload: null});
    localStorage.removeItem("user")
    localStorage.clear("user");
    navigate('/');
    window.location.reload();
    // window.location.pathname = "/";
  };
  
    return children;
};
  
export default AppLogout;