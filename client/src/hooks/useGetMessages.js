import { useEffect, useState, useMemo } from "react";
import roomContext from "../context/roomContext";
import axios from "axios";
import { useSocketContext } from "../context/socketContext";

const useGetAllMessages = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorGetMessages, setErrorGetMessages] = useState(null);
  const selectedRoom = roomContext((state) => state.selectedRoom);
  const messages = roomContext((state) => state.messages);
  const setNewMessage = roomContext((state) => state.setNewMessage);
  const setMessages = roomContext((state) => state.setMessages);
  const { socket } = useSocketContext();

  useEffect(() => {
    const getAllMessages = async () => {
      setIsLoading(true);
      try {
        const roomId = selectedRoom._id;
        const response = await axios.get("/api/rooms/roomMessages/" + roomId);
        setMessages(response.data);
      } catch (error) {
        setErrorGetMessages(error.response?.data?.error);
        setMessages([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (selectedRoom?._id) getAllMessages();

    if (socket) {
      socket.off("sendMessage").on("sendMessage", (newMessage) => {
        setNewMessage(newMessage);
      });
    }

    return () => {
      if (socket) {
        socket.off("sendMessage");
      }
    };
  }, [selectedRoom._id, socket]);

  const memoizedMessages = useMemo(() => messages, [messages]);

  return { isLoading, errorGetMessages, messages: memoizedMessages };
};

export default useGetAllMessages;
