import React from "react";
import { Search } from "./Search";
import Chat from "./Chat";
import useGetAllRooms from "../../hooks/useGetAllRooms";
import CircularProgress from "@mui/material/CircularProgress"
import toast, { Toaster } from "react-hot-toast";
import roomContext from "../../context/roomContext";

const Chats = () => {

  const {rooms, isLoading, error} = useGetAllRooms();

  toast.error(error);

  return (
    <div className="flex flex-col mt-3 ms-3 p-2 w-4/12 ">
      {error && <Toaster />}
      <Search />
      <div className="mt-2 overflow-auto">
        {isLoading && <CircularProgress />}
        {rooms.length > 0 ? (
          rooms.map((room) => <Chat key={room._id} room={room} />)
        ) : (
          <p>No rooms available.</p>
        )}
      </div>
    </div>
  );
};

export default Chats;
