import React from "react";
import roomContext from "../../context/roomContext";

const Chat = ({room}) => {

  const setSelectedRoom = roomContext((state) => state.setSelectedRoom);
  const selectedRoom = roomContext((state) => state.selectedRoom);
  const isSelected = selectedRoom?._id === room._id;

  return (
    <div onClick={() => setSelectedRoom(room)}>
      <div
        className={`flex items-center ${isSelected && "bg-background"}  hover:bg-background rounded cursor-pointer p-2`}
      >
        <div className='avatar flex'>
          <div className="w-14 rounded ">
            <img src={room?.roomPicture} />
          </div>
        </div>
        <div className="ms-2 w-full hidden lg:block md:block">
          <div className="flex">
            <h3 className="font-bold">{room?.name}</h3>
            <p className="ms-auto ">12:40</p>
          </div>
            <p className="">message</p>
        </div>
      </div>
    </div>
  );
};

export default Chat;
