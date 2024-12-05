import React, { useState } from "react";
import { User } from "./User";
import useGetAllUsers from "../../hooks/useGetAllUsers";
import { CircularProgress } from "@mui/material";
import useAddUserInRoom from "../../hooks/useAddUserInRoom";

const AddUserModal = ({ participants, closeModal }) => {
  const [searchUserInput, setSearchUserInput] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const { users, isLoading } = useGetAllUsers();
  const { addUser, errorToAdd, setErrorToAdd } = useAddUserInRoom();

  const usersNotInRoom = users.filter(
    (user) => !participants.some((participant) => participant._id === user._id)
  );

  const handleSearchChange = (event) => {
    setSearchUserInput(event.target.value.toLowerCase());
  };

  const filteredUsers = usersNotInRoom.filter((user) =>
    user.fullName.toLowerCase().includes(searchUserInput)
  );

  const handleSelectUser = (userId) => {
    setSelectedUser((prevUser) => (prevUser === userId ? null : userId));
  };

  const handleSave = async () => {
    if (selectedUser) {
      await addUser(selectedUser);
      closeModal();
    } else {
      setErrorToAdd("Please select a user to add.");
    }
  };

  return (
    <dialog
      id="addUserModal"
      className="modal bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div className="bg-white w-11/12 md:w-1/2 lg:w-1/3 rounded-lg shadow-lg p-6 relative modal-box">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Add User to Chat
        </h2>

        <input
          type="text"
          placeholder="Search for users..."
          className="w-full border border-gray-300 rounded-md p-2 mb-4"
          onChange={handleSearchChange}
        />

        <div className="max-h-56 mt-2 overflow-y-auto border border-gray-200 rounded-md">
          {isLoading && <CircularProgress />}
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <User
                key={user._id}
                user={user}
                selectedUser={selectedUser === user._id}
                onClick={() => handleSelectUser(user._id)}
              />
            ))
          ) : (
            <p>No users available to add.</p>
          )}
        </div>

        {errorToAdd && <p className="text-red-500 mt-2">{errorToAdd}</p>}

        <div className="flex justify-end space-x-4 mt-4">
          <button className="btn bg-primary text-white hover:bg-secondary" onClick={handleSave}>
            Save
          </button>
          <button className="btn bg-purple hover:bg-secondary" onClick={closeModal}>
            Cancel
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default AddUserModal;
