import React, { useState } from "react";
import { User } from "../../User/User";
import useGetAllUsers from "../../../hooks/useGetAllUsers";
import useCreateRoom from "../../../hooks/useCreateRoom";
import roomContext from "../../../context/roomContext";
import { CircularProgress } from "@mui/material";
import { z } from "zod";

const createSchema = z.object({
  name: z.string().min(3, "Name must have at least 3 characters"),
});

const CreateChat = () => {
  const { isLoading, errorUsers, users } = useGetAllUsers();
  const { isLoadingCreateRoom, createRoom } = useCreateRoom();

  const [roomData, setRoomData] = useState({ name: "", type: true });
  const [participants, setParticipants] = useState([]);
  const [searchUserInput, setSearchUserInput] = useState("");
  const [ZODErrors, setZODErrors] = useState({});
  const [errorCreateRoom, setErrorCreateRoom] = useState(null);

  const handleInputChange = (e) =>
    setRoomData((prev) => ({ ...prev, name: e.target.value }));

  const toggleParticipant = (userId) =>
    setParticipants((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
    );

  const handleSearchChange = (e) => setSearchUserInput(e.target.value.toLowerCase());

  const filteredUsers = users.filter((user) =>
    user.fullName.toLowerCase().includes(searchUserInput)
  );

  const handleCreateRoom = async (e) => {
    e.preventDefault();
    try {
      createSchema.parse(roomData);
      const result = await createRoom({
        ...roomData,
        participants,
      });

      if (result.response?.data?.error) {
        setErrorCreateRoom(result.response.data.error);
      } else {
        document.getElementById("createChat").close();
        setParticipants([]);
        setRoomData({
          name: "",
          type: true,
        });
        setSearchUserInput("");
        setZODErrors({});
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors = error.errors.reduce(
          (acc, curr) => ({ ...acc, [curr.path[0]]: curr.message }),
          {}
        );
        setZODErrors(formattedErrors);
      }
    }
  };

  return (
    <div>
      <dialog id="createChat" className="modal bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white w-11/12 md:w-1/2 lg:w-1/3 rounded-lg shadow-lg p-6 relative">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Create New Group</h2>

          {errorCreateRoom && <div className="text-red-500 text-center">{errorCreateRoom}</div>}

          {/* Input Nume Grup */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Group Name</label>
            <input
              type="text"
              value={roomData.name}
              onChange={handleInputChange}
              placeholder="Enter group name"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring"
            />
            {ZODErrors.name && <span className="text-red-500">{ZODErrors.name}</span>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Add Participants</label>
            <input
              type="text"
              onChange={handleSearchChange}
              placeholder="Search for users..."
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring"
            />
            <div className="mt-2 flex flex-wrap gap-2">
              {participants.map((id) => {
                const user = users.find((u) => u._id === id);
                return (
                  <span className="badge badge-accent" key={id}>
                    {user?.fullName}
                  </span>
                );
              })}
            </div>
            <div className="max-h-56 mt-2 overflow-y-auto border rounded-md">
              {isLoading ? (
                <CircularProgress />
              ) : (
                filteredUsers.map((user) => (
                  <User
                    key={user._id}
                    user={user}
                    selectedUser={participants.includes(user._id)}
                    onClick={() => toggleParticipant(user._id)}
                  />
                ))
              )}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Group Type</label>
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="groupType"
                  value={false}
                  checked={!roomData.type}
                  onChange={() => setRoomData((prev) => ({ ...prev, type: false }))}
                  className="radio"
                />
                <span>Public</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="groupType"
                  value={true}
                  checked={roomData.type}
                  onChange={() => setRoomData((prev) => ({ ...prev, type: true }))}
                  className="radio"
                />
                <span>Private</span>
              </label>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              className="btn px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              onClick={() => document.getElementById("createChat").close()}
            >
              Cancel
            </button>
            <button
              className="btn px-4 py-2 bg-primary text-white rounded-md hover:bg-secondary"
              onClick={handleCreateRoom}
            >
              {isLoadingCreateRoom ? "Creating..." : "Create Group"}
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default CreateChat;
