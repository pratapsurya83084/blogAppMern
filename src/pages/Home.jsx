import React, { useEffect, useState } from "react";

import axios from "axios";
import { useSelector } from "react-redux";
import CalltoAction from "../components/CalltoAction";
import { Link } from "react-router-dom";

const url="https://blog-mern-api-3.onrender.com/api"

const BlogHomePage = () => {
  const [Posts, setPosts] = useState();

  const fetchPosts = async () => {
    try {
      const api = await axios.get(
        `${url}/post/getallpost?limit=6`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      // console.log(api.data);
      if (api.data.success === true) {
        setPosts(api.data?.BlogPost);
      }
    } catch (error) {
      console.log("error occure while fetching Posts :", error);
    }
  };
  // console.log(Posts);

  useEffect(() => {
    fetchPosts();
  }, []); //call only onece when component or page is mount

  return (
    <div className="bg-white text-black dark:bg-slate-900 dark:text-gray-200 ">
    <div className="lg:mx-36 lg:mx-  ">
      <div className="p-4  ">
        <h1 className="md:px-4 mt-10 text-4xl md:text-5xl lg:text-6xl font-bold ">
          Welcome to my blog
        </h1>
        <p className="md:px-4 text-sm md:text-[15px]   mt-6 text-gray-">
          Welcome to our blog — a space where curiosity meets clarity . Dive
          into well- researched articles , expert insights , and real-world tips
          across technology , business , lifestyle , and more . Whether you 're
          here to stay informed , get inspired , or simply explore new ideas ,
          we bring stories that matter — crafted to spark thought and ignite
          conversation.
        </p>
        <Link to={"/allpost"}>
          <button className="md:p-4 mt-5 text-blue-500">
            view all blogs →{" "}
          </button>
        </Link>
      </div>

      {/* subscribers */}
      <CalltoAction />
      {/* mapp array Posts */}
      <h1 className=" text-center text-2xl font-bold">Recent Posts</h1>
      <div className=" text-gray- grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10 px-4 pb-10">
        {Posts?.map((post, index) => (
          <div
            key={index}
            className="bg- dark:border shadow-md rounded-xl overflow-hidden"
          >
            <Link to={`/post/${post.slug}`}>
              <img
                src={post?.image}
                alt={post?.title}
                className="w-full h-44 object-cover"
              />
            </Link>
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{post?.title}</h3>
              <p className="text-gray- text-sm">{post?.category}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default BlogHomePage;
