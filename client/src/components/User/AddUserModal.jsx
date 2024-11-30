import React, { useState } from "react";
import useGetAllUsers from "../../hooks/useGetAllUsers";

const AddUsersModal = ({ selectedUsers, setSelectedUsers }) => {
  const { isLoading, errorUsers, users } = useGetAllUsers();

  const toggleUser = (userId) => {
    // Adaugă sau elimină utilizatorul din lista selectată
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const closeModal = () => {
    document.getElementById("add_users_modal").close();
  };

  return (
    <dialog id="add_users_modal" className="modal bg-black bg-opacity-50">
      <div className="modal-box w-11/12 max-w-md">
        <h3 className="font-bold text-lg mb-4">Select Participants</h3>
        {isLoading ? (
          <p>Loading users...</p>
        ) : errorUsers ? (
          <p className="text-red-500">Error loading users.</p>
        ) : (
          <div className="max-h-40 overflow-y-auto">
            {users.map((user) => (
              <label
                key={user.id}
                className="flex items-center gap-2 mb-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedUsers.includes(user.id)}
                  onChange={() => toggleUser(user.id)}
                  className="checkbox"
                />
                {user.username}
              </label>
            ))}
          </div>
        )}
        <div className="mt-4 flex justify-end gap-4">
          <button
            type="button"
            className="btn btn-outline"
            onClick={closeModal}
          >
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default AddUsersModal;
