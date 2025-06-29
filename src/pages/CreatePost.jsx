



import React, { useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import { marked } from "marked";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Slugify function to clean title for URL
const slugify = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const url="https://blog-mern-api-3.onrender.com/api"


const CreatePost = () => {
  const [value, setValue] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = e.target.title.value.trim();
    const category = e.target.category.value;

    if (!file) {
      toast.error("Please upload an image");
      return;
    }

    const htmlContent = marked.parse(value);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("content", htmlContent);
    formData.append("image", file);

    try {
      setLoading(true);

      const response = await axios.post(
        `${url}/post/create-post`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        const slug = slugify(title);
        setTimeout(() => navigate(`/post/${slug}`), 1500);
      } else {
        toast.error(response.data.message || "Something went wrong.");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to create post. Try again."
      );
      console.error("Error creating post:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="bg-white text-black dark:bg-slate-900 dark:text-gray-200">
      <div className=" p-4 max-w-4xl lg:max-w-7xl mx-auto min-h-screen">
      <ToastContainer position="top-right" autoClose={4000} />
      <h1 className="text-2xl font-bold mb-4">Create Post</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="border p-2 w-full text-black"
          required
        />

        <select
          name="category"
          required
          className="border p-2 w-full text-black"
        >
          <option value="">Select Category</option>
          <option value="reactjs">ReactJS</option>
          <option value="nodeJS">NodeJS</option>
          <option value="sport">Sport</option>
          <option value="nature">Nature</option>
          <option value="health">Health</option>
          <option value="technology">Technology</option>
        </select>

        <input
          type="file"
          name="image"
          onChange={handleImageChange}
          accept="image/*"
          required
        />

        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-40 h-40 object-cover rounded mt-2"
          />
        )}

        <div data-color-mode="light">
          <MDEditor value={value} onChange={setValue} height={300} />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-60"
        >
          {loading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
              Loading...
            </>
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </div>
  </div>
  );
};

export default CreatePost;
