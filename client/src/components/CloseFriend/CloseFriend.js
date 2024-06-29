import React from 'react'
import './closefriend.css'


const CloseFriend = ({user}) => {
  return (
    <li className="sidebarFriend">
    <img className="sidebarFriendImg" src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp6_RVjqsnYl8AV72tFiEdyimGkQyRkcjMyyTG-bYcow&s" || user?.profilePicture} alt=""/>
    <span className="sidebarFriendName">{user.username}</span>
  </li>
  )
}

export default CloseFriend
