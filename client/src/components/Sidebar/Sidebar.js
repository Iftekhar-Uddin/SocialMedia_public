import React from 'react'
import './sidebar.css'
import { AuthContext } from "../../Context/AuthContext/AuthContext"
import { useContext, useEffect, useState } from "react"
import CloseFriend from '../CloseFriend/CloseFriend'
import { Bookmark, Chat, Event, Group, HelpOutline, PlayCircleFilledOutlined, RssFeed, School, WorkOutline } from '@material-ui/icons'
import VarificationRequest from '../../VarificationRequest/VarificationRequest.js'

const Sidebar = () => {
  const { user } = useContext(AuthContext);
  const [friends, setFriends] = useState([]);
  const id = user?.result?._id;
  const axiosPrivate = VarificationRequest();

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axiosPrivate.get(`/users/friends/${id}`);
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, []);


  return (
    <div className="sidebar">
        <div className="sidebarWrapper">
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <RssFeed className="sidebarIcon"/>
              <span className="sidebarListItemTest">Feeds</span>
            </li>
            <li className="sidebarListItem">
              <Chat className="sidebarIcon"/>
              <span className="sidebarListItemTest">Chats</span>
            </li>
            <li className="sidebarListItem">
              <PlayCircleFilledOutlined className="sidebarIcon"/>
              <span className="sidebarListItemTest">videos</span>
            </li>
            <li className="sidebarListItem">
              <Group className="sidebarIcon"/>
              <span className="sidebarListItemTest">Groups</span>
            </li>
            <li className="sidebarListItem">
              <Bookmark className="sidebarIcon"/>
              <span className="sidebarListItemTest">Bookmarks</span>
            </li>
            <li className="sidebarListItem">
              <School className="sidebarIcon"/>
              <span className="sidebarListItemTest">Courses</span>
            </li>
            <li className="sidebarListItem">
              <Event className="sidebarIcon"/>
              <span className="sidebarListItemTest">Events</span>
            </li>
            <li className="sidebarListItem">
              <WorkOutline className="sidebarIcon"/>
              <span className="sidebarListItemTest">Jobs</span>
            </li>
            <li className="sidebarListItem">
              <HelpOutline className="sidebarIcon"/>
              <span className="sidebarListItemTest">Questions</span>
            </li>
          </ul>
          <button className="sidebarButton">Show More</button>
          <hr className="sidebarHr"/>
          <ul className="sidebarFriendList">
          {friends.map((u) => (
            <CloseFriend key={u._id} user={u}/>
          ))}
          </ul>
        </div>
    </div>
  )
};

export default Sidebar;
