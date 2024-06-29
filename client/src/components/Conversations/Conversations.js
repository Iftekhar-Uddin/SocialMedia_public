// import React, { useEffect, useState } from 'react'
// import './conversations.css'
// import axios from 'axios'
// import VarificationRequest from '../../VarificationRequest/VarificationRequest.js'


// const Conversations = ({conversation, currentUser}) => {
//   const [user, setUser] = useState({});
//   const api = VarificationRequest();

//   useEffect(() => {
//     const friendId = conversation.members.find((m) =>( m !== currentUser._id));
//     const getUser = async () => {
//     try {
//       const res = await axios.get(`${api}/users/${friendId}`);
//       setUser(res.data)
//     } catch (error) {
//       console.log(error)
//     }
//    };
//    getUser();
//   }, [conversation, currentUser]);

//   console.log(user)

//   return (
//     <div className='conversations'>
//       <img className="conversationImg" src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp6_RVjqsnYl8AV72tFiEdyimGkQyRkcjMyyTG-bYcow&s" || user.profilePicture} alt=""/>
//       <p className="conversationsName">{user.username}</p>
//     </div>
//   )
// }

// export default Conversations
