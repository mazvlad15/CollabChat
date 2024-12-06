import React from "react";
import { User } from "../User/User";
import useGetUsersInRoom from "../../hooks/useGetUsersInRoom";
import { CircularProgress } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";

const UsersOnlineModal = () => {
  const { isLoading, errorGetUsers, users } = useGetUsersInRoom();

  return (
    <div>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-3 ms-2">Users</h3>
          <p className="py-4 overflow-auto max-h-72">
            {isLoading && <CircularProgress />}
            {users.map((user) => {
              return <User key={user._id} user={user} />;
            })}
          </p>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default UsersOnlineModal;
