import React, { useContext, useRef } from 'react'
import './post.css';
import { MoreHoriz } from '@material-ui/icons';
import moment from 'moment';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext/AuthContext';
import { PostContext } from '../../Context/PostContext/PostContext';
import { Cancel} from '@material-ui/icons';
import VarificationRequest from '../../VarificationRequest/VarificationRequest.js';


const Post = ({post}) => {
  const [likes, setLikes] = useState(post.likes);
  const [flag, setflag] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [commentmode, setCommentmode] = useState(false);
  const [offcommentbutton, setOffcommentbutton] = useState(true);
  const [comments, setComments] = useState(post.comments);
  const [comment, setComment] = useState('');
  const commentRef = useRef(null);
  const [imageUpdate, setImageUpdate] = useState(false);
  const [img, setImg] = useState("")
  const [user, setUser] = useState({});
  const {user: currentUser} = useContext(AuthContext);
  const {dispatch} = useContext(PostContext);
  const [desc, setDesc] = useState("");
  const userId = post.userId;
  const id = post._id;
  const username = currentUser.result.username;
  const nowUserId = currentUser.result._id
  const profilePicture = currentUser.result.profilePicture;
  const axiosPrivate = VarificationRequest();
  const [isopen, setIsopen] = useState(false);
  const [showSeeMoreButton, setShowSeeMoreButton] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axiosPrivate.get(`/users?userId=${post.userId}`)
      setUser(res.data)
    };
    fetchUser();
  },[post.userId]);

  useEffect(() => {
    if(ref.current){
      setShowSeeMoreButton(ref.current.scrollHeight !== ref.current.clientHeight)
    }
  },[])
  
  const haslikedpost = post?.likes?.find((like) => like === nowUserId);

  const likeHandler = async () => {
    try {
      const {data} = await axiosPrivate.patch(`/posts/${id}/like`, {userId: nowUserId});
      dispatch({ type: "LIKE", payload: {id, data, userId}});
      console.log(data);
    } catch (error) {
      console.log(error)
    };

    if(haslikedpost){
      setLikes(post.likes.filter((like) => like !== nowUserId))
    }else{
      setLikes([...post.likes, nowUserId]);
    }
  };

  const LikeCounts = () => {
    if (likes?.length > 0) {
      return likes.find((like) => like === nowUserId)
      ? (
      <>{likes.length > 2 ? `You and ${likes.length -1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}` }</>
      ) : (
      <>{likes.length} {likes.length === 1 ? 'Like' : 'Likes'} </>
      )
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    const value = `${profilePicture} :${username}: ${comment}`;
    const {data} = await axiosPrivate.post(`/posts/${id}/comment`, {value});
    dispatch({ type: "COMMENT", payload: data});
    setComments(data);
    setComment('');
  };

  useEffect(()=> {
    commentRef?.current?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'end' });;
  },[comments])

  const handleclickmorehoriz = () => {
    setflag(true);
  }

  const handleEdit = () => {
    setDesc(post?.desc)
    setImg(post?.img);
    setEditMode(true);
    setCommentmode(false);
    setOffcommentbutton(true);
  }

  const handleDelete = async (e) => {
    e.preventDefault();
    await axiosPrivate.delete(`/posts/${id}`);
    dispatch({ type: "DELETE", payload: id});
  }

  const handleCancel = () => {
    setImageUpdate(false);
    setEditMode(false);
    setflag(false);
    setDesc("")
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if(img){
    const data= new FormData();
    data.append("file", img);
    data.append("upload_preset", "upload");

    try {
    const uploadRes = await fetch("//api.cloudinary.com/v1_1/dpyzwx4t8/image/upload", {method: "post", body: data})
    const results = await uploadRes.json();
    
    const post = {
      desc, userId, img: results.url
    };

    const res = await axiosPrivate.patch(`/posts/${id}`, {...post} );
    const result = res.data;
    dispatch({ type: "UPDATE", payload: {id, result}});
    setImageUpdate(false);
    setEditMode(false);
    setflag(false);

    } catch (error) {
      console.log(error)
    };

  }else{

    try {
      const post = {
        desc,
        userId,
      };

      const res = await axiosPrivate.patch(`/posts/${id}`, {...post} );
      const result = res.data

      dispatch({ type: "UPDATE", payload: {id, result}});
      setImageUpdate(false);
      setEditMode(false);
      setflag(false);

      } catch (error) {
        console.log(error)
      }
    }
  };


  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">

          <div className="postTopLeft">
            <Link to={`profile/${user?.username}`}>
              <img 
                className="postProfile" 
                src={user?.profilePicture || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp6_RVjqsnYl8AV72tFiEdyimGkQyRkcjMyyTG-bYcow&s"} 
                alt=""
              />
            </Link>
            <div className="Username&Date">
              <div className="postUserName">{user?.username}</div>
              <span className="postDate"> {moment(post?.createdAt).fromNow()}</span>
            </div>
          </div>
          
          {((currentUser.result._id===post.userId) && 
          <div className="postTopRight">
            <button className="morehoriz" onClick={handleclickmorehoriz}><MoreHoriz/></button>
            {flag && 
            <div className='MoreEditButton'>
              <button className="morehoriz2" onClick={handleDelete}>Delete</button>
              <button className="morehoriz1" onClick={handleEdit}>Edit</button>
            </div>}
          </div>)}

        </div>

        <div className="postCenter">
          {<> {editMode?
            <>
            <input type="text" 
              placeholder={post?.desc} 
              value={desc} 
              autoFocus 
              className="inputofpost" 
              onChange={(e) => setDesc(e.target.value)}
            />
            </> :
            <>
              <span className={isopen ? null : "readmore"} ref={ref}>{post?.desc}</span>
              {showSeeMoreButton && (<button className='seemorebtn' onClick={()=>setIsopen(!isopen)}>{isopen ? "See less..." : "See more"}</button>)}
            </>
            }
          </>}
          {imageUpdate && <Cancel className="cancelShareImage" onClick={() => (setImg(""), setImageUpdate(false))}/>}
          {editMode ? (
            <>
            {imageUpdate ?
              <img 
                className="postImg" 
                src={img && editMode? 
                (URL.createObjectURL(img)) : ("https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg")} 
                alt=""
              /> :
              <>
              <img 
                className="postImg" 
                src={editMode? (post?.img) : ("https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg")} 
                alt=""
              />
              <input 
                type="file" 
                accept=".png,.jpg,.jpeg,.svg,.webp" 
                id= "file" onChange={(e) => (setImg(e.target.files[0]), setImageUpdate(true))}
              />
              </>
            }
            </>):(<><img className="postImg" src={post?.img} alt=""/></>)
          }
        </div>
        <div className="postBottom">

          <div className="postBottomLeft">
            {!editMode &&<> 
            <img 
              className="likeReact" 
              src={"https://i.postimg.cc/XJCtSFZf/like.png"} 
              onClick={likeHandler} 
              alt=""
            />
            <img 
              className="likeReact" 
              src={"https://w7.pngwing.com/pngs/474/499/png-transparent-facebook-messenger-like-button-emoji-face-heart-logo-love-text-heart-thumbnail.png"} 
              onClick={likeHandler} alt=""
            />
            <span className="postlikeCounter"><LikeCounts/></span>
            </>}
          </div>
          <div className="postBottomRight">
            {<>{!editMode ? 
              <>{ offcommentbutton && <><span className="postComment">{post?.comments?.length}</span>
              <button className='commentbtn' onClick={() => (setCommentmode(true), setOffcommentbutton(false)) }>comments</button></>}</>
              : 
              <div className='postcancelupdatebtn'>
                <button className='cancelpostbtn' onClick={handleCancel}>Cancel</button>
                <button className='updatepostbtn' onClick={handleUpdate}>Update</button>
              </div>}
            </>}
            {commentmode && <button className="hidecommentmode" onClick={()=> (setCommentmode(false), setOffcommentbutton(true))}>Hide comments</button>}
          </div>
        </div>
        {commentmode &&
          <div>
          <div className='commentsec'>
          <h4><u>{post?.comments?.length} Comments:</u></h4>
          {post?.comments?.map((com, i) => (
            <>
            <div className='profilecomment' key={i}>
              <div>
                <img className='commentimg' src={com.split(' :')[0]} alt=''/>
              </div>
              <div className='commentersection'>
                <p className='commenter'>{com.split(':')[2]}</p>
                <p className='idname'>{com.split(': ')[1]}</p>
              </div>
            </div>
            </>
            ))}
            <div ref={commentRef} />
          </div>
          <br/>
          <div className='commentbox'>
            <form className='commentform'>
              <textarea className='commenttextarea' placeholder='Write a comment...' value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
              <button className='commentsubmit' onClick={handleComment}>Post</button>
            </form>
          </div>
        </div>}
      </div>
    </div>
  )
}

export default Post
