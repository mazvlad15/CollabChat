import React from "react";
import Chat from "../../Chats/Chat";

const Profile = () => {
  return (
    <div className="mt-3 mx-3 p-2 w-full overflow-auto">
      <div className="user_data flex lg:flex-row sm:flex-col">
        <div className="avatar flex flex-col">
          <div className="rounded lg:size-60">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
          <p className="text-center font-semibold text-secondary sm:text-xs lg:text-lg">Sign up - 2024.12.15</p>
        </div>
        <div className="ms-10 flex flex-col justify-evenly">
          <div>
            <p className="lg:text-4xl font-bold  text-secondary">Name</p>
            <p className="lg:text-3xl font-semibold text-primary">Vlad Mazureac</p>
          </div>
          <div>
            <p className="lg:text-4xl font-bold  text-secondary">Email</p>
            <p className="lg:text-3xl font-semibold text-primary">
              vladmazureac@mail.ru
            </p>
          </div>
        </div>

      </div>
      <div className="groups mt-5">
            <p className="text-4xl font-bold text-primary">Groups participate</p>
            <div className="grid lg:grid-cols-3 gap-4">
                {Array(10).fill(null).map((_,idx) => {
                    return <Chat key={idx} />
                })}
            </div>
      </div>
    </div>
  );
};

export default Profile;
