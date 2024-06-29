import React, { useContext, useEffect, useRef, useState } from 'react'
import "./messenger.css"
import { AuthContext } from '../../Context/AuthContext/AuthContext'
import Topbar from '../../components/Topbar/Topbar'
import useSendMessage from "../../hooks/useSendMessage";
import useGetMessages from "../../hooks/useGetMessages";
import useGetConversations from "../../hooks/useGetConversations";
import useListenMessages from "../../hooks/useListenMessages";
import useConversation from "../../zustand/useConversation";
import Message from '../../components/Message/Message'
import ChatOnline from '../../components/chatOnline/ChatOnline'


const Messenger = () => {
  const {user} = useContext(AuthContext);
  const { selectedConversation, setSelectedConversation } = useConversation();
  const {sendMessage } = useSendMessage();
  const [message, setMessage] = useState("");
  const { messages, loading} = useGetMessages();
  useListenMessages();
  const lastMessageRef = useRef();
  const { conversations } = useGetConversations();
  // const api = VarificationRequest();
  // console.log(conversations);

  useEffect(() => {
		// cleanup function (unmounts)
		return () => setSelectedConversation(null);
	}, [setSelectedConversation]);

  const handleSubmit = async (e) => {
    e.preventDefault();
		if (!message) return;
		await sendMessage(message);
		setMessage("");
  };

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({behavior: "smooth"})
  },[messages]);


  return (
    <>
    <Topbar/>
    <div className="messenger">
      <div className="chatBox">
        <div className="chatBoxWrapper">
        { selectedConversation ? 
          <>
          <div className="chatBoxTop">
            {messages.map((message) => (
              <div ref={lastMessageRef}>
              <Message message={message} own={message.senderId === user.result._id}/>
              </div>
            ))}
          </div>
          <div className="chatBoxBottom">
            <textarea className="chatMessageInput" 
              placeholder="Send your message..." 
              value={message}
              onChange={(e) => setMessage(e.target.value)}>
              </textarea>
            <button className="chatSubmitButton" onClick={handleSubmit}>Send</button>
          </div>
          </> : <span className="conversationBody">Open a conversation to start messaging...</span>
        }
        </div>
      </div>
      <hr className='hr'/>
      <div className="chatOnline">
        <div className="chatOnlineWrapper">
          <ChatOnline conversation={conversations}/>
        </div>
      </div>
    </div>
    </>
  )
}

export default Messenger
