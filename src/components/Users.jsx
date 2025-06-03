import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "./Loading";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Users = () => {
  const [loading, setLoading] = useState(true);
  const [Users, setUsers] = useState();

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/user/getusers`,
        {
          withCredentials: true,
        }
      );
      // console.log(response.data);

      const token = response.data.token;
      if (token === "expire" || response.data.success === false) {
        toast.error(response.data.message || "Unauthorized or session expired");
        console.log("Invalid or missing token:", token);
        setLoading(false); // important to stop loading
        return;
      }

      if (response.data.success === true) {
        setUsers(response.data.users);
        setTimeout(() => {
          setLoading(false);
        }, 1500);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Something went wrong while fetching users");
      setLoading(false);
    }
  };

  // console.log(Users);

  useEffect(() => {
    fetchUsers();
  }, []);

  // console.log(Users);
  const DeletUser = async (id) => {
    // console.log(id);
    if (!id) {
      return;
    }

    try {
      const api = await axios.delete(
        `http://localhost:4000/api/user/deleteuserbyadmin/${id}`,
        {
          withCredentials: true,
        }
      );
      //   console.log(api.data);
      if (api.data.success) {
        toast.success(api.data.message);
        fetchUsers(); //update table without refresh
        return;
      } else {
        toast.error(api.data.message);
        return;
      }
    } catch (error) {
      console.log("error while fetching delete user api :", error);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose="2000"
        hideProgressBar="false"
      />

      <div className="overflow-x-auto p-4">
        <table className="min-w-full  shadow rounded-lg overflow-hidden">
          <thead className="">
            <tr>
              <th className="py-2 px-4 text-left">Profile Picture</th>
              <th className="py-2 px-4 text-left">Username</th>
              <th className="py-2 px-4 text-left">Email</th>
              <th className="py-2 px-4 text-left">Admin</th>
              <th className="py-2 px-4 text-left">Created At</th>
              <th className="py-2 px-4 text-left">Delete</th>
            </tr>
          </thead>
          <tbody>
            {Users?.map((user, index) => (
              <tr
                key={index}
                className="border-t hover:bg-gray-100  hover:text-black   transition-colors "
              >
                <td className="py-2 px-4">
                  <img
                    src={user?.ProfilePicture}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </td>
                <td className="py-2 px-4">{user?.username}</td>
                <td className="py-2 px-4">{user?.email}</td>
                <td className="py-2 px-4">
                  {user?.isAdmin ? (
                    <span className="text-green-600 font-semibold">Yes</span>
                  ) : (
                    <span className="text-red-600 font-semibold">No</span>
                  )}
                </td>
                <td className="py-2 px-4">
                  {new Date(user?.createdAt).toLocaleDateString()}
                </td>
                <td>
                  <button
                    onClick={() => DeletUser(user._id)}
                    className="text-lg bg-orange-600 px-3 rounded py-1"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
