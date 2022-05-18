import React,{useState} from "react";
import "./Join.css";
import { Link } from "react-router-dom";
import logo from "../../images/logo.png";

let user;

const Join = () => {
    const  sendUser = ()=>{
        user = document.getElementById('joinInput').value
        document.getElementById('joinInput').value = ''
    }
    const [name, setName] = useState('')

  return (
    <div className="JoinPage">
      <div className="JoinContainer">
        <img src={logo} alt="logo" />
        <h1>Chat</h1>
        <input onChange={(e)=>setName(e.target.value)} type="text" id="joinInput" placeholder="Enter Your Name" autoComplete="off" />
        <Link onClick={(e) => !name ? e.preventDefault() : null } to="/chat">
          <button onClick={sendUser} className="joinBtn">
            Log In
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Join;
export {user}

