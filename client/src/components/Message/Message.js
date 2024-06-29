import React, {useContext } from 'react'
import './message.css'
import { AuthContext } from '../../Context/AuthContext/AuthContext';
import useConversation from "../../zustand/useConversation";
import moment from 'moment'


const Message = ({message, own}) => {
  const {user} = useContext(AuthContext);
  const { selectedConversation } = useConversation();
  const profilePic = own ? user.result.profilePicture : selectedConversation?.profilePicture;

    return (
      <div className={own ? "message own" : "message"}>
        <div className="mesaageTop">
          <img
            className="messageImg"
            src= {profilePic || "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}
            alt=""
          />
          <p className="messageText">{message.message}</p>
        </div>
        <div className="messageBottom">{moment(message.createdAt).fromNow()}</div>
      </div>
    );
  }

export default Message
