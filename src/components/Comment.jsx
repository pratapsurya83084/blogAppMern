import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

const Comment = ({ comment }) => {
  const [user, setUser] = useState([]);
  const [comments, setComments] = useState([]);
//   console.log(comment);

  useEffect(() => {
    const getUser = async () => {
      const userId = comment.userId;

      try {
        const response = await axios.get(
          `http://localhost:4000/api/user/${userId}`
        );
        // console.log(response.data);

        if (response.data.success === true) {
          setUser(response.data.user);
          setComments(comment)
        }
      } catch (error) {
        console.error("error while fetching user :", error);
      }
    };
    getUser();
  }, [comment]);
//   console.log(user);
// console.log(comments);

  return (
    <div className="flex ">
      <div>
        <img
          className="w-10 h-10 rounded-full bg-gray-200"
          src={user?.ProfilePicture}
          alt={user?.username}
        />
      </div>

      <div>
        <div className="">
          <span className="font-bold mr-1 text-xs">
            {user ? `@${user?.username}` : "anonymous user"}{" "}
          </span>
          <span>{moment(comment?.createdAt).fromNow()}</span>
        </div>
        <p className="text-gray-500 pb-2 ml-2">{comments?.comment}</p>
      </div>
    </div>
  );
};

export default Comment;
