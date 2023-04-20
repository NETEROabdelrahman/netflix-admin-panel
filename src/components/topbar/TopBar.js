import React, { useState } from "react";
import "./topbar.css";
import { NotificationsNone, Language, Settings } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Topbar() {
  const user = useSelector(store => store.users.users)
  const navigate = useNavigate()

  const handleClick = (e) => {
    e.preventDefault();
    localStorage.removeItem("user")
    window.location.reload()
    navigate('/login')
  }
  
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">admin panel</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <button type="button" className="logoutBtn" onClick={handleClick}>logout</button>
          </div>
          <img src={user.profilePic} alt="" className="topAvatar" />
        </div>
      </div>
    </div>
  );
}