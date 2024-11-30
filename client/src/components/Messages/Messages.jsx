import React from "react";
import Header from "./Header";
import Message from "./Message";
import ScrollToBottom from "react-scroll-to-bottom";
import WriteMessage from "./WriteMessage";
import useGetAllMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeleton/MessageSkeleton";

export const Messages = () => {
  const { isLoading, errorGetMessages, messages } = useGetAllMessages();

  return (
    <div className="flex flex-col w-full mt-3 mx-3 p-2">
      <Header />
      <ScrollToBottom className="mt-2 overflow-auto mb-5">
        {isLoading &&
          [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
        {!isLoading &&
          !errorGetMessages &&
          messages.length > 0 &&
          messages.map((message) => (
            <Message key={message._id} message={message} />
          ))}
        {!isLoading && !errorGetMessages && messages.length === 0 && (
          <div className="text-center text-lg">
            Send a message to start the conversation
          </div>
        )}
        {errorGetMessages && (
          <div className="flex items-center justify-center text-red-500">
            Error to receive messages
          </div>
        )}
      </ScrollToBottom>
      <div className="mt-auto">
        <WriteMessage />
      </div>
    </div>
  );
};
