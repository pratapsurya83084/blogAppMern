import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../components/DashSidebar";
import DashProfile from "../components/DashProfile";

const DashBoard = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    console.log(tabFromUrl);
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
   <div className="flex flex-col md:flex-row">
  <div className="w-full md:w-64">
    <DashSidebar />
  </div>
  <div className="flex-1 p-4">
    {tab === "profile" && <DashProfile />}
  </div>
</div>

  );
};

export default DashBoard;
