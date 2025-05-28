import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaUser, FaSignOutAlt } from "react-icons/fa";

const DashSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const handleTabChange = (newTab) => {
    setTab(newTab);
    navigate(`?tab=${newTab}`);
  };

  return (
    <div className="w-full md:w-64 md:min-h-screen bg-gray-800 text-white p-4">
      <ul className="flex flex-col space-y-4">
        <li
          className={`flex items-center gap-2 p-2 rounded cursor-pointer ${
            tab === "profile" ? "bg-gray-600 font-bold" : "hover:bg-gray-700"
          }`}
          onClick={() => handleTabChange("profile")}
        >
          <FaUser className="text-lg" />
          <span>Profile</span>
          <span className="bg-slate-700 text-xs px-2 py-0.5 rounded ml-auto">user</span>
        </li>
        <li
          className="flex items-center gap-2 p-2 rounded cursor-pointer hover:bg-red-600"
          onClick={() => alert("Sign out logic goes here")}
        >
          <FaSignOutAlt className="text-lg" />
          <span>Sign Out</span>
        </li>
      </ul>
    </div>
  );
};

export default DashSidebar;
