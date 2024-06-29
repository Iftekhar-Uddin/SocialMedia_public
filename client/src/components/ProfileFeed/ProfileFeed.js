import React, { useContext, useEffect, useState} from 'react'
import './profileFeed.css'
import Share from '../Share/Share.js'
import Post from '../Post/Post.js'
import { AuthContext } from '../../Context/AuthContext/AuthContext';
import { PostContext } from '../../Context/PostContext/PostContext';
import VarificationRequest from '../../VarificationRequest/VarificationRequest.js'


const ProfileFeed = ({username}) =>  {
  const {posts, dispatch} = useContext(PostContext);
  const {user} = useContext(AuthContext);
  const axiosPrivate = VarificationRequest();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axiosPrivate.get(`/posts/profile/${username}`);
          res.data.sort((p1, p2) => (
            new Date(p2.createdAt) - new Date(p1.createdAt)
          ))

        dispatch({ type: "RE_FETCH_ALL", payload: res.data});

      } catch (error) {
        console.log(error)
      }
    };
    fetchPosts();
  },[username, dispatch]);


  return (
    <div className="feed">
      <div className="feedWrapper"/>
      { username === user?.result?.username && <Share/>}
      {posts?.map((p) => (
        <Post key={p._id} post={p}/>
      ))}
    </div>
  )

}

export default ProfileFeed;