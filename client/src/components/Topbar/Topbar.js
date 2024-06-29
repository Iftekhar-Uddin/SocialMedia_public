import React, {useContext, useEffect, useState} from 'react';
import {Search, Person, Chat, Notifications} from '@material-ui/icons';
import './topbar.css';
import {Link} from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext/AuthContext';
import VarificationRequest from '../../VarificationRequest/VarificationRequest.js'


const Topbar = () => {
  const { user, dispatch } = useContext(AuthContext);
  const axiosPrivate = VarificationRequest();
  const [followed, setFollowed] = useState();
  const [searchValue, setSearchValue] = useState("")
  const [searchData, setSearchData] = useState([]);


  const handleSearch = async (e) =>{
        if(searchValue){

            try {
                const res = await axiosPrivate.get(`users/searching?username=${searchValue}`);
                  setSearchData(res?.data?.peoples)
                // dispatch({ type: "FETCH_ALL", payload: res.data});
            } catch (error) {
                console.log(error)
            }
        }
    };

  useEffect(() => {
    handleSearch()
  },[searchValue]);


  const handlefollowing = async (e, _id)=>{

    try {
        if (user?.result?.followings?.includes(_id)) {
          await axiosPrivate.put(`/users/${_id}/unfollow`, {
            userId: user.result._id,
          });
          dispatch({ type: "UNFOLLOW", payload: _id });
        } else {
          await axiosPrivate.put(`/users/${_id}/follow`, {
            userId: user.result._id,
          });
          dispatch({ type: "FOLLOW", payload: _id });
        }
        // setFollowed(!followed);
    } catch (err) {
        console.log(err)
    }

  }


  return (
    <div className="topbarContainer">

        <div className="topbarLeft">
            <Link to='/' style={{textDecoration:"none"}}>
            <span className='logo'>Social Media</span>
            </Link>
        </div>

        <div className="topbarCenter">
            <div className='searchBar'>
                <input className="searchInput" placeholder='Search friends' onChange={(e)=> setSearchValue(e.target.value)}/>
                <div className='iceondiv' onClick={handleSearch}><Search className="searchIcon"/></div>
            </div>
            {searchValue &&
                <div className='peopleDiv'>
                    <div className='peoplelist'>
                        {
                            searchData?.map((data)=> (

                                <div className='other' key={data?._id}>
                                    <div className='peoples'>
                                        <img className='imgpeople' src={data.profilePicture} alt=''/>
                                        <div className='friendsorview'>
                                            <h3>{data.username}</h3>
                                            <div className='buttons'>
                                                {/* {
                                                    setFollowed(user?.result?.followings?.includes(data?._id))
                                                } */}
                                                <button className='addbtn' onClick={ (e)=> handlefollowing(e, data?._id)}>{user?.result?.followings?.includes(data?._id) ? "Remove Friend" : "Add Friend"}</button>
                                                <Link to={`/profile/${data?.username}`} className='viewbtn'>View Profile</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            ))
                        }

                    </div>
                </div>
            
            }
        </div>



        <div className="topbarRight">
            {/* <div className="topbarLinks">
                <Link to="/" style={{textDecoration: "none", color: "white"}}>
                    <span className='topbarLink1'>Homepage</span>
                </Link>
                <span className='topbarLink23'>Timeline</span>
            </div> */}
            <div className='topbarIcons'>
                <div className='topbarIconItems'>
                    <Person className='iiiccons'/>
                    <span className="topbarIconBadge">2</span>
                </div>
                <div className='topbarIconItems'>
                    <Link to={'/messenger'}>
                        <Chat style={{color: "white"}} className='iiiccons'/>
                    </Link>
                    <span className="topbarIconBadge">5</span>
                </div>
                <div className='topbarIconItems'>
                    <Notifications className='iiiccons'/>
                    <span className="topbarIconBadge">7</span>
                </div>
            </div>
            <div>
                <Link className="linkoftopbar" to={`/profile/${user?.result?.username}`}>
                    <img className="topbarImg" 
                    src={user?.result?.profilePicture || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp6_RVjqsnYl8AV72tFiEdyimGkQyRkcjMyyTG-bYcow&s"} 
                    alt=""    
                    />
                </Link>
            </div>
        </div>
    </div>
  )
};

export default Topbar;
