import { useState } from "react";
import authContext from "../context/authContext";
import axios from "axios";
import useGetAllRooms from "./useGetAllRooms";

const useCreateRoom = () => {
  const [isLoadingCreateRoom, setIsLoading] = useState(false);
  const [errorCreate, setErrorCreate] = useState(null);
  const {rooms, setRooms} = useGetAllRooms();

  const createRoom = async (roomData) => {
    setIsLoading(true);
    setErrorCreate(null);
    try {
      console.log("Date transmise : " + JSON.stringify(roomData));
      const response = await axios.post("/api/rooms/create", roomData);
      setIsLoading(false);
      if (response.data.error) {
        throw new Error(response.data.error);
      }
      setRooms([...rooms, response.data]);
      return response.data;
    } catch (error) {
      return error;
    } finally {
      setIsLoading(false);
    }
  };

  return { createRoom, isLoadingCreateRoom, errorCreate };
};

export default useCreateRoom;
