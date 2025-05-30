import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { DeleteUser } from "../redux/user/userSlice";
const DashSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [tab, setTab] = useState("");
  const dispatch = useDispatch();
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

  //SignoutProfile
  const SignoutProfile = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to Signout ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, do it!",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("Confirmed!");

        async function outUser() {
          try {
            const api = await axios.post(
              `http://localhost:4000/api/auth/signout`,
              {},
              {
                headers: {
                  "Content-Type": "application/json",
                },
                withCredentials: true,
              }
            );
            console.log(api.data.success);
            if (api.data.success === true) {
              dispatch(DeleteUser());

              toast.success("Logout successFull");
              setTimeout(() => {
                navigate("/sign-in");
              }, 1000);
            } else {
              toast.error("Logout failed!");
            }
          } catch (error) {
            console.log("error in signout user:", error);
          }
        }
        outUser();
      }
    });
  };
  return (
    <div className="w-full md:w-64 md:min-h-screen bg-gray-800 text-white p-4">
      <ToastContainer
        position="top-right"
        autoClose="2000"
        hideProgressBar="false"
      />
      <ul className="flex flex-col space-y-4">
        <li
          className={`flex items-center gap-2 p-2 rounded cursor-pointer ${
            tab === "profile" ? "bg-gray-600 font-bold" : "hover:bg-gray-700"
          }`}
          onClick={() => handleTabChange("profile")}
        >
          <FaUser className="text-lg" />
          <span>Profile</span>
          <span className="bg-slate-700 text-xs px-2 py-0.5 rounded ml-auto">
            user
          </span>
        </li>
        <li
          className="flex items-center gap-2 p-2 rounded cursor-pointer hover:bg-red-600"
          onClick={SignoutProfile}
        >
          <FaSignOutAlt className="text-lg" />
          <span>Sign Out</span>
        </li>
      </ul>
    </div>
  );
};

export default DashSidebar;
