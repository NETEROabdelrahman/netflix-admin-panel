import {
    CalendarToday,
    LocationSearching,
    MailOutline,
    PermIdentity,
    PhoneAndroid,
    Publish,
  } from "@mui/icons-material";
  import { Link, useLocation } from "react-router-dom";
  import "./user.css";
import {  useState } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../../reducers/usersSlice";
  
export default function User() {
  const location = useLocation();
  const user = location.state.user;
 
  const dispatch = useDispatch()

  const id = user._id

  const [username,setUsername] = useState(user.username)
  const [email,setEmail] = useState(user.email)
  const [password,setPassword] = useState("")
  const [isAdmin,setIsAdmin] = useState(user.isAdmin)
  const [profilePic,setProfilePic] = useState(user.profilePic)


  const handleClick = (_id) => {
    dispatch(updateUser({_id,username,email,isAdmin,profilePic,password}))
  }

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
        <Link to="/newUser">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src={user.profilePic}
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{user.username}</span>
              <span className="userShowUserTitle">Software Engineer</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">{user.username}</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{user.username}</span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">10.12.1999</span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">+1 123 456 67</span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{user.email}</span>
            </div>
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">New York | USA</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  type="text"
                  placeholder={username}
                  className="userUpdateInput"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
                
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  placeholder={email}
                  className="userUpdateInput"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="userUpdateItem">
                <label>password</label>
                <input
                  type="text"
                  placeholder={password}
                  className="userUpdateInput"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="userUpdateItem">
                <label>is admin</label>
                <select
                  value={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.value)}
                >
                  <option value="true">true</option>
                  <option value="false">false</option>
                </select>
              </div>
                
            </div>
            <div className="userUpdateItem">
              <label htmlFor="file">
                profile picture
              </label>
              <div className="userUpdateUpload">
                <input
                  type="text"
                  placeholder={profilePic}
                  className="userUpdateInput"
                  value={profilePic}
                  onChange={(e) => setProfilePic(e.target.value)}
                  id="file"
                  
                />
                <img
                  className="userUpdateImg"
                  src={profilePic}
                  alt=""
                  value={profilePic}
                  onChange={(e) => setProfilePic(e.target.value)}
                />
              </div>
              <button className="userUpdateButton" type="button" onClick={()=>handleClick(user._id)}>Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
  }