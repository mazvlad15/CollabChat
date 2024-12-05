import { useState } from "react";
import roomContext from "../context/roomContext";
import axios from "axios";

const useAddUserInRoom = () => {
  const [errorToAdd, setErrorToAdd] = useState(null);
  const selectedRoom = roomContext((state) => state.selectedRoom);

  const addUser = async (participantId) => {
    try {
      const response = await axios.patch(
        "/api/rooms/addParticipant/" + selectedRoom._id,
        { participantId }
      );
      if(response.data.error){
        throw new Error(response.data.error);
      }
      return response.data.message;
    } catch (error) {
      setErrorToAdd(error.response?.data?.error);
    }
  };

  return {errorToAdd, addUser, setErrorToAdd};
};

export default useAddUserInRoom;
