import React from "react";
import { User } from "../User/User";

const UsersOnlineModal = () => {
  return (
    <div>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-3 ms-2">Users</h3>
          <p className="py-4 overflow-auto max-h-72">
            {Array(10).fill(null).map((_,idx) => {
              return <User key={idx} />
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
