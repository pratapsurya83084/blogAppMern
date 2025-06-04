import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./Loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { Link ,useNavigate } from "react-router-dom";

const DashPost = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useSelector((state) => state.user);
  const [showmore, setShowMore] = useState(false);
  const [postLength, setPostLength] = useState(7);
  const [showLess, setShowLess] = useState(false);
    const { theme } = useSelector((state) => state.theme);
    // console.log(theme);
  // console.log(showLess);
 const navigate = useNavigate();

//  console.log(blogs);
 
  const fetchBlogs = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/post/getallpost?userId=${currentUser?.user._id}`,
        {
          withCredentials: true,
        }
      );
      const token = response.data.token;
      if (token === "expire" || response.data.success === false) {
        toast.error(response.data.message || "Unauthorized or session expired");
        console.log("Invalid or missing token:", token);
        setLoading(false); // important to stop loading
        return;
      }
      if (response.data.totalPosts > 7) {
        setShowMore(true);
      }
      // console.log(response.data);
      // console.log(response.data.totalPosts);
      setBlogs(response.data.BlogPost || []);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (postId, userId) => {
    if (!postId || !userId) {
      toast.error("post not exists or not found");
      return;
    }
    try {
      const api = await axios.delete(
        `http://localhost:4000/api/post/delete-post/${postId}/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(api.data);
      if (api.data.success === true) {
        toast.success(api.data.message);
        fetchBlogs();
      } else {
        toast.error(api.data.message);
      }
    } catch (error) {
      console.log("post deleting error :", error);
    }
  };

  if (loading) {
    return <Loading />;
  }

  //shoMorePost  button
  const shoMorePost = () => {
    if (blogs.length > 7) {
      setPostLength(blogs.length);
      setShowLess(true);
    }
    if (showLess) {
      setShowLess(false);
      setPostLength(7);
    }
  };

  return (
    <div className="  p-4 overflow-x-auto">
      <ToastContainer
        position="top-right"
        autoClose="2000"
        hideProgressBar="false"
      />
      <h1 className="text-3xl font-bold mb-6">All Blog Posts</h1>

      {currentUser?.user.isAdmin && blogs?.length === 0 ? (
        <p className="text-gray-500">No posts found.</p>
      ) : (
        <div className=" shadow-md rounded-lg  border ">
          <table className={`min-w-full text-sm text-left `} >
            <thead className={`${theme=="dark"?"text-black bg-gray-400":"text-white bg-gray-700"}`}>
              <tr>
                <th className="px-4 py-3">Sr. No</th>
                <th className="px-4 py-3">Date Posted</th>
                <th className="px-4 py-3">Post Image</th>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Edit</th>
                <th className="px-4 py-3">Delete</th>
              </tr>
            </thead>
            <tbody className={`${theme=="dark"?"text-black bg-white":"text-white bg-gray-700"}`}>
              {blogs?.slice(0, postLength).map((blog, index) => (
                <tr  
                  key={blog._id}
                  className={
                  theme=="dark" ? " hover:bg-gray-100 "   : "bg-slate-800 hover:bg-slate-900"
                  }
                >
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3">
                    {new Date(blog.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                  <td className="px-4 py-3" onClick={() => navigate(`/post/${blog.slug}`)}>
                    <img
                      src={blog.image}
                      alt="post"
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="px-4 py-3">{blog.title}</td>
                  <td className="px-4 py-3">{blog.category}</td>
                  <td className="px-4 py-3">
                    <Link to={`/update-post/${blog._id}`}>
                      <button className="text-indigo-600 hover:underline font-medium">
                        Edit
                      </button>
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() =>
                        handleDelete(blog._id, currentUser.user._id)
                      }
                      className="text-red-600 hover:underline font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {showmore && (
        <div className="mt-2 flex justify-center items-center ">
          <button
            onClick={shoMorePost}
            className="text-white bg-indigo-600 py-1 px-2 rounded  "
          >
            {" "}
            {showLess ? "Show Less" : "Show More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default DashPost;
