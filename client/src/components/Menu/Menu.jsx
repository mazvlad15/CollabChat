import React, { useState } from "react";
import { IoMdHome } from "react-icons/io";
import { FaPlus, FaUser } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import CreateChat from "../Menu/pages/CreateChat"; // Importă corect componenta CreateChat
import useLogout from "../../hooks/useLogout";
import { CircularProgress } from "@mui/material";
import authContext from "../../context/authContext";
import roomContext from "../../context/roomContext";

const Menu = () => {
  const { logout, isLoading, isError, error } = useLogout();

  const setSelectedRoom = roomContext((state) => state.setSelectedRoom);

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex justify-between flex-col overflow-auto">
      <ul className="menu flex">
        <li className="mt-3">
          <a>
            <img src="./CollabChat_logo.png" alt="logo" className="size-10 " />
          </a>
        </li>
      </ul>
      <ul className="menu rounded-box">
        <li className="gap-5">
          <a>
            <IoMdHome onClick={() => {setSelectedRoom(null)}} className="size-10 " />
          </a>
          <a onClick={() => document.getElementById("createChat").showModal()}>
            <FaPlus className="size-10 " />
          </a>
        </li>
        <div className="divider my-5"></div>
      </ul>
      <ul className="menu">
        <li>
          <a>
            {isLoading ? (
              <CircularProgress />
            ) : (
              <CiLogout className="size-10 " onClick={handleLogout} />
            )}
          </a>
        </li>
      </ul>

      <CreateChat closeModal={() => document.getElementById("createChat").closeModal} />
    </div>
  );
};

export default Menu;
