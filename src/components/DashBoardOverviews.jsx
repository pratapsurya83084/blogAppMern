import React, { useEffect, useState } from "react";
import {
  FaUser,
  FaSignOutAlt,
  FaTachometerAlt,
  FaComment,
  FaUsers,
  FaBlog,
  FaPooStorm,
  FaArrowDown,
  FaArrowUp,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import axios from "axios";

const DashBoardOverviews = () => {
  const [User, setUsers] = useState();
  const [Comments, setComments] = useState();
  const [Posts, setPosts] = useState();
  const [lastMonthpost, setlastMonthPost] = useState();
  const { currentUser } = useSelector((state) => state.user);
  //   console.log(lastMonthpost);

  const fetchUsers = async () => {
    try {
      const api = await axios.get("http://localhost:4000/api/user/getusers", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      //   console.log(api.data);
      if (api.data.success === true) {
        setUsers(api.data.users);
      }
    } catch (error) {
      console.log("error occure while fetching Users :", error);
    }
  };

  const fetchComments = async () => {
    try {
      const api = await axios.get(
        "http://localhost:4000/api/comment/getallcomment",
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      //   console.log(api.data);
      if (api.data.success === true) {
        setComments(api.data.comment);
      }
    } catch (error) {
      console.log("error occure while fetching Comments :", error);
    }
  };

  const fetchPosts = async () => {
    try {
      const api = await axios.get("http://localhost:4000/api/post/getallpost", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      // console.log(api.data);
      if (api.data.success === true) {
        setPosts(api.data.BlogPost);
        setlastMonthPost(api.data?.lastMonthPosts);
      }
    } catch (error) {
      console.log("error occure while fetching Posts :", error);
    }
  };

  useEffect(() => {
    if (currentUser?.user.isAdmin) {
      //if admin is logged then fetch
      fetchUsers();
      fetchComments();
      fetchPosts();
    }
  }, []); //call only onece when component or page is mount

  return (
    <div>
      {/* flex 3 box */}
      <div className="flex flex-col md:flex-row justify-center items-center mt-5 md:p-5 gap-4">
        {/* Box 1: Total Users */}
        <div className="flex flex-col rounded-xl justify-between shadow-lg dark:border w-full md:w-1/3 p-4">
          <div className="flex flex-row justify-between">
            <h1 className="font-bold text-gray-700">TOTAL USERS</h1>
            <FaUsers className="bg-teal-500 rounded-full h-10 w-10 text-white p-2" />
          </div>
          <div className="mt-6">
            <p className="text-2xl font-bold">{User?.length}</p>
            <p className="flex items-center gap-1 text-gray-500">
              <FaArrowUp className="text-green-500" /> 8 Last Month
            </p>
          </div>
        </div>

        {/* Box 2: Total Comments */}
        <div className="flex flex-col rounded-xl justify-between shadow-lg dark:border w-full md:w-1/3 p-4">
          <div className="flex flex-row justify-between">
            <h1 className="font-bold text-gray-700">TOTAL COMMENTS</h1>
            <FaComment className="bg-indigo-500 rounded-full h-10 w-10 text-white p-2" />
          </div>
          <div className="mt-6">
            <p className="text-2xl font-bold">{Comments?.length}</p>
            <p className="flex items-center gap-1 text-gray-500">
              <FaArrowDown className="text-red-500" /> 4 Last Month
            </p>
          </div>
        </div>

        {/* Box 3: Total Posts */}
        <div className="flex flex-col rounded-xl justify-between shadow-lg dark:border w-full md:w-1/3 p-4">
          <div className="flex flex-row justify-between">
            <h1 className="font-bold text-gray-700">TOTAL POSTS</h1>
            <FaBlog className="bg-green-400 rounded-full h-10 w-10 text-white p-2" />
          </div>
          <div className="mt-6">
            <p className="text-2xl font-bold">{Posts?.length}</p>
            <p className="flex items-center gap-1 text-gray-500">
              <FaArrowUp className="text-green-500" /> {lastMonthpost} Last
              Month
            </p>
          </div>
        </div>
      </div>

      {/* render other components */}
      {/* show here recent users and recent comments */}

      <div className="flex flex-col md:flex-row justify-center items-center mt-5 md:p-5 gap-4">
        {/* left side recent users */}
        <div className="border shadow-lg p-5 rounded-lg w-full">
          <div className="flex justify-between items-center ">
            <h1>Recent users</h1>
            <button className="px-2 py-1 border border-red-500 rounded text-bold">
              See all
            </button>
          </div>
          <div className="flex flex-col mt-5">
            <div className="font-bold bg-slate-50 text-gray-500 p-2 flex justify-between items-center">
              {" "}
              <p>USER IMAGE</p> <p>USERNAME</p>
            </div>
            {User?.map((user, index) => {
              return (
                <div
                  key={index}
                  className=" flex  justify-between items-center space-y-6 mt-2"
                >
                  <img
                    src={user?.ProfilePicture}
                    className="h-10 w-10 mt- rounded-full"
                    alt=""
                  />
                  <h1 className="m-4"> {user?.username}</h1>
                </div>
              );
            })}
          </div>
        </div>

        {/* right side recent comments */}
        <div className="border shadow-lg p-5 rounded-lg w-full">
          <div className="flex justify-between items-center ">
            <h1>Recent Comments</h1>
            <button className="px-2 py-1 border border-red-500 rounded text-bold">
              See all
            </button>
          </div>
          <div className="flex flex-col mt-5">
            <div className="font-bold bg-slate-50 text-gray-500  p-2  flex justify-between items-center ">
              {" "}
              <p>COMMENT</p> <p>LIKES</p>
            </div>
            {Comments?.map((comment, index) => {
              return (
                <div
                  key={index}
                  className="flex  justify-between  space-y- mt-2"
                >
                  <p className="h- w- mt- ">{comment?.comment}</p>
                  <p className="p-2">{comment?.numberOfLikes}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* render here recentpost blogs */}
      <div className="md:72 lg:mx-80  md:p-5 mt-5">
        <div className="border shadow-lg p-5 rounded-lg w-full">
          <div className="flex justify-between items-center ">
            <h1>Recent Posts</h1>
            <button className="px-2 py-1 border border-red-500 rounded text-bold">
              See all
            </button>
          </div>
          <div className="flex flex-col mt-5">
            <div className="font-bold bg-slate-50 text-gray-500  p-2  flex justify-between items-center ">
              {" "}
              <p>POST IMAGE</p> <p>POST TITLE</p> <p>CATEGORY</p>
            </div>
            {Comments?.map((comment, index) => {
              return (
                <div
                  key={index}
                  className="flex  justify-between  space-y- mt-2"
                >
                  <p className="h- w- mt- ">post image</p>
                  <p>post title</p>
                  <p className="p-2">category</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoardOverviews;
