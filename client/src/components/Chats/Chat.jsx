import React from "react";

const Chat = ({room}) => {
  return (
    <div>
      <div
        className={`flex items-center hover:bg-background rounded cursor-pointer p-2`}
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
