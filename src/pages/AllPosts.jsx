import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
const AllPosts = () => {
  const [Posts, setPosts] = useState();
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const api = await axios.get("http://localhost:4000/api/post/getallpost", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (api.data.success === true) {
        setPosts(api.data?.BlogPost || []);
        // Simulate a small delay for smooth UX
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
    } catch (error) {
      console.error("Error occurred while fetching posts:", error);
      setLoading(false); // Stop loading if there's an error
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="mb-10">
      <h1 className="text-3xl md:text-4xl font-bold text-center mt-10 text-gray-500">
        📚 Latest Blog Posts
      </h1>
      <p className="text-center text-gray-500 mt-2 px-4 md:px-0 max-w-2xl mx-auto">
        Explore our latest insights, stories, and updates on technology,
        business, lifestyle, and more.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-10 px-4 text-gray-500">
        {Posts?.map((post, index) => (
          <div
            key={index}
            className="bg- shadow-lg rounded-xl overflow-hidden border hover:shadow-xl transition-shadow duration-300"
          >
            <Link to={`/post/${post.slug}`}>
              <img
                src={
                  post.image ||
                  "https://via.placeholder.com/400x250?text=No+Image"
                }
                alt={post.title || "Blog Post"}
                className="w-full h-48 object-cover"
                loading="lazy"
              />
            </Link>
            <div className="p-5">
              <p className="text-xs inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-full mb-3 font-medium">
                {post.category || "General"}
              </p>
              <h3 className="text-xl font-bold  mb-2 line-clamp-2">
                {post.title}
              </h3>
              <p className="text-sm  line-clamp-2">
                {post.description || "Discover more in this exciting post."}
              </p>
              <Link
                to={`/post/${post.slug}`}
                className="text-blue-500 text-sm font-medium inline-block mt-4 hover:underline"
              >
                Read more →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllPosts;
