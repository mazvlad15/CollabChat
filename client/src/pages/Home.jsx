import React, { useEffect } from "react";
import Menu from "../components/Menu/Menu";
import Chats from "../components/Chats/Chats";
import { Messages } from "../components/Messages/Messages";
import WelcomePage from "../components/Menu/pages/WelcomePage";
import Profile from "../components/Menu/pages/Profile";
import roomContext from "../context/roomContext";

const Home = () => {

  const selectedRoom = roomContext((state) => state.selectedRoom);
  const setSelectedRoom = roomContext((state) => state.setSelectedRoom);

  useEffect(() => {
    return () => setSelectedRoom(null);
  }, [setSelectedRoom])

  return (
    <div className="flex items-center justify-center h-full p-10">
      <div className="h-full w-full bg-primary rounded-3xl grid grid-cols-12 grid-rows-1 p-1">
        <Menu className="col-span-1" />
        <div className="flex  bg-white rounded-3xl gap-5 col-span-11">
          <Chats />
          {!selectedRoom ? <WelcomePage /> : <Messages />}
          {/* <Profile /> */}
        </div>
      </div>
    </div>
  );
};

export default Home;
