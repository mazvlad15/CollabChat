import React from "react";
import { MdOutlineAttachFile } from "react-icons/md";
import { BsEmojiSmile } from "react-icons/bs";
import { FiSend } from "react-icons/fi";

const WriteMessage = () => {
  return (
    <div>
      <label className="input input-ghost bg-purple flex items-center gap-2">
        <MdOutlineAttachFile className="size-6 rotate-45 cursor-pointer"/>
        <input type="text" className="w-full" placeholder="Type here..." />
        <BsEmojiSmile className="size-6 ms-auto cursor-pointer" />
        <FiSend className="size-6 ms-1 cursor-pointer"/>
      </label>
    </div>
  );
};

export default WriteMessage;
