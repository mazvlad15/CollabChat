import React, { useState } from "react";
import { Link } from "react-router-dom";
import { z } from "zod";
import useSignup from "../hooks/useSignup";
import { motion } from "framer-motion";
import { CircularProgress } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";

const signupSchema = z
  .object({
    fullName: z.string().min(3, "Full name must have at least 2 characters."),
    email: z.string().email("Invalid email address."),
    password: z.string().min(6, "Password must have at least 6 characters."),
    confirmPassword: z.string().min(6, "Password confirmation is required."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match.",
    path: ["confirmPassword"],
  });

const pageVariants = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 50 },
};

const Signup = () => {
  const [ZODerrors, setZODErrors] = useState({});
  const [input, setInput] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { signup, loading, errorSignUp } = useSignup();

  const addUserBtn = async (e) => {
    e.preventDefault();
    try {
      signupSchema.parse(input);
      await signup(input);
      toast.error(errorSignUp);
      setZODErrors({});
    } catch (err) {
      if (err instanceof z.ZodError) {
        const formattedErrors = err.errors.reduce((acc, curr) => {
          acc[curr.path[0]] = curr.message;
          return acc;
        }, {});
        setZODErrors(formattedErrors);
      }
    }
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={{ duration: 0.5 }}
    >
      {errorSignUp && <Toaster />}
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            className="w-8 h-8 mr-2"
            src="./CollabChat_logo.png"
            alt="logo"
          />
          CollabChat
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an account
            </h1>
            <form className="space-y-2 md:space-y-2">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Full Name
                </label>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="John Doe"
                  value={input.fullName}
                  onChange={(e) =>
                    setInput({ ...input, fullName: e.target.value })
                  }
                />
                {ZODerrors.fullName && (
                  <p className="text-sm text-red-500">{ZODerrors.fullName}</p>
                )}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Email
                </label>
                <input
                  type="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="johndoe@company.com"
                  value={input.email}
                  onChange={(e) =>
                    setInput({ ...input, email: e.target.value })
                  }
                />
                {ZODerrors.email && (
                  <p className="text-sm text-red-500">{ZODerrors.email}</p>
                )}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={input.password}
                  onChange={(e) =>
                    setInput({ ...input, password: e.target.value })
                  }
                />
                {ZODerrors.password && (
                  <p className="text-sm text-red-500">{ZODerrors.password}</p>
                )}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Confirm password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={input.confirmPassword}
                  onChange={(e) =>
                    setInput({ ...input, confirmPassword: e.target.value })
                  }
                />
                {ZODerrors.confirmPassword && (
                  <p className="text-sm text-red-500">
                    {ZODerrors.confirmPassword}
                  </p>
                )}
              </div>

              <button
                onClick={addUserBtn}
                disabled={loading}
                className="w-full text-white bg-primary hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                {loading ? <CircularProgress /> : "Create an account"}
              </button>
              <p className="text-sm font-light text-gray-800 dark:text-gray-400">
                Already have an account?
                <Link
                  to="/login"
                  className="font-medium text-blue-500 hover:underline dark:text-primary-500"
                >
                  {" "}
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Signup;
