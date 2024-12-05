import React, { useEffect } from "react";
import roomContext from "../../context/roomContext";
import { useSocketContext } from "../../context/socketContext";
import useReceiveMessage from "../../hooks/useReceiveMessage";

const Chat = ({ room }) => {
  const setSelectedRoom = roomContext((state) => state.setSelectedRoom);
  const selectedRoom = roomContext((state) => state.selectedRoom);
  const messages = roomContext((state) => state.messages);
  const setMessages = roomContext((state) => state.setMessages);
  const { socket } = useSocketContext();

  const isSelected = selectedRoom?._id === room._id;

  // Folosește `useReceiveMessage` pentru a asculta mesajele noi
  useReceiveMessage();

  const handleClick = () => {
    setSelectedRoom(room);

    // Asigură-te că mesageria este actualizată
    socket.emit("getMessages", { roomId: room._id });
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
            <p className="ms-auto">12:40</p>
          </div>
          <p className="">Last message</p>
        </div>
      </div>
    </div>
  );
};

export default Chat;
