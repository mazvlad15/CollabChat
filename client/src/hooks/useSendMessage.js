import { useState } from "react"
import authContext from "../context/authContext";
import roomContext from "../context/roomContext";
import axios from "axios";


const useSendMessage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [errorSend, setErrorSend] = useState(null);
    const messages = roomContext((state) => state.messages);
    const setMessages = roomContext((state) => state.setMessages);
    const selectedRoom = roomContext((state) => state.selectedRoom);

    const sendMessage = async (message) => {
        setIsLoading(true);
        try {
            const roomId = selectedRoom._id;
            const response = await axios.post("/api/messages/send/" + roomId, {message});
            setIsLoading(false);
            if(response.data.error){
                throw new Error(response.data.error);
            }
            setMessages([...messages, response.data]);
        } catch (error) {
            setErrorSend(error.response?.data?.error);
        }finally{
            setIsLoading(false);
        }
    }

    return {sendMessage, isLoading, errorSend}
}

export default useSendMessage;