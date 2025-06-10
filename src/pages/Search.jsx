import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";

const url="https://blog-mern-api-3.onrender.com/api"

const Search = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [sideBarData, setSideBarData] = useState({
    searchTerm: "",
    sort: "",
    category: "",
  });

  const [posts, setPost] = useState([]);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const sortFromUrl = urlParams.get("sort");
    const categoryFromUrl = urlParams.get("category");

    setSideBarData({
      searchTerm: searchTermFromUrl || "",
      sort: sortFromUrl || "",
      category: categoryFromUrl || "",
    });

    fetchPost();
  }, [location.search]);


   const fetchPost = async () => {
     const urlParams = new URLSearchParams(location.search);
      const searchQuery = urlParams.toString();
      // console.log(searchQuery);

      try {
        const api = await axios.get(
          `${url}/post/getallpost?${searchQuery}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        // console.log(api.data);

        if (!api.data) {
          setLoading(true);
          return;
        }

        setTimeout(() => {
          setPost(api.data?.BlogPost || []);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error("Error occurred while fetching posts:", error);
        setLoading(false);
      }
    };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setSideBarData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    if (sideBarData.searchTerm)
      urlParams.set("searchTerm", sideBarData.searchTerm);
    if (sideBarData.sort) urlParams.set("sort", sideBarData.sort);
    if (sideBarData.category) urlParams.set("category", sideBarData.category);

    navigate(`/search?${urlParams.toString()}`);
  };



  return (
    <div className="bg-white text-black dark:bg-slate-900 dark:text-gray-200 flex flex-col lg:flex-row min-h-screen ">
      {/* Sidebar */}
      <div className="w-full lg:w-[20%] border-r p-6 bg-  shadow-md">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="searchTerm" className="text-sm font-medium  mb-1">
              Search Term
            </label>
            <input
              id="searchTerm"
              type="text"
              value={sideBarData?.searchTerm}
              onChange={handleChange}
              placeholder="Enter keyword..."
              className="px-3 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="sort" className="text-sm font-medium mb-1">
              Sort By
            </label>
            <select
              id="sort"
              value={sideBarData?.sort}
              onChange={handleChange}
              className="px-3 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select sort</option>
              <option value="desc">Latest</option>
              <option value="asc">Oldest</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="category" className="text-sm font-medium  mb-1">
              Category
            </label>
            <select
              id="category"
              value={sideBarData?.category}
              onChange={handleChange}
              className="px-3 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select Category</option>
              <option value="reactjs">ReactJS</option>
              <option value="nodeJS">NodeJS</option>
              <option value="sport">Sport</option>
              <option value="nature">Nature</option>
              <option value="health">Health</option>
              <option value="technology">Technology</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-md transition duration-200"
          >
            Apply Filters
          </button>
        </form>
      </div>

      {/* Posts Grid */}
      <div className="w-full lg:w-[80%] p-6">
        {posts?.length === 0 ? (
          <div>
             <Loading />
          <p className="text-gray-600 text-center">No posts found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts?.map((post, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <Link to={`/post/${post?.slug}`}>
                  <img
                    src={post?.image}
                    alt={post?.title}
                    className="w-full h-48 object-cover"
                  />
                </Link>
                <div className="p-4">
                  <p className="text-sm text-indigo-600 font-medium mb-1 uppercase">
                    {post?.category}
                  </p>
                  <h2 className="text-lg font-semibold text-gray-800 line-clamp-2">
                    {post?.title}
                  </h2>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
