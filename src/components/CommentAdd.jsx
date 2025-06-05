import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Await, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Comment from "./Comment";
const CommentAdd = ({ postId }) => {
  const [comments, setComments] = useState();
  const { currentUser } = useSelector((state) => state.user);
  // console.log(currentUser);
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [Error, setError] = useState("");
  // console.log(postId);
  // console.log(text);
  // console.log(comments?.length==0 || comments == undefined ?"yes zero":"no 0");

  //fetch all comment api
  const fetchComment = async () => {
    try {
      const api = await axios.get(
        `http://localhost:4000/api/comment/getpostcomment/${postId}`
      );
      if (api.data.success === true) {
        setComments(api.data.comment);
      }
      // console.log(api.data.comment);
    } catch (error) {
      console.log("error fetching post comment :", error);
    }
  };

  useEffect(() => {
    fetchComment();
  }, []);

  //add new Comment api
  const handleAddComment = async (e) => {
    e.preventDefault();
    if (text.length == 0) {
      return;
    }

    const userId = currentUser?.user.userid || currentUser?.user._id;

    try {
      if (text === "") {
        return;
      }

      const api = await axios.post(
        `http://localhost:4000/api/comment/create-comment`,
        { comment: text, userId, postId },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      // console.log(api.data);
      if (api.data.token == "expire") {
        toast.error(api.data.message);
        setTimeout(() => {
          navigate("/sign-in");
        }, 1500);
      }
      if (api.data.success === true) {
        toast.success(api.data.message);
        setText("");
        fetchComment();
      }
    } catch (error) {
      console.log("error for creating comment : ", error);
    }
  };

  //getpost-Comment

  return (
    <div className="max-w-3xl mx-auto my-12 px-4">
      <ToastContainer
        position="top-right"
        autoClose="2000"
        hideProgressBar="false"
      />
      {currentUser?.user ? (
        <div className="flex gap-2">
          <p>Signed in as :</p>
          <img
            className="h-7 w-7 rounded-full "
            src={currentUser?.user.ProfilePicture || currentUser?.user.picture}
            alt=""
          />
          <Link
            to={"/dashboard?tab=profile"}
            className="hover:underline text-teal-500"
          >
            @{currentUser?.user.username}
          </Link>
        </div>
      ) : (
        <div>
          You must be signed in
          <Link to={"/sign-in"}>Sign In</Link>
        </div>
      )}
      <h3 className="text-2xl font-bold mb-6">💬 Leave a Comment</h3>

      {/* Add Comment Form */}
      {currentUser?.user && (
        <form
          onSubmit={handleAddComment}
          className="space-y-4  p-4 rounded-lg shadow-lg dark:border border-gray-700"
        >
          <textarea
            placeholder="Write your comment..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            required
            className="w-full px-4 py-2 rounded-md border focus:outline-none text-black "
          ></textarea>
          <div>{200 - text.length} characters remaining</div>

          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition-all"
          >
            Add Comment
          </button>
          {setError}
        </form>
      )}

      {/* List of Comments */}
      <div className="mt-8 space-y-6">
        {comments != undefined ? (
          <div className="flex gap-2">
            Comments :{" "}
            <p className="px-2 rounded  border"> {comments?.length}</p>
          </div>
        ) : (
          ""
        )}
        {comments?.length == 0 || comments == undefined ? (
          <p className="text-gray-500 italic">No comments yet. Be the first!</p>
        ) : (
          comments?.map((comment) => (
            <Comment key={comment?._id} comment={comment} />

            // <div
            //   key={comment.id}
            //   className="border-l-4 border-indigo-600 pl-4 py-2 bg-white shadow rounded"
            // >
            //   <p className="font-semibold text-gray-500">{comment.comment}</p>
            //   <p className="text-sm text-gray-500">{new Date(comment.createdAt).toLocaleDateString()}</p>
            //   <p className="mt-1">{comment.text}</p>
            // </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentAdd;
