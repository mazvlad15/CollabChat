import React from "react";

const WelcomePage = ({ userName }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full rounded-3xl text-gray-800">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">
          👋 Welcome, <span className="text-blue-600">{userName}</span>!
        </h1>
        <p className="text-lg mb-6">
          Nice to see you here! 😊 To start, select a chat or create a new one.
        </p>
        <div className="flex justify-center space-x-4">
          <button className="px-6 py-2 bg-primary text-white rounded-lg shadow-md hover:bg-secondary transition">
            Create Chat
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
