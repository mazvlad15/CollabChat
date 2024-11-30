import { useEffect, useState } from "react";
import roomContext from "../context/roomContext";
import axios from "axios";

const useGetAllMessages = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorGetMessages, setErrorGetMessages] = useState(null);
  const selectedRoom = roomContext((state) => state.selectedRoom);
  const messages = roomContext((state) => state.messages);
  const setMessages = roomContext((state) => state.setMessages);

  useEffect(() => {
    const getAllMessages = async () => {
      setIsLoading(true);
      try {
        const roomId = selectedRoom._id;
        const response = await axios.get("/api/rooms/roomMessages/" + roomId);
        setIsLoading(false);
        if (response.data.error) {
          throw new Error(response.data.error);
        }

        setMessages(response.data);
      } catch (error) {
        setErrorGetMessages(error.response?.data?.error);
      } finally {
        setIsLoading(false);
      }
    };

    if(selectedRoom?._id) getAllMessages();
  }, [selectedRoom._id, setMessages]);
  return {isLoading, errorGetMessages, messages};

};

export default useGetAllMessages;
