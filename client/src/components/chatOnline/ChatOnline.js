import React from 'react'
import './chatonline.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import useGetConversations from '../../hooks/useGetConversations';
import useConversation from "../../zustand/useConversation";
import { useSocketContext } from "../../Context/SocketContext";
// import VarificationRequest from '../../VarificationRequest/VarificationRequest.js'


const ChatOnline = ({conversation, currentUserId, setCurrentChat}) => {
  const {loading, conversations} = useGetConversations();
	const { selectedConversation, setSelectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();

  const handleSubmit = ()=> {

  }

  return (
    <div className="chatOnline">
      <div className='inputsearch'>
        <input className="searchInputMessenger" placeholder="Search Friends"/>
        <FontAwesomeIcon icon={faMagnifyingGlass} className='iconsearch' onClick={handleSubmit}/>
      </div>
      {conversations?.map((conversation) => (
      <div className="chatOnlineFriend" onClick={()=>{setSelectedConversation(conversation)}}>
        <div className="chatOnlineImageContainer">
            <img className="chatOnlineImage" src={conversation?.profilePicture || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp6_RVjqsnYl8AV72tFiEdyimGkQyRkcjMyyTG-bYcow&s"}  alt=""/>
            <div className= {onlineUsers.includes(conversation._id)? "OnlineBadge" : "offlineBadge"}></div>
        </div>
        <span className="chatOnlineName">{conversation?.username}</span>
      </div>
      ))}
    </div>
  )
}

export default ChatOnline
