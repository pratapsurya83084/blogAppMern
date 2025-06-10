import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "./Loading";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const url="https://blog-mern-api-3.onrender.com/api"
const DashCommentSection = () => {
  const [loading, setLoading] = useState(true);
  const [Comment, setComment] = useState();

  const fetchComment = async () => {
    try {
      const response = await axios.get(
        `${url}/comment/getallcomment`,
        {
          headers: {
            "Content-Type": "application/json",
          },
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
        setComment(response.data.comment);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Something went wrong while fetching users");
      setLoading(false);
    }
  };

  // console.log(Users);

  useEffect(() => {
    fetchComment();
  }, []);

  // console.log(Users);
  const DeletUserComment = async (commentId) => {
    // console.log(commentId);
    if (!commentId) {
      return;
    }

    try {
      const api = await axios.delete(
        `${url}/comment/delete-comment/${commentId}`,
        {
          withCredentials: true,
        }
      );
      // console.log(api.data);
      if (api.data.success) {
        toast.success(api.data.message);
        fetchComment(); //update table without refresh
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
        autoClose={2000}
        hideProgressBar={false}
      />

      {/* Table Wrapper for scroll */}
      <div className="p-4  overflow-auto">
        <div className="min-w-full overflow-x-auto">
          <table className="min-w-full table-auto shadow rounded-lg">
            <thead className="sticky top-0 z-10">
              <tr>
                <th className="py-2 px-4 text-left">No.of Likes</th>
                <th className="py-2 px-4 text-left">Comments</th>
                <th className="py-2 px-4 text-left">Comment ID</th>
                <th className="py-2 px-4 text-left">User ID</th>
                <th className="py-2 px-4 text-left">Created At</th>
                <th className="py-2 px-4 text-left">Delete</th>
              </tr>
            </thead>
            <tbody>
              {Comment?.map((comment, index) => (
                <tr key={index} className="border-t  transition-colors">
                  <td className="py-2 px-4">{comment?.numberOfLikes}</td>
                  <td className="py-2 px-4">{comment?.comment}</td>
                  <td className="py-2 px-4">{comment?._id}</td>
                  <td className="py-2 px-4">{comment?.userId}</td>
                  <td className="py-2 px-4">
                    {new Date(comment?.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() => DeletUserComment(comment?._id)}
                      className="text-sm bg-orange-600 text-white px-3 rounded py-1 hover:bg-orange-700"
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
    </div>
  );
};

export default DashCommentSection;
