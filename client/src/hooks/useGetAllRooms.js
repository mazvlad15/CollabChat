import { useEffect, useState } from "react";
import authContext from "../context/authContext";
import axios from "axios";
import { useSocketContext } from "../context/socketContext";

const useGetAllRooms = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [rooms, setRooms] = useState([]);
  const { socket } = useSocketContext();

  useEffect(() => {
    const getAllRooms = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("/api/rooms/participate");
        setIsLoading(false);
        if (response.data.error) {
          throw new Error(response.data.error);
        }
        setRooms(response.data.rooms || []);
      } catch (error) {
        setError(error.response?.data?.error);
      } finally {
        setIsLoading(false);
      }
    };

    getAllRooms();

    if (socket) {
      socket.on("createRoom", (newRoom) => {
        setRooms((prevRooms) => [...prevRooms, newRoom]);
        socket.emit("join_room", newRoom._id);
      });
    }

    return () => {
      if (socket) {
        socket.off("createRoom");
      }
    };
  }, [socket]);

  return { isLoading, error, rooms, setRooms };
};

export default useGetAllRooms;
