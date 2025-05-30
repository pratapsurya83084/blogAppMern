import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
  UpdateStart,
  UpdateSuccess,
  UpdateFailure,
  DeleteUser,
} from "../redux/user/userSlice";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const DashProfile = () => {
  const { currentUser , Loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "" || currentUser?.user.username,
    email: "" || currentUser?.user.email,
    password: "",
  });
  console.log(currentUser?.user.isAdmin);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  // console.log(currentUser);

  const userId = currentUser?.user._id || currentUser?.user.userid;
  // console.log(userId);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData) {
      toast.error("all field are must required ");
    }
    try {
      dispatch(UpdateStart());
      const userId = currentUser.user._id; // or currentUser.userId if structured differently

      const api = await axios.put(
        `http://localhost:4000/api/user/update/${userId}`,
        formData,
        {
          withCredentials: true, // ✅ Important: send cookies
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // console.log(api.data);
      if (api.data.success == true) {
        dispatch(UpdateSuccess(api.data));
        toast.success(api.data.message);
      } else {
        toast.error(api.data.message);
      }
    } catch (error) {
      console.error("Update failed:", error);
      dispatch(UpdateFailure(error));
      toast.error("failed update , try another email ");
      console.log("Update failed. Please try again.");
    }
  };

  const DeleteAccount = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this account",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, do it!",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("Confirmed!");

        async function deleteUserConfirm() {
          try {
            const api = await axios.delete(
              `http://localhost:4000/api/user/deleteUser-account/${userId}`,
              {
                headers: {
                  "Content-Type": "application/json",
                },
                withCredentials: true,
              }
            );
            console.log(api.data);
            if (api.data.success == true) {
              dispatch(DeleteUser());
              navigate("/sign-in");
            } else {
              toast.error("user  not found");
            }
          } catch (error) {
            console.log("something went wrong :", error);
          }
        }
        deleteUserConfirm();
      }
    });
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
    <div className="mt-20 mb-10 flex flex-col items-center px-4">
      <ToastContainer
        position="top-right"
        autoClose="2000"
        hideProgressBar="false"
      />
      <h1 className="text-2xl md:text-3xl font-bold text-center">Profile</h1>

      <div className="mt-4 w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-2 border-indigo-500">
        <img
          src={currentUser?.user.picture || currentUser?.user.ProfilePicture}
          alt="profile"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="w-full max-w-md mt-6 border shadow-xl rounded-xl p-6">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            value={formData?.username}
            onChange={handleChange}
            className="w-full text-black border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
            name="username"
            id="username"
            placeholder="Username"
          />

          <input
            type="email"
            value={formData?.email}
            onChange={handleChange}
            className="w-full text-black border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
            name="email"
            id="email"
            placeholder="Email"
          />

          <input
            type="password"
            value={formData?.password}
            onChange={handleChange}
            className="w-full text-black border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
            name="password"
            id="password"
            placeholder="Password"
          />

          <button
            type="submit"
            className="w-full border border-red-500 text-white bg-gradient-to-l from-purple-700 to-red-600 font-medium rounded py-2 hover:opacity-90 transition"
          >
           {Loading?"Loading...":"Update"}
          </button>

               {currentUser?.user.isAdmin === true ? (
            <Link to={`/create-post`} className="">
              <button className="mt-1 w-full border border-red-500 text-white bg-gradient-to-l from-purple-700 to-red-600 font-medium rounded py-2 hover:opacity-90 transition">Create a Post</button>
            </Link>
          ) : (
            ""
          )}
        </form>

        <div className="flex justify-between mt-4 text-xs md:text-sm">
          <button
            onClick={DeleteAccount}
            className="text-red-500 hover:underline"
          >
            Delete Account
          </button>
     

          <button
            onClick={SignoutProfile}
            className="text-red-500 hover:underline text-xs md:text-sm"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashProfile;
