import React from "react";
import { CiLogout } from "react-icons/ci";
import { Link } from "react-router-dom";
import UsersOnlineModal from "./UsersModal";

const Header = () => {
  const showModalBtn = () => {
    document.getElementById("my_modal_2").showModal();
  };

  return (
    <div className="flex items-center mb-4">
      <div className="flex flex-col">
        <h2 className="text-4xl font-semibold">Design Chat</h2>
        <button onClick={showModalBtn} className="flex focus:outline-none">
          23 members,<p className="text-green-500"> 10 online </p>
        </button>
      </div>
      <CiLogout className="ms-auto size-7 cursor-pointer" />
      <UsersOnlineModal />
    </div>
  );
};

export default Header;
