import { useEffect } from "react";
import roomContext from "../context/roomContext";
import { useSocketContext } from "../context/socketContext";

const useReceiveMessage = () => {
  const socket = useSocketContext().socket;
  const messages = roomContext((state) => state.messages);
  const setMessages = roomContext((state) => state.setMessages);
  const selectedRoom = roomContext((state) => state.selectedRoom);

  // useEffect(() => {
  //   if (socket && selectedRoom?._id) {
  //     socket.on("newMessage", (message) => {
  //       if (message.roomId === selectedRoom._id) {
  //         setMessages((prevMessages) => [...prevMessages, message]);
  //       }
  //     });

  //     return () => socket.off("newMessage");
  //   }
  // }, [socket, selectedRoom?._id, setMessages]);
};

export default useReceiveMessage;
