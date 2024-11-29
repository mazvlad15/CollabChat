import { useMutation } from "react-query";
import axios from "axios";
import useAuthStore from "../context/authContext";
import { useState } from "react";

const useSignup = () => {
  const [loading, isLoading] = useState(false);
  const [errorSignUp, setErrorSignUp] = useState(null);
  const setAuthState = useAuthStore((state) => state.setAuthState);

  const signup = async (newUser) => {
    isLoading(true);
    try {
      const response = await axios.post("/api/auth/signup", newUser);
      isLoading(false);
      if (response.data.error) {
        throw new Error(response.data.error);
      }

      localStorage.setItem("user", JSON.stringify(response.data));
      setAuthState(response.data);

      return response.data;
    } catch (error) {
      console.log(error.response?.data?.error);
      setErrorSignUp(error.response?.data?.error || "Something went wrong");
    } finally {
      isLoading(false);
    }
  };

  return {
    signup,
    loading,
    errorSignUp,
  };
};

export default useSignup;
