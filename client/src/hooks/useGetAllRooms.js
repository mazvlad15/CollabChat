import { useEffect, useState } from "react";
import authContext from "../context/authContext";
import axios from "axios";

const useGetAllRooms = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [rooms, setRooms] = useState([]);

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
  }, []);

  return { isLoading, error, rooms };
};

export default useGetAllRooms;
