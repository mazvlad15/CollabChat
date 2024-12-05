import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-600">404</h1>
        <p className="mt-4 text-2xl text-gray-700">Oops! Page Not Found</p>
        <p className="mt-2 text-lg text-gray-500">
          The page you are looking for might have been moved or deleted.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block px-6 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
