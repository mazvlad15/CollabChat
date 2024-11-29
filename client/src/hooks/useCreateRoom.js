import { useState } from "react";
import authContext from "../context/authContext";
import axios from "axios";

const useCreateRoom = () => {
  const [isLoadingCreateRoom, setIsLoading] = useState(false);
  const [errorCreate, setErrorCreate] = useState(null);

  const createRoom = async (roomData) => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/rooms/create", roomData);
      setIsLoading(false);
      if (response.data.error) {
        throw new Error(response.data.error);
      }
      console.log(response);
      return response.data;
    } catch (error) {
      setErrorCreate(error.response?.data?.error);
    } finally {
      setIsLoading(false);
    }
  };

  return {createRoom, isLoadingCreateRoom, errorCreate};
};

export default useCreateRoom;
