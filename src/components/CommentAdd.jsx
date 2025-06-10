import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Comment from "./Comment";

const url="https://blog-mern-api-3.onrender.com/api"
const CommentAdd = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [text, setText] = useState("");

  // ✅ Fetch all comments
  const fetchComment = async () => {
    try {
      const api = await axios.get(
        `${url}/comment/getpostcomment/${postId}`
      );
      if (api.data.success === true) {
        setComments(api.data.comment);
      }
    } catch (error) {
      console.log("Error fetching post comments:", error);
    }
  };

  useEffect(() => {
    fetchComment();
  }, [postId ,comments]);

  // ✅ Add new comment
  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const userId = currentUser?.user.userid || currentUser?.user._id;

    try {
      const api = await axios.post(
        `${url}/comment/create-comment`,
        { comment: text, userId, postId },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (api.data.token === "expire") {
        toast.error(api.data.message);
        setTimeout(() => navigate("/sign-in"), 1500);
        return;
      }

      if (api.data.success === true) {
        toast.success(api.data.message);
        setText("");
        fetchComment();
      }
    } catch (error) {
      console.log("Error creating comment:", error);
    }
  };

  // ✅ Like/unlike comment
  const handelLikes = async (commentId) => {
  //  console.log(commentId);
   
    try {
      if (!currentUser?.user) {
        navigate("/sign-in");
        return;
      }

      const api = await axios.put(
        `${url}/comment/like-post/${commentId}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
// console.log(api.data);

      if (api.data.token === "expire") {
        toast.error(api.data.message);
        setTimeout(() => navigate("/sign-in"), 1500);
        return;
      }
// console.log(comments);

      // ✅ Update likes in state
      setComments((prevComments) =>
        prevComments?.map((comment) => 
        
          comment?._id === commentId
            ? {
                ...comment,
                likes: api.data.comment.likes,
                numberOfLikes: api.data.comment.likes?.length,
              }
            : comment
        )
      );
    } catch (error) {
      console.log("Error liking comment:", error);
    }
  };

  return (
    <div className="p-2 bg-white text-black dark:bg-slate-800 dark:text-gray-200 max-w-3xl mx-auto my-12 px-4">
      <ToastContainer position="top-right" autoClose={2000} />

      {/* User info */}
      {currentUser?.user ? (
        <div className="flex gap-2 items-center mb-2">
          <p>Signed in as:</p>
          <img
            className="h-7 w-7 rounded-full"
            src={
              currentUser.user.ProfilePicture || currentUser.user.picture || "/default-avatar.png"
            }
            alt="User"
          />
          <Link
            to="/dashboard?tab=profile"
            className="hover:underline text-teal-500"
          >
            @{currentUser.user.username}
          </Link>
        </div>
      ) : (
        <div>
          You must be signed in <Link to="/sign-in" className="text-indigo-600 underline">Sign In</Link>
        </div>
      )}

      {/* Add comment form */}
      {currentUser?.user && (
        <form
          onSubmit={handleAddComment}
          className="space-y-4 p-4 rounded-lg shadow-lg dark:border border-gray-700"
        >
          <textarea
            placeholder="Write your comment..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            maxLength={200}
            required
            className="w-full px-4 py-2 rounded-md border focus:outline-none text-black"
          ></textarea>
          <div className="text-sm text-gray-500">
            {200 - text.length} characters remaining
          </div>

          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition-all"
          >
            Add Comment
          </button>
        </form>
      )}

      {/* Comment count */}
      {comments && (
        <div className="flex gap-2 mt-8">
          <span>Comments:</span>
          <p className="px-2 rounded border">{comments.length}</p>
        </div>
      )}

      {/* Comment list */}
      <div className="mt-4 space-y-6">
        {comments.length === 0 ? (
          <p className="text-gray-500 italic">No comments yet. Be the first!</p>
        ) : (
          comments.map((comment) => (
            <Comment
              key={comment?._id}
              comment={comment}
              onLike={handelLikes}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default CommentAdd;
