import React, { useContext, useState, useRef} from 'react'
import './share.css';
import { Cancel, EmojiEmotions, Label, PermMedia, Room, Send } from '@material-ui/icons';
import { AuthContext } from '../../Context/AuthContext/AuthContext';
import axios from 'axios';
import { PostContext } from '../../Context/PostContext/PostContext';
import VarificationRequest from '../../VarificationRequest/VarificationRequest.js'


const Share = () => {
  const {user} = useContext(AuthContext)
  const {dispatch} = useContext(PostContext);
  const [file, setFile] = useState(null);
  const [desc , setDesc] = useState("");
  const axiosPrivate = VarificationRequest();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const postdata = {userId: user.result._id, desc};

    const data= new FormData();
    data.append("file", file);
    data.append("upload_preset", "upload");

    if(file){
      const uploadRes = await fetch("//api.cloudinary.com/v1_1/dpyzwx4t8/image/upload", {method: "post", body: data})
      const result = await uploadRes.json();
      postdata.img = result.url;
      try {
        await axiosPrivate.post(`/upload`, postdata);
      } catch (err){
        console.log(err)
      }
    };

    try{
      await axiosPrivate.post(`/posts`, postdata);
      dispatch({ type: "CREATE", payload: postdata});
      setFile(null);
      setDesc("");
      window.location.reload();
    } catch (err){
      console.log(err)
    };

  };
  
  return (
    <div className="share">
        <div className="shareWrapper">
            <div className="shareTop">
              <img 
                className="shareProfilePicture" 
                src={user?.result?.profilePicture || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp6_RVjqsnYl8AV72tFiEdyimGkQyRkcjMyyTG-bYcow&s"} 
                alt=""                 
              />
              <input 
                className="shareInput" 
                type="text" 
                value={desc} 
                placeholder={"What's on your mind now "+ user?.result?.username + "?"} 
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>
            <hr className="shareHr"/>
            <div className="shareContent">
                {( file &&
                  <>
                    <img className="shareImg" src={URL.createObjectURL(file)} alt=""/>
                    <Cancel className="cancelShareImagehere" onClick={() => setFile(null)}/>
                  </>
                )}
            </div>
            <form className="shareBottom" onSubmit={handleSubmit}>
                <div className="shareOptions">
                    <label htmlFor='file' className="shareOption">
                      <PermMedia className="shareIcon" htmlColor="tomato"/>
                      <span className="shareOptionText">Photo or Video</span>
                      <input 
                        style={{display: "none"}} 
                        type="file" 
                        id="file" 
                        accept=".png,.jpg,.jpeg,.svg,.webp" 
                        onChange={(e) => setFile(e.target.files[0])}
                      />
                    </label>
                    <div className="shareOption">
                      <Label className="shareIcon" htmlColor="blue"/>
                      <span className="shareOptionText">Tag</span>
                    </div>
                    <div className="shareOption">
                      <Room className="shareIcon" htmlColor="green"/>
                      <span className="shareOptionText">Location</span>
                    </div>
                    <div className="shareOption">
                      <EmojiEmotions className="shareIcon" htmlColor="goldenrod"/>
                      <span className="shareOptionText">Feelings</span>
                    </div>
                </div>
                <button className="shareButton">
                  <span className="sharePostText" type="submit">Share</span>
                  <Send className="shareButtonicon"/>
                </button>

            </form>
        </div>
    </div>
  )
}

export default Share;
