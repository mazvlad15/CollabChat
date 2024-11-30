import React from "react";
import { IoMdHome } from "react-icons/io";
import { FaUsers } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import CreateChat from "./pages/CreateChat";
import useLogout from "../../hooks/useLogout";
import { CircularProgress } from "@mui/material";

const createChatBtn = () => {
  document.getElementById("createChat").showModal();
};

const Menu = () => {
  const { logout, isLoading, isError, error } = useLogout();

  const logoutBtn = () => {
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
      <ul className="menu rounded-box ">
        <li className="gap-5">
          <a>
            <IoMdHome className="size-10 " />
          </a>
          <a>
            <FaPlus className="size-10 " onClick={createChatBtn} />
          </a>
        </li>
        <div className="divider my-5"></div>
        <li>
          <a>
            <FaUser className="size-10 " />
          </a>
        </li>
      </ul>
      <ul className="menu">
        <CreateChat />
        <li>
          <a>
            {isLoading ? (
              <CircularProgress />
            ) : (
              <CiLogout className="size-10  " onClick={logoutBtn} />
            )}
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
