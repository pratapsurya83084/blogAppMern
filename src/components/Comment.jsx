import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import Swal from "sweetalert2";


const url="https://blog-mern-api-3.onrender.com/api"

const Comment = ({ comment, onLike }) => {
  const [isEdit, setisEdit] = useState(false);
  const [user, setUser] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const [editedText, setEditedText] = useState("");
  // console.log(comment);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(
          `${url}/user/${comment.userId}`
        );

        if (response.data.success === true) {
          setUser(response.data.user);
        }
      } catch (error) {
        console.error("Error while fetching user:", error);
      }
    };

    getUser();
  }, [comment?.userId]);

  const isLiked =
    currentUser &&
    comment?.likes?.includes(currentUser?.user.userid || currentUser?.user._id);
  // console.log("liked status :",isLiked);

  //editButton comment

  const editButton = (getOldComent) => {
    // console.log("editted...");

    setisEdit(true);
    setEditedText(getOldComent);
  };

  //update new comment appi
  const handleUpdate = async (commentId) => {
    setisEdit(false);
    // console.log(editedText.length);

    if (editedText.length == 0) {
      alert("failed edit comment");
      return;
    }
    //  console.log("commentId :",commentId);
    if (!commentId) {
      alert("comment not found ");
      return;
    }

    try {
      const api = await axios.put(
        `${url}/comment/update-comment/${commentId}`,
        {
          comment: editedText,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (api.data.success == true) {
        toast.success("edited success");
      } else {
        toast.error("failed edit comment");
      }

      // console.log("response edited comment :", api.data);
    } catch (error) {
      console.log(
        "error while updating comment :",
        error?.response?.data?.message
      );
      toast.error(error?.response?.data?.message);
    }
  };

  // deleteComment by id Specific
  const DeleteComment = async (commentId) => {
    // console.log("id receive : ", commentId);

    if (!commentId) {
      toast.error("failed delete comment");
      return;
    }

    Swal.fire({
      title: "Are you sure?",
      text: "You Want to delete this Comment",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        async function deletComment() {
          try {
            const response = await axios.delete(
              `${url}/comment/delete-comment/${commentId}`,

              {
                headers: {
                  "Content-Type": "application/json",
                },
                withCredentials: true,
              }
            );
            if (response.data.token == "expire") {
              toast.error(response.data.message);
              return;
            }
            // console.log(response.data);
          } catch (error) {
            console.log("error while deleting comment : ", error);
            // toast.error(response.error.data.message);
          }
        }
        deletComment();
      }
    });
  };

  return (
    <div className=" bg-white text-black dark:bg-slate-900 dark:text-gray-200 flex gap-4 p-2 border-b border-gray-200">
      <Toaster position="top-right" reverseOrder={false} />
      <img
        className="w-10 h-10 rounded-full bg-gray-200 object-cover"
        src={user?.ProfilePicture || "/default-avatar.png"}
        alt={user?.username || "anonymous"}
      />

      <div className="flex-1">
        <div className="text-xs text-gray-500 mb-1 p-2">
          <span className="font-bold mr-2">
            {user ? `@${user.username}` : "Anonymous User"}
          </span>
          <span>
            {comment.createdAt
              ? moment(comment.createdAt).fromNow()
              : "Just now"}
          </span>
        </div>

        {/* show if isEdited false */}
        {isEdit ? (
          <div className="space-y-2">
            <textarea
              placeholder="Edit your comment..."
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              className="w-full p-2 border rounded text-black"
              rows={2}
            ></textarea>

            <div className="flex gap-2">
              <button
                onClick={() => handleUpdate(comment?._id)}
                className="bg-indigo-600 text-white px-4 py- rounded "
              >
                OK
              </button>
              <button
                onClick={() => setisEdit(false)}
                className="bg-gray-400 text-white px-4 py-1 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div>
            <p className="text-sm text-gray-500 mb-2">{comment?.comment}</p>

            <div className="flex gap-3">
              <button
                onClick={() => onLike(comment?._id)}
                className={` hover:text-blue-500 transition-colors duration-150 ${
                  isLiked ? "text-blue-500" : ""
                }`}
              >
                <FaThumbsUp className="text-sm inline" />
                <span className="ml-1 text-xs">
                  {comment?.numberOfLikes}{" "}
                  {comment?.numberOfLikes == 1 ? "like" : "likes"}{" "}
                </span>
              </button>
              {currentUser?.user.isAdmin ||
              (currentUser?.user.userid || currentUser?.user._id) ==
                comment.userId ? (
                <div className="flex gap-4">
                  <div>
                    <button onClick={() => editButton(comment?.comment)}>
                      edit
                    </button>
                  </div>

                  {/* delete comment */}
                  <div>
                    <button onClick={() => DeleteComment(comment?._id)}>
                      delete
                    </button>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
