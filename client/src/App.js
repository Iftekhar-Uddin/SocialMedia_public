import React, { useContext} from 'react'
import Login from './pages/Login/Login.js';
import Home from './pages/Home/Home.js';
import Profile from './pages/Profile/Profile.js';
import Register from './pages/Register/Register.js';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from './Context/AuthContext/AuthContext.js';
import Messenger from './pages/Messenger/Messenger.js';
import EditInfo from './pages/Edit_Profile/Edit_Profile.js';

export default function App() {
  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={user? <Home/> : <Navigate to="/login" />}  />
        <Route path="/login/*" element={ user? <Navigate to="/" /> : <Login/>} />
        <Route path="/register/*" element={ !user? <Register /> : <Navigate to="/" />} />
        <Route path="/profile/:username/*" element={<Profile/>} />
        <Route path="/messenger/*" element={ !user? <Navigate to="/" /> : <Messenger/>} />
        <Route path="/editProfile/*" element={user? <EditInfo/> : <Navigate to="/"/>} />

      </Routes>
    </BrowserRouter>
  );
}
