import React from 'react';
import './home.css';
import Topbar from '../../components/Topbar/Topbar.js';
import Sidebar from '../../components/Sidebar/Sidebar.js';
import Feed from '../../components/Feed/Feed';
import Rightbar from '../../components/Rightbar/Rightbar.js';
import {PostContextProvider} from './../../Context/PostContext/PostContext.js';
import AppLogout from '../Logout/AutoLogout.js'


const Home = () => { 

  return (
    <>
    <PostContextProvider>
      <AppLogout>
        <Topbar/>
        <div className="homeContainer">
          <Sidebar/>
          <Feed/>
          <Rightbar/>
        </div>
      </AppLogout>
    </PostContextProvider>
    </>

  )
}

export default Home
