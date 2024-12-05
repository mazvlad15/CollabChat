import { useEffect, useState } from "react";
import roomContext from "../context/roomContext";
import axios from "axios";
import { useSocketContext } from "../context/socketContext";


const useGetUsersInRoom = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorGetUsers, setErrorGetUsers] = useState(null);
  const selectedRoom = roomContext((state) => state.selectedRoom);
  const [users, setUsers] = useState([]);
  const { socket } = useSocketContext();


  useEffect(() => {
    const getUsersInRoom = async () => {
      setIsLoading(true);
      try {
        const selectedRoomId = selectedRoom._id;
        const response = await axios.get("/api/users/room/" + selectedRoomId);
        setIsLoading(false);
        if (response.data.error) {
          throw new Error(response.data.error);
        }
        setUsers(response.data);
      } catch (error) {
        setErrorGetUsers(error.response?.data?.error);
      } finally {
        setIsLoading(false);
      }
    };

    if (selectedRoom._id) getUsersInRoom();

    if (socket) {
      socket.on("updateRoom", (updatedRoom) => {
        if (updatedRoom._id === selectedRoom._id) {
          setUsers(updatedRoom.participants);
        }
      });
    }

    return () => {
      if (socket) {
        socket.off("updateRoom");
      }
    };
  }, [selectedRoom._id, socket]);

  return { isLoading, errorGetUsers, users };
};

export default useGetUsersInRoom;
