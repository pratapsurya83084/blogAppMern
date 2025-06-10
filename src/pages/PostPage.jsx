import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";
import { useSelector } from "react-redux";
import CalltoAction from "../components/CalltoAction";
import CommentAdd from "../components/CommentAdd";
import PostCard from "../components/PostCard";


const url="https://blog-mern-api-3.onrender.com/api"
const PostPage = () => {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const { theme } = useSelector((state) => state.theme);
  const [recentPost, setRecentPost] = useState(null);

  // console.log(theme);

  const plainText = slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const api = await axios.get(
          `${url}/post/getallpost`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        const matchedPost = api.data.BlogPost.find((p) => p.slug === slug);
        setPost(matchedPost || null);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.log("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [slug]);
  // console.log(post);

  useEffect(() => {
    const fetchRecentPost = async () => {
      try {
        const api = await axios.get(
          `${url}/post/getallpost?limit=3`
        );
        // console.log(api.data.BlogPost);
        if (api.data) {
          setRecentPost(api.data.BlogPost);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchRecentPost();
  }, []);

  if (loading || !post) {
    return <Loading />;
  }

  return (
    <main
      className={`bg-white text-black dark:bg-slate-900 dark:text-gray-200 min-h-screen py-10 px-4 md:px-10 lg:px-20 transition-colors duration-300`}
    >
      {/* Post Header */}
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-serif font-bold text-center leading-snug mb-6">
          {plainText}
        </h1>

        {post?.category && (
          <div className="flex justify-center mb-4">
            <Link
              to={`/search?category=${post.category}`}
              className="px-4 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold shadow hover:scale-105 transition-transform"
            >
              #{post.category}
            </Link>
          </div>
        )}

        {/* Image */}
        <div className="rounded-lg overflow-hidden shadow-xl mt-8">
          <img
            src={post.image}
            alt={post.title}
            className="w-full object-cover max-h-[600px]"
          />
        </div>

        {/* Meta Info */}
        <div className="flex flex-wrap justify-between items-center text-sm  mt-4">
          <p>📅 {new Date(post.createdAt).toLocaleDateString()}</p>
          <p>⏱️ {(post.content.length / 1000).toFixed(0)} min read</p>
        </div>

        <hr className="my-6 border-gray-300 dark:border-gray-700" />

        {/* Post Content */}
        <div
          className={`prose prose-lg max-w-none text-justify leading-loose text-sm md:text-xl`}
        >
<div
  className="prose prose-sm max-w-none text-black dark:prose-invert dark:text-gray-200 bg-white dark:bg-slate-900 p-4 rounded"
  dangerouslySetInnerHTML={{ __html: post?.content }}
/>


        </div>
        <div>
          <CalltoAction />
        </div>
        <div>
          <CommentAdd postId={post?._id} />
        </div>
        {/* here  recent blogPost */}
        <div className="mt-20">
          <h1 className="text-3xl font-bold text-center">Recent Articles</h1>

          <div className="grid grid-cols md:grid-cols-2 lg:grid-cols-3 justify-center items-center gap-6 mt-10 md:max-w-6xl ">
            {recentPost &&
              recentPost.map((post) => (
                <div key={post._id} className="h-full">
                  <PostCard post={post} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default PostPage;
