import React, {  useState } from "react";
import "./login.css";
import {useDispatch} from 'react-redux'
import { login } from "../../reducers/usersSlice";

export default function Login() {
    
    const dispatch = useDispatch()
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [dis, setDis] = useState(true);

  const handleLogin = (e) => {
    e.preventDefault();
    setInterval(() => {
      setDis(false)
    },2000)
      dispatch(login({ username, password }))
  };

  return (
      <div className="login">
          
      <form className="loginForm">
        <input
          type="text"
          placeholder="username"
          className="loginInput"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          className="loginInput"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="loginButton"
          onClick={handleLogin}
          style={!dis?{display:"none"}:{display:"block"}}
        >
          Login
        </button>
        <button className="loginButton " style={dis?{display:"none"}:{display:"block"}}>
        <a className=" link" href='/' >home</a>
        </button>
      </form>
    </div>
  );
}