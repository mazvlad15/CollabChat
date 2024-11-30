import React, { useState } from "react";
import { User } from "../../User/User";
import useGetAllUsers from "../../../hooks/useGetAllUsers";
import toast, { Toaster } from "react-hot-toast";
import { CircularProgress } from "@mui/material";
import useCreateRoom from "../../../hooks/useCreateRoom";
import { z } from "zod";

const createSchema = z.object({
  name: z.string().min(3, "Name must have at least 3 characters"),
});

const CreateChat = () => {
  const { isLoading, errorUsers, users } = useGetAllUsers();
  const [roomData, setRoomData] = useState({
    name: "",
    type: true,
  });

  const [searchUserInput, setSearchUserInput] = useState("");
  const [participants, setParticipants] = useState([]);
  const [ZODErrors, setZODErrors] = useState({});
  const [errorCreateRoom, setErrorCreateRoom] = useState(null);

  toast.error(errorUsers);

  const addParticipant = (userId) => {
    setParticipants((prevParticipants) => {
      if (prevParticipants.includes(userId)) {
        return prevParticipants.filter((id) => id !== userId);
      } else {
        return [...prevParticipants, userId];
      }
    });
  };

  const handleSearchChange = (event) => {
    setSearchUserInput(event.target.value.toLowerCase());
  };

  const filteredUsers = users.filter((user) =>
    user.fullName.toLowerCase().includes(searchUserInput)
  );

  const { isLoadingCreateRoom, createRoom } = useCreateRoom();

  const createRoomBtn = async (e) => {
    e.preventDefault();
    try {
      createSchema.parse(roomData);
      const result = await createRoom({
        name: roomData.name,
        participants,
        isPrivate: roomData.type,
      });
      if (result.response?.data?.error) {
        setErrorCreateRoom(result.response?.data?.error);
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors = error.errors.reduce((acc, curr) => {
          acc[curr.path[0]] = curr.message;
          return acc;
        }, {});
        setZODErrors(formattedErrors);
      }
    }
  };

  return (
    <div>
      {errorUsers && <Toaster />}
      <dialog
        id="createChat"
        className="modal bg-black bg-opacity-50 flex items-center justify-center "
      >
        <div className="bg-white w-11/12 md:w-1/2 lg:w-1/3 rounded-lg shadow-lg p-6 relative modal-box">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Create New Group
          </h2>
          {errorCreateRoom && (
            <div className="text-red-500 text-center text-xl font-bold ">{errorCreateRoom}</div>
          )}

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Group Name
            </label>
            <input
              type="text"
              value={roomData.name}
              onChange={(e) => {
                setRoomData({ ...roomData, name: e.target.value });
              }}
              placeholder="Enter group name"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-background"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Add Participants
            </label>
            <input
              onChange={handleSearchChange}
              type="text"
              placeholder="Search for users..."
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-background"
            />
            <div className="mt-2">
              {participants.map((id) => {
                const user = users.find((u) => u._id === id);
                return (
                  <div className="badge badge-accent me-2" key={id}>
                    {user?.fullName}
                  </div>
                );
              })}
            </div>
            <div className="max-h-56 mt-2 overflow-y-auto border border-gray-200 rounded-md">
              {isLoading && <CircularProgress />}
              {users.length > 0
                ? filteredUsers.map((user) => {
                    const selectedUser = participants.includes(user._id);
                    return (
                      <User
                        key={user._id}
                        user={user}
                        selectedUser={selectedUser}
                        onClick={() => addParticipant(user._id)}
                      />
                    );
                  })
                : "Users not found"}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Group Type
            </label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="groupType"
                  className="radio radio-success"
                  value={false}
                  onChange={(e) =>
                    setRoomData((prev) => ({ ...prev, type: e.target.value }))
                  }
                />
                <span className="text-gray-600">Public</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="groupType"
                  className="radio radio-error"
                  value={true}
                  onChange={(e) =>
                    setRoomData((prev) => ({ ...prev, type: e.target.value }))
                  }
                />
                <span className="text-gray-600">Private</span>
              </label>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <form method="dialog">
              <button
                className="btn px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                aria-label="Cancel"
              >
                Cancel
              </button>
            </form>
            <button
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-secondary"
              aria-label="Create"
              onClick={createRoomBtn}
            >
              Create Group
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default CreateChat;
