import React, { useState, useEffect, useContext } from 'react'
import './profile.css'
import {Remove, Add} from '@material-ui/icons'
import ProfileTopbar from '../../components/ProfileTopbar/ProfileTopbar.js'
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import {useParams} from "react-router"
import axios from 'axios';
import ProfileFeed from '../../components/ProfileFeed/ProfileFeed';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext/AuthContext';
import { PostContext } from '../../Context/PostContext/PostContext'
import VarificationRequest from '../../VarificationRequest/VarificationRequest.js'


const Profile = () => {
  const username = useParams().username;
  const [user, setUser] = useState({});
  const {user: currentUser, dispatch} = useContext(AuthContext);
  const [friends, setFriends] = useState([]);
  const [followed, setFollowed] = useState(currentUser?.result?.followings?.includes(user?._id));
  const [updateMode, setUpdateMode] = useState(false);
  const [updateModeReady, setUpdateModeReady] = useState(false)
  const [select, setSelect] = useState(false);
  const [profilePicture, setProfilePicture] = useState("");
  const [username1, setUsername1] = useState("");
  const [desc, setDesc] = useState("");
  const axiosPrivate = VarificationRequest();


  useEffect(() => {
    const fetchUser = async () => {
      const res = await axiosPrivate.get(`/users?username=${username}`);
      setUser(res?.data)
    };
    fetchUser();
  },[username])

  useEffect(() => {
    const getfriends = async () => {
        try {
         const res = await axiosPrivate.get(`/users/friends/${user?._id}`);
         setFriends(res?.data)
        } catch (error) {
            console.log(error)
        }
    };
    getfriends();
  },[user?._id])


  useEffect(() => {
    setFollowed(currentUser?.result?.followings?.includes(user?._id));
  },[currentUser, user._id])

  const handlFollow = async () => {
    try {
      if (followed) {
        await axiosPrivate.put(`/users/${user._id}/unfollow`, {
          userId: currentUser.result._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axiosPrivate.put(`/users/${user._id}/follow`, {
          userId: currentUser.result._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
      setFollowed(!followed);
    } catch (err) {
      console.log(err)
    }
  };

  const totalfriends = friends.map((friend) => {
    return friend.length
  });

  const handleUpdateMode = () => {
    setUpdateMode(true);
  }

  const handleCancel = () => {
    setUpdateMode(false);
    setUpdateModeReady(false);
    setSelect(false);
  }

  const handleUpdateProfile = () => {
    setUpdateModeReady(true);
    setProfilePicture(user.profilePicture);
    setUsername1(user.username);
    setDesc(user.desc);
  }

  const handleUpdateInfo = () => {
    window.location.replace("/editProfile");
  }

  const handleUpdate = async(e) => {
    e.preventDefault();
    const data= new FormData();
    data.append("file", profilePicture);
    data.append("upload_preset", "upload");
    try {
      const uploadRes = await fetch("//api.cloudinary.com/v1_1/dpyzwx4t8/image/upload", {method: "post", body: data})
      const result = await uploadRes.json();

      const _id = currentUser.result._id;

      const post = {
        _id,
        desc,
        username:username1,
        profilePicture: result.url,
      };

      const res = await axiosPrivate.put(`/users/${currentUser.result._id}`, {...post} );
      dispatch({type: "UPDATE_USER", payload: res.data});

      setTimeout( async ()=>{
        handleCancel();
        window.location.replace("/");
      },[res]);
      
    } catch (err) {
      console.log(err);
    }
  };



  return (
    <>
    <div className="profile">
      <ProfileTopbar  className="forprofiletopbar" sendProps={user}/>
      <div className="profileWrapper">

        <div className="profileTopBar">
          <div className="totalProfile">
            <div className="singlePostEdit">
              {(currentUser?.result?._id === user._id) && <>
                {<> {!updateMode?
                  <button className="editprofilebutton" onClick={handleUpdateMode}>Edit Profile</button>:
                  <button className="editprofilebutton" style={{color: "crimson"}} onClick={handleCancel}>Cancel</button>}
                </>}
                 {updateMode && <div className='multipleTwoButton'>
                    <button className='editprofileMoreButton' onClick={handleUpdateProfile}>Update Profile</button>
                    <button className='editprofileMoreButton' onClick={handleUpdateInfo}>
                      <Link to={`/editProfile`} style={{textDecoration:"none"}}>Update Info</Link>
                    </button>
                 </div>}
              </>}
            </div>
            <img className="profilecover" src={ user.coverPicture || "https://content.artofmanliness.com/uploads/2022/02/no-header.jpg"} alt=""/>
            {updateModeReady && 
              <button className="nowUpdateButton" onClick={ () => {setSelect(true); setProfilePicture(null)}}>
                <label htmlFor='file' className="shareOption">Image: <DriveFolderUploadOutlinedIcon className="icon"/></label>
              </button>
            }
            {select ? (
              <>
              {updateModeReady ?
                <img className="profilePicture" src={profilePicture && select? (URL.createObjectURL(profilePicture)): ("https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg")} alt=""/> :
                <img className="profilePicture" src={select? (URL.createObjectURL(profilePicture)) : ("https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg")} alt=""/>
              }
              <input style={{ display: "none" }} type="file" accept=".png,.jpg,.jpeg,.svg,.webp" id= "file" onChange={(e) => (setProfilePicture(e.target.files[0]) )}/>
              </>
              ):(
              <>
              <img className="profilePicture" src={ user.profilePicture || "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/no-profile-picture-icon.png"} alt=""/>
              </>
              )
            }
          </div>
          <div className="totalProfileInfo">
            {updateModeReady? (<>
              <input type="text" placeholder = "User Name" value={username1} className="InputUsername" onChange={(e) => setUsername1(e.target.value)}/></>) :
              (<h4 className="totalProfileInfoText">{user.username}</h4>)
            }
            {updateModeReady? 
              (<textarea type="text" placeholder = "User Description" value={desc} className="InputDescription" onChange={(e) => setDesc(e.target.value)}/>) :
              (<><span className="totalProfileInfoDesc">{user.desc}</span></>)
            }
            {updateModeReady && (
              <div className="multipleButton1">
              <button className="CancelButton" onClick={ () => {setUpdateModeReady(false); setSelect(false)}}>
                Cancel
              </button>
              <button className="UpdateButton" onClick={handleUpdate}>
                Update
              </button>
              </div>)
            }
          </div>
        </div>
        <div className="profileBottomBar">
          <div className="profileLeft">
            <div className="personalInfo">
              <h3 className="profileInfoPersonal">Personal information</h3>
              <hr/>
              <span className="profilespan"><b>Name</b>: {user.username}</span>
              <span className="profilespan"><b>Date of Birth</b>: {user.date_of_birth}</span>
              <span className="profilespan"><b>Father Name</b>: Md. Ismail</span>
              <span className="profilespan"><b>Mother Name</b>: Luthfunnahar</span>
              <span className="profilespan"><b>Status</b>: {user.relationship}</span>
              <span className="profilespan"><b>Religion</b>: {user.religion}</span>
            </div>
            <div className="addressInfo">
              <h3 className="profileInfoaddress">Address</h3>
              <hr/>
              <span className="profilespan"><b>House Name</b>: {user.home}</span>
              <span className="profilespan"><b>House Number</b>: 534</span>
              <span className="profilespan"><b>Village Name</b>:  {user.village}</span>
              <span className="profilespan"><b>Word Number</b>: 01</span>
              <span className="profilespan"><b>Union Name</b>: 05 No. Chaprashirhat</span>
              <span className="profilespan"><b>Post No</b>: {user.post_code}</span>
              <span className="profilespan"><b>City</b>: {user.city}</span>
              <span className="profilespan"><b>Thana</b>: Kabirhat</span>
              <span className="profilespan"><b>Country</b>: {user.country}</span>
            </div>
            <div className="EducationInfo">
              <h3 className="Education">Education</h3>
              <hr/>
              <span className="profilespan"><b>Primary</b>: Kabirhat K.G School.</span>
              <span className="profilespan"><b>Secondary</b>: {user.secondary_study}</span>
              <span className="profilespan"><b>Higher</b>: {user.higher_study}</span>
              <span className="profilespan"><b>Research</b>: Number Plate Recognition(NPR).</span>
              <span className="profilespan"><b>Future</b>: Web Developer</span>
            </div>
          </div>
          <div className="profileCenter">
            <ProfileFeed username={username}/>
          </div>
          <div className="profileRight">
            <div className="generalInfo">
              <div className="followUnfollow">
                <h3 className="general">General information</h3>
                {user?.username !== currentUser?.result?.username && (
                  <button className="rightbarFollowButton" onClick={handlFollow}>
                  {followed ? "Unfollow" : "Follow"}
                  {followed ? <Remove style={{color:"red"}}/> : <Add style={{color:"seagreen"}}/>}
                  </button>)
                }
              </div>
              <hr/>
              <span className="profilespan"><b>Friends</b>: {totalfriends.length} persons</span>
              <div className="userFriends">
                {friends.map((friend) => (
                <Link style={{textDecoration:"none"}} key={friend._id} to={"/profile/" + friend.username}>
                <div className="userFriend">
                  <img className="userFriendsImg" src={friend.profilePicture ? friend.profilePicture : "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/no-profile-picture-icon.png"} alt="123.jph"/>
                  <span className="userFriendsName">{friend.username}</span>
                </div>
                </Link>))
                }
              </div>
              <span className="profilespan"><b>Followers</b>: </span>
              <span className="profilespan"><b>Followings</b>: {totalfriends.length}</span>
              <span className="profilespan"><b>Idol</b>: {user.idol}</span>
              <span className="profilespan"><b>Destination</b>: Daffodil International University</span>
            </div>
            <div className="jobInfo">
              <h3 className="job">Job</h3>
              <hr/>
              <span className="profilespan"><b>Job Title</b>: Web Developer</span>
              <span className="profilespan"><b>Institution</b>: {user.job_institution}</span>
              <span className="profilespan"><b>Designation</b>: CEO</span>
              <span className="profilespan"><b>Location</b>: {user.job_location}</span>
              <span className="profilespan"><b>Year</b>: 05/09/2007 - Now</span>
            </div>
          </div>
        </div>
        <div className="profileCenter123">
          <ProfileFeed username={username}/>
        </div>
      </div>
    </div>
    </>
  )
}

export default Profile;