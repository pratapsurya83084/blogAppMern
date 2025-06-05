import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";
import { useSelector } from "react-redux";
import CalltoAction from "../components/CalltoAction";
import CommentAdd from "../components/CommentAdd";

const PostPage = () => {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const { theme } = useSelector((state) => state.theme);
  // console.log(theme);

  const plainText = slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const api = await axios.get(
          "http://localhost:4000/api/post/getallpost",
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

  if (loading || !post) {
    return <Loading />;
  }

  return (
    <main
      className={`${
        theme === "dark" ? "text-black " : " text-white"
      } min-h-screen py-10 px-4 md:px-10 lg:px-20 transition-colors duration-300`}
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
          className={`prose prose-lg max-w-none text-justify leading-loose text-sm md:text-xl
            ${theme === "dark" ? "text-black" : "text-white prose-headings:text-white"}
            `}
        >
          <div
            className="post-content"
            dangerouslySetInnerHTML={{ __html: post?.content }}
          />
        </div>
        <div>
          <CalltoAction/>
        </div>
        <div>
          <CommentAdd postId={post?._id}/>
        </div>
      </div>
    </main>
  );
};

export default PostPage;
