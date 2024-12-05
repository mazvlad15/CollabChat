import React, { useState } from "react";
import { CiLogout } from "react-icons/ci";
import UsersOnlineModal from "./UsersModal";
import roomContext from "../../context/roomContext";
import { GoPlus } from "react-icons/go";
import AddUserModal from "../User/AddUserModal";
import useGetUsersInRoom from "../../hooks/useGetUsersInRoom";
import authContext from "../../context/authContext";
import { useSocketContext } from "../../context/socketContext";

const Header = () => {
  const showModalBtn = () => {
    document.getElementById("my_modal_2").showModal();
  };

  const { users } = useGetUsersInRoom();
  const selectedRoom = roomContext((state) => state.selectedRoom);
  const authState = authContext((state) => state.authState);
  const { onlineUsers } = useSocketContext();
  const isCreator = selectedRoom.creatorId === authState._id;

  return (
    <div className="flex items-center mb-4">
      <div className="flex flex-col">
        <h2 className="text-4xl font-semibold">{selectedRoom.name}</h2>
        <button onClick={showModalBtn} className="flex focus:outline-none">
          {selectedRoom.participants.length} members,
          <p className="text-green-500"> {onlineUsers.length} online </p>
        </button>
      </div>
      <div className="ms-auto flex gap-2">
        {isCreator && (
          <GoPlus
            onClick={() => document.getElementById("addUserModal").showModal()}
            className="size-7 cursor-pointer"
          />
        )}
        <CiLogout className="size-7 cursor-pointer" />
      </div>
      <UsersOnlineModal />
      <AddUserModal
        participants={users}
        closeModal={() => document.getElementById("addUserModal").close()}
      />
    </div>
  );
};

export default Header;
