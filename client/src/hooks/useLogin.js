import axios from "axios";
import useAuthStore from "../context/authContext";
import { useState } from "react";

const useLogin = () => {
  const setAuthState = useAuthStore((state) => state.setAuthState);
  const [errorLogin, setErrorLogin] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (input) => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/auth/login", input);
      setIsLoading(false);
      if (response.data.error) {
        throw new Error(response.data.error);
      }

      localStorage.setItem("user", JSON.stringify(response.data));
      setAuthState(response.data);

      return response.data;
    } catch (error) {
      setIsLoading(error.response?.data?.error || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    login,
    isLoading,
    errorLogin,
  };
};

export default useLogin;
