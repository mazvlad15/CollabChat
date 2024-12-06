import React, { useEffect } from "react";
import roomContext from "../../context/roomContext";
import { useSocketContext } from "../../context/socketContext";
import useReceiveMessage from "../../hooks/useReceiveMessage";
import timeFormat from "../../utils/timeFormated";

const Chat = ({ room }) => {
  const setSelectedRoom = roomContext((state) => state.setSelectedRoom);
  const selectedRoom = roomContext((state) => state.selectedRoom);
  const messages = roomContext((state) => state.messages);

  const isSelected = selectedRoom?._id === room._id;

  const handleClick = () => {
    setSelectedRoom(room);
  };

  return (
    <div onClick={handleClick}>
      <div
        className={`flex items-center ${isSelected && "bg-background"} hover:bg-background rounded cursor-pointer p-2`}
      >
        <div className="avatar flex">
          <div className="w-14 rounded">
            <img src={room?.roomPicture} alt="room" />
          </div>
        </div>
        <div className="ms-2 w-full hidden lg:block md:block">
          <div className="flex">
            <h3 className="font-bold">{room?.name}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
