import React from "react";
import { CiSearch } from "react-icons/ci";

export const Search = () => {
  return (
    <div>
      <label className="input input-ghost bg-purple flex items-center gap-2 focus:none ">
        <CiSearch />
        <input type="text" placeholder="Search" />
      </label>
    </div>
  );
};
