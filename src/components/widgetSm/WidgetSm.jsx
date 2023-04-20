import { useEffect, useState } from "react";
import "./widgetsm.css";
import { Visibility } from "@mui/icons-material";
import axios from "axios";
import { MY_URL } from "../../pages/home/Home";
export default function WidgetSm() {
  const [users, setUsers] = useState([])
  
  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get(`${MY_URL}/users?new=true`, {
          headers: {
            token: `bearer ${JSON.parse(localStorage.getItem("user")).token}`
          }
        });
       
        setUsers(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getUsers()
  },[])
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {users.map((user) => (
          <li key={user._id} className="widgetSmListItem">
            <img
              src={
                user.profilePic ||
                "https://pbs.twimg.com/media/D8tCa48VsAA4lxn.jpg"
              }
              alt=""
              className="widgetSmImg"
            />
            <div className="widgetSmUser">
              <span className="widgetSmUsername">{user.username}</span>
            </div>
            <button className="widgetSmButton">
              <Visibility className="widgetSmIcon" />
              Display
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}