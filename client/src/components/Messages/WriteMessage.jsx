import React, { useState } from "react";
import { MdOutlineAttachFile } from "react-icons/md";
import { BsEmojiSmile } from "react-icons/bs";
import { FiSend } from "react-icons/fi";
import useSendMessage from "../../hooks/useSendMessage";
import { CircularProgress } from "@mui/material";
import { z } from "zod";

const WriteMessage = () => {
  const { isLoading, errorSend, sendMessage } = useSendMessage();
  const [message, setMessage] = useState("");

  const sendMessageHandle = async () => {
    if (!message) return;
    await sendMessage(message);
    setMessage("");
    console.log(errorSend);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessageHandle();
    }
  };

  return (
    <div>
      <label className="input input-ghost bg-purple flex items-center gap-2">
        <MdOutlineAttachFile className="size-6 rotate-45 cursor-pointer" />
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full"
          placeholder="Type here..."
        />
        <BsEmojiSmile className="size-6 ms-auto cursor-pointer" />
        {isLoading ? (
          <CircularProgress size={"20px"} />
        ) : (
          <FiSend
            onClick={sendMessageHandle} 
            className="size-6 ms-1 cursor-pointer"
          />
        )}
      </label>
    </div>
  );
};

export default WriteMessage;
