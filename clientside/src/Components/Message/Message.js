import React from 'react'
import './Message.css'

const Message = ({user,message,classs}) => {
  if(user){
      if(user==="Admin"){
        return (
            <div className={`messageBox center`}>
                <p>{`${user}: ${message}`}</p>
            </div>
          )
      } else{
        return (
            <div className={`messageBox ${classs}`}>
                <p>{`${user}: ${message}`}</p>
            </div>
          )
      }
  } else{
    return (
        <div className={`messageBox ${classs}`}>
            <p>{`You: ${message}`}</p>
        </div>
      )
  }
}

export default Message