import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";

const Comment = ({ comment, onLike }) => {
  const [user, setUser] = useState(null);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/user/${comment.userId}`
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

  const isLiked = currentUser && comment?.likes?.includes(currentUser?.user.userid || currentUser?.user._id);
console.log("liked status :",isLiked);

  return (
    <div className="flex gap-4 p-2 border-b border-gray-200">
      <img
        className="w-10 h-10 rounded-full bg-gray-200 object-cover"
        src={user?.ProfilePicture || "/default-avatar.png"}
        alt={user?.username || "anonymous"}
      />

      <div className="flex-1">
        <div className="text-xs text-gray-600 mb-1">
          <span className="font-bold mr-2">
            {user ? `@${user.username}` : "Anonymous User"}
          </span>
          <span>{moment(comment?.createdAt).fromNow()}</span>
        </div>

        <p className="text-sm text-gray-800 mb-2">{comment?.comment}</p>

        <div>
          <button
            onClick={() => onLike(comment?._id)}
            className={` hover:text-blue-500 transition-colors duration-150 ${
              isLiked ? "text-blue-500" : ""
            }`}
          >
            <FaThumbsUp className="text-sm inline" />
            <span className="ml-1 text-xs">{comment?.numberOfLikes}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Comment;
