import { useState, useCallback } from "react";
import roomContext from "../context/roomContext";
import axios from "axios";

const useSendMessage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorSend, setErrorSend] = useState(null);
  const messages = roomContext((state) => state.messages);
  const setMessages = roomContext((state) => state.setMessages);
  const selectedRoom = roomContext((state) => state.selectedRoom);
  const setNewMessage = roomContext((state) => state.setNewMessage);

  const sendMessage = useCallback(async (message) => {
    setIsLoading(true);
    try {
      const roomId = selectedRoom._id;
      const response = await axios.post("/api/messages/send/" + roomId, { message });
      setIsLoading(false);
      if (response.data.error) {
        throw new Error(response.data.error);
      }
      setNewMessage(response.data);
    } catch (error) {
      setErrorSend(error.response?.data?.error);
    } finally {
      setIsLoading(false);
    }
  }, [selectedRoom._id, setNewMessage]);

  return { sendMessage, isLoading, errorSend };
};

export default useSendMessage;
