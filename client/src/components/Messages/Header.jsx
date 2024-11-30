import React from "react";
import { CiLogout } from "react-icons/ci";
import UsersOnlineModal from "./UsersModal";
import roomContext from "../../context/roomContext";
import { GoPlus } from "react-icons/go";

const Header = () => {
  const showModalBtn = () => {
    document.getElementById("my_modal_2").showModal();
  };

  const selectedRoom = roomContext((state) => state.selectedRoom);

  return (
    <div className="flex items-center mb-4">
      <div className="flex flex-col">
        <h2 className="text-4xl font-semibold">{selectedRoom.name}</h2>
        <button onClick={showModalBtn} className="flex focus:outline-none">
          {selectedRoom.participants.length} members,
          <p className="text-green-500"> 10 online </p>
        </button>
      </div>
      <div className="ms-auto flex gap-2">
        <GoPlus className="size-7 cursor-pointer" />
        <CiLogout className="size-7 cursor-pointer" />
      </div>
      <UsersOnlineModal />
    </div>
  );
};

export default Header;
