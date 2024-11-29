import { useMutation } from "react-query";
import axios from "axios";
import useAuthStore from "../context/authContext"; 

const useLogout = () => {
  const setAuthState = useAuthStore((state) => state.setAuthState);

  const mutation = useMutation(
    async () => {
      const response = await axios.post("/api/auth/logout");
      localStorage.removeItem("user");
      setAuthState(null); 
      return response.data;
    }
  );

  return {
    logout: mutation.mutate,
    isLoading: mutation.isLoading,
    isError: mutation.isError,
    error: mutation.error,
  };
};

export default useLogout;
