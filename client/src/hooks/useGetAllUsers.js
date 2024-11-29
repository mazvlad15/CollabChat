import axios from "axios";
import { useEffect, useState } from "react";

const useGetAllUsers = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorUsers, setErrorUsers] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getAllUsers = async () => {
      setIsLoading(true);
      const response = await axios.get("/api/users/all");
      if (response.data.error) {
        throw new Error(response.data.error);
      }

      setUsers(response.data);
      try {
      } catch (error) {
        setErrorUsers(error.response?.data?.error);
      } finally {
        setIsLoading(false);
      }
    };
    getAllUsers();
  }, []);

  return { isLoading, errorUsers, users };
};

export default useGetAllUsers;
