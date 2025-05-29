import React, { useState } from "react";
import { useSelector } from "react-redux";

const DashProfile = () => {
  const { currentUser } = useSelector((state) => state.user);


  return (
    <div className="mt-20 mb-10 flex flex-col items-center px-4">
      <h1 className="text-2xl md:text-3xl font-bold text-center">Profile</h1>

      <div className="mt-4 w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-2 border-indigo-500">
        <img
          src={currentUser?.user.picture || currentUser?.user.ProfilePicture}
          alt="profile"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="w-full max-w-md mt-6 border shadow-xl rounded-xl p-6">
        <form className="space-y-4">
        
          <input
            type="text"
            defaultValue={currentUser.user.username}
            className="w-full text-black border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Username"
            name="username"
            id="username"
          />

          <input
            type="email"
            defaultValue={currentUser.user.email}
            className="w-full text-black border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Email"
            name="email"
            id="email"
          />

          <input
            type="password"
            className="w-full text-black border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Password"
            name="Password"
            id="Password"
          />

          <button
            type="submit"
            className="w-full border border-red-500 hover:text-white  hover:bg-gradient-to-l from-purple-700 to-red-600  font-medium rounded py-2 hover:opacity-90 transition"
          >
            Update
          </button>
        </form>

        <div className="flex justify-between mt-4 text-sm">
          <button className="text-red-500 hover:underline">
            Delete Account
          </button>
          <button className="text-red-500 hover:underline">Sign Out</button>
        </div>
      </div>
    </div>
  );
};

export default DashProfile;
