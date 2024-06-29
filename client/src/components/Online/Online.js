import React from 'react'
import './online.css'

const Online = ({activeFriend}) => {

  return (
    <div className="friendSector">
      <li className= "rightbarFriend">
        <div className='rightbarProfileImgContainer'>
          <img className="rightbarProfileImg" 
            src={activeFriend.profilePicture || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp6_RVjqsnYl8AV72tFiEdyimGkQyRkcjMyyTG-bYcow&s"} 
            alt="125.png" 
          />
          <span className="rightbarOnline"></span>
        </div>
        <span className="rightbarUserName">{activeFriend.username}</span>
      </li>
    </div>
  )
}

export default Online
