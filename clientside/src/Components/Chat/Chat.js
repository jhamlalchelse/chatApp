import React, { useEffect, useState } from "react";
import "./Chat.css";
import SocketIO from "socket.io-client";
import { user } from "../Join/Join";
import closeIcon from "../../images/closeIcon.png";
import Message from "../Message/Message";
import ReactScrollToBottom from 'react-scroll-to-bottom'

let socket;
const ENDPOINT = "https://chatappwithjham.herokuapp.com/";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [id, setid] = useState("");
  const send = () => {
    const message = document.getElementById("chatInput").value;
    document.getElementById("chatInput").value = " ";
    socket.emit("message", { message, id });
  };

  useEffect(() => {
    socket = SocketIO(ENDPOINT, { transports: ["websocket"] });
    socket.on("connect", () => {
      setid(socket.id);
        // alert("Connected");
    });
    socket.emit("joined", { user });

    socket.on("welcome", (data) => {
      setMessages([...messages, data])
      console.log(
        `${data.user}  ${data.message}`
      );
    });
    // socket.on('userjoined', (data) => {
    //   setMessages([...messages, data])
    //   console.log(` ${data.user}  ${data.message}`);
    // });
    
    // socket.on('leaveuser', (data) => {
    //   console.log(`${data.message}`);
    // });
  }, []);

  useEffect(() => {
    socket.on("sendMsg", (data) => {
      setMessages([...messages, data])
      console.log(data.user, data.message, data.id);
    });
    return () => {
      socket.off()
    }
  }, [messages]);

  return (
    <>
      <div className="chatPage">
        <div className="chatContainer">
          <div className="header">
            <h2>C Chat</h2>
            <a href="/">
              <img src={closeIcon} alt="CloseIcon" />
            </a>
          </div>
          <ReactScrollToBottom className="chatBox">

            {messages.map((item, ind) => {
              return(
              <Message user={item.id===id? '' : item.user} message={item.message} classs={item.id===id?"right":"left"} key={ind}/>
              )
            })}
          </ReactScrollToBottom>
          <div className="inputBox">
            <input onKeyPress={(e)=> e.key==="Enter" ? send() : null} type="text" id="chatInput" />
            <button onClick={send} className="sendBtn">
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
