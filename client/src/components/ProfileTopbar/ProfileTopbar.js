import React, {useContext, useEffect, useState} from 'react';
import { connect } from 'react-redux';
import './profileTopbar.css';
import {Search, Person, Chat, Notifications} from '@material-ui/icons';
import {Link, useNavigate, useLocation} from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext/AuthContext';
import VarificationRequest from '../../VarificationRequest/VarificationRequest.js'


const Topbar = ({sendProps}) => {
    const { user, dispatch } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const axiosPrivate = VarificationRequest();
    const [followed, setFollowed] = useState();
    const [searchValue, setSearchValue] = useState("")
    const [searchData, setSearchData] = useState([]);

    console.log(user)
    console.log(sendProps)



    const logout = () => {
        dispatch({type: "LOGOUT", payload: null});
        localStorage.removeItem("user")
        localStorage.clear("user");
        navigate('/');
        window.location.reload();
    };


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
    <div className="topbarContainers">

        <div className="topbarLefts">
            <Link to="/" style={{textDecoration: "none", color: "white"}}>
                <span className='topbarLinks'>Home</span>
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

                                <div className='other'>
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

        <div className="topbarRights">
            {/* <div className="topbarLinks">
                <Link to="/" style={{textDecoration: "none", color: "black"}}>
                    <span className='topbarLink1'>Homepage</span>
                </Link>
                <span className='topbarLink2'>Timeline</span>
            </div> */}
            <div className='topbarIconss'>
                <div className='topbarIconItemss'>
                    <Person className='iiicconss'/>
                    <span className="topbarIconBadges">2</span>
                </div>
                <div className='topbarIconItems'>
                    <Link to="/messenger">
                    <Chat className='iiiccons' style={{color: "white"}}/>
                    </Link>
                    <span className="topbarIconBadges">5</span>
                </div>
                <div className='topbarIconItems'>
                    <Notifications className='iiiccons'/>
                    <span className="topbarIconBadges">7</span>
                </div>
            </div>
        </div>
        {
            sendProps &&         
            <button className="logoutButtons" onClick={logout}>
            <img 
                className="logoutbtnpics" 
                src="https://icon-library.com/images/logout-icon-png/logout-icon-png-26.jpg" 
                alt=''
            />
            </button>
        }
    </div>
  )
};

export default Topbar;
