import React from "react";
import roomContext from "../../context/roomContext";


export const User = ({ user, onClick, selectedUser }) => {
  const selectedRoom = roomContext((state) => state.selectedRoom);

  return (
    <div
      onClick={() => {
        onClick(user._id);
      }}
    >
      <div
        className={`flex items-center ${
          selectedUser && "bg-purple"
        } hover:bg-background rounded cursor-pointer p-2`}
      >
        <div className={`avatar flex`}>
          <div className="w-14 rounded ">
            <img src={user?.profilePicture || ""} />
          </div>
        </div>
        <div className="ms-2 flex flex-col w-full">
          <div className="flex items-center">
            <div className="">
              <p className="font-bold">{user?.fullName || ""}</p>
              {selectedRoom && selectedRoom.creatorId === user._id && (
                <p className="text-xs text-red-500">Owner</p>
              )}
            </div>
            <div className="bg-green-500 rounded-full size-3 ms-auto"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
