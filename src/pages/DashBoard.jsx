import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../components/DashSidebar";
import DashProfile from "../components/DashProfile";
import DashPost from '../components/DashPost';
import Users from "../components/Users";
import DashCommentSection from "../components/DashCommentSection";
import DashBoardOverviews from "../components/DashBoardOverviews";
const DashBoard = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    // console.log(tabFromUrl);
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
   <div className="flex flex-col md:flex-row md:h-screen overflow-hidden">
  {/* Sidebar */}
  <div className="w-full md:w-64 bg-gray-100 border-r">
    <DashSidebar />
  </div>

  {/* Main Content */}
  <div className="flex-1 p-4 overflow-y-auto">
    {tab === "profile" && <DashProfile />}
    {tab === "post" && <DashPost />}
    {tab === "users" && <Users />}
    {tab === "comment" && <DashCommentSection />}
    {tab === "dashboard" && <DashBoardOverviews/>}
  </div>
</div>


  );
};

export default DashBoard;
