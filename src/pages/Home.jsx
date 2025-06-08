import React, { useEffect, useState } from "react";

import axios from "axios";
import { useSelector } from "react-redux";
import CalltoAction from "../components/CalltoAction";
import { Link } from "react-router-dom";
const BlogHomePage = () => {
  const [Posts, setPosts] = useState();

  const fetchPosts = async () => {
    try {
      const api = await axios.get(
        "http://localhost:4000/api/post/getallpost?limit=6",
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
  console.log(Posts);

  useEffect(() => {
    fetchPosts();
  }, []); //call only onece when component or page is mount

  return (
    <div className="lg:mx-36 lg:mx-  mb-10">
      <div className="p-4  ">
        <h1 className="md:px-4 mt-10 text-4xl md:text-5xl lg:text-6xl font-bold ">
          Welcome to my blog
        </h1>
        <p className="md:px-4 text-sm md:text-[15px]   mt-6 text-gray-500">
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
      <div className=" text-gray-500 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10 px-4">
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
              <p className="text-gray-600 text-sm">{post?.category}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogHomePage;
