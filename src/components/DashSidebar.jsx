import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaSignOutAlt,
  FaTachometerAlt,
  FaComment,
  FaUsers,
  FaBlog,
  FaPooStorm,
} from "react-icons/fa";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { DeleteUser } from "../redux/user/userSlice";

const DashSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [tab, setTab] = useState("");
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);
  const { currentUser, Loading } = useSelector((state) => state.user);
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  console.log(currentUser?.user.isAdmin);

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
    <div
      className={`w-full md:w-64 md:min-h-screen ${
        theme == "dark"
          ? "text-black shadow-2xl border border-gray-300"
          : "bg-slate-800"
      }   p-4`}
    >
      <ToastContainer
        position="top-right"
        autoClose="2000"
        hideProgressBar="false"
      />
      <ul className="flex flex-col space-y-4">
        {/* dashboard  visible this tab only Admin*/}
        {currentUser?.user.isAdmin ? (
          <Link to={"/dashboard?tab=dashboard"}>
            <li
              className={`flex items-center gap-2 p-2 rounded cursor-pointer ${
                tab === "dashboard"
                      ? "bg-gray-400 font-bold"
                  : "hover:bg-gray-300"
              }`}
              onClick={() => handleTabChange("dashboard")}
            >
              <FaTachometerAlt className="text-lg" />

              <span>Dashboard</span>
            </li>
          </Link>
        ) : (
          ""
        )}

        {/* profile */}
        <Link to="/dashboard?tab=profile">
          <li
            className={`flex items-center gap-2 p-2 rounded cursor-pointer ${
              tab === "profile" 
              ? "bg-gray-400 font-bold"
                  : "hover:bg-gray-300"
            }`}
            onClick={() => handleTabChange("profile")}
          >
            <FaUser className="text-lg" />
            <span>Profile</span>
            <span className="bg-slate-700 text-xs px-2 py-0.5 rounded ml-auto">
              {currentUser?.user.isAdmin ? "Admin" : "User"}
            </span>
          </li>
        </Link>
        {/* comment */}
        {currentUser?.user.isAdmin ? (
          <Link to="/dashboard?tab=comment">
            <li
              className={`flex items-center gap-2 p-2 rounded cursor-pointer ${
                tab === "comment"
                  ? "bg-gray-400 font-bold"
                  : "hover:bg-gray-300"
              }`}
              onClick={() => handleTabChange("comment")}
            >
              <FaComment className="text-lg" />
              <span>Comment</span>
            </li>
          </Link>
        ) : (
          ""
        )}

        {/* Users */}
        {currentUser?.user.isAdmin ? (
          <Link to="/dashboard?tab=users">
            <li
              className={`flex items-center gap-2 p-2 rounded cursor-pointer ${
                tab === "users" ? "bg-gray-400 font-bold" : "hover:bg-gray-300"
              }`}
              onClick={() => handleTabChange("users")}
            >
              <FaUsers className="text-lg" />
              <span>Users</span>
            </li>
          </Link>
        ) : (
          ""
        )}

        {/* Posts */}

        {currentUser?.user.isAdmin ? (
          <Link to="/dashboard?tab=post">
            <li
              className={`flex items-center gap-2 p-2 rounded cursor-pointer ${
                tab === "post" 
       ? "bg-gray-400 font-bold"
                  : "hover:bg-gray-300"
              }`}
              onClick={() => handleTabChange("post")}
            >
              <FaBlog className="text-lg" />
              <span>Post</span>
            </li>
          </Link>
        ) : (
          ""
        )}

        <li
          className="flex items-center gap-2 p-2 rounded cursor-pointer hover:bg-red-400"
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
