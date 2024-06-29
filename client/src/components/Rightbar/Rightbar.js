import React from 'react'
import './rightbar.css'
import Online from '../Online/Online'
import {Link} from 'react-router-dom';
import { AuthContext } from "../../Context/AuthContext/AuthContext"
import { useContext, useEffect, useState, useRef } from "react"
import { useSocketContext } from "../../Context/SocketContext";
import useConversation from "../../zustand/useConversation";
import VarificationRequest from '../../VarificationRequest/VarificationRequest.js';


const Rightbar = () => {
  const { user } = useContext(AuthContext);
  const [friends, setFriends] = useState([]);
  const { onlineUsers } = useSocketContext();
  const [onlineFriends, setOnlineFriends] = useState([]);
  const { selectedConversation, setSelectedConversation } = useConversation();
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


  useEffect(() => {
    setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
  }, [friends, onlineUsers]);

  const handleOpenChat = (friend)=> {
    window.location.replace(`/messenger/`);
    setSelectedConversation(friend);
  }

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        <div className="birthdayContainer">
          <img 
            className="birthdayImage" 
            src= {"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVg4MfLKfz21mmSHdJmrMFfyKE-z8c0pLWjw&usqp=CAU"} 
            alt=""
          />
          <span className="birthdayText"><b>Marina Afrin</b> and <b>2 other friends</b> birthday today.</span>
        </div>
        <img 
          className="rightbarAdd" 
          src= {"https://www.shutterstock.com/image-vector/birthday-cake-vector-background-design-600nw-2203971617.jpg"} 
          alt=""
        />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {onlineFriends.map((friend) => (
            <div className="onlineOnFriend" onClick={()=>{ handleOpenChat(friend)}}>
            <Online key={friend.id} activeFriend={friend} />
            </div>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Rightbar
