import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from './Loading';

const DashPost = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/post/getall-post', {
        withCredentials: true,
      });
      console.log(response.data);
      
      setBlogs(response.data.BlogPost || []);
      setTimeout(()=>{
setLoading(false);
      },1000)
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleEdit = (id) => {
    console.log("Edit post", id);
    // Navigate to edit page or open modal
  };

  const handleDelete = async (id) => {
    console.log("Delete post", id);
    // Call delete API
  };

  if (loading) {
    return(
    <Loading/>
    )
  }

  return (
   <div className="p-4 overflow-x-auto">
  <h1 className="text-3xl font-bold mb-6">All Blog Posts</h1>

  {blogs.length === 0 ? (
    <p className="text-gray-500">No posts found.</p>
  ) : (
    <div className="shadow-md rounded-lg overflow-hidden border border-gray-200">
      <table className="min-w-full text-sm text-left text-gray-700 bg-white">
        <thead className="bg-indigo-600 text-white">
          <tr>
            <th className="px-4 py-3">Sr. No</th>
            <th className="px-4 py-3">Date Posted</th>
            <th className="px-4 py-3">Post Image</th>
            <th className="px-4 py-3">Title</th>
            <th className="px-4 py-3">Category</th>
            <th className="px-4 py-3">Edit</th>
            <th className="px-4 py-3">Delete</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog, index) => (
            <tr
              key={blog._id}
              className={index % 2 === 0 ? 'bg-gray-50 hover:bg-gray-100' : 'bg-white hover:bg-gray-100'}
            >
              <td className="px-4 py-3">{index + 1}</td>
              <td className="px-4 py-3">
                {new Date(blog.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </td>
              <td className="px-4 py-3">
                <img src={blog.image} alt="post" className="w-16 h-16 object-cover rounded" />
              </td>
              <td className="px-4 py-3">{blog.title}</td>
              <td className="px-4 py-3">{blog.category}</td>
              <td className="px-4 py-3">
                <button
                  onClick={() => handleEdit(blog._id)}
                  className="text-indigo-600 hover:underline font-medium"
                >
                  Edit
                </button>
              </td>
              <td className="px-4 py-3">
                <button
                  onClick={() => handleDelete(blog._id)}
                  className="text-red-600 hover:underline font-medium"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</div>

  );
};

export default DashPost;
