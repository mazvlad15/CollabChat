import React from "react";
import authContext from "../../context/authContext";
import timeFormat from "../../utils/timeFormated";

const Message = ({message}) => {

  const authState = authContext((state) => state.authState)

  const isMe = message.senderId._id === authState._id;
  const name = isMe ? authState.fullName : message.senderId.fullName
  const profilePic = isMe ? authState.profilePicture : message.senderId.profilePicture;
  const chatClass = isMe ? "chat-end" : "chat-start";
  const background = isMe ? "bg-background text-primary" : "bg-primary"
  const sendTime = timeFormat(message);

  return (
    <div>
      <div className={`chat ${chatClass}`}>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src={profilePic}
            />
          </div>
        </div>
        <div className="chat-header">
          {name}
        </div>
        <div className={`chat-bubble ${background}`}>{message.message}</div>
        <time className="chat-footer opacity-50">{sendTime}</time>
      </div>
    </div>
  );
};

export default Message;
