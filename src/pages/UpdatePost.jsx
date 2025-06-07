import React, { useState, useEffect } from "react";
import MDEditor from "@uiw/react-md-editor";
import { marked } from "marked";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TurndownService from "turndown";
import { useSelector } from "react-redux";
// Slugify function to clean title for URL
const slugify = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const UpdatePost = () => {
  const [value, setValue] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { postId } = useParams();
  // console.log(file.name);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    content: "",
    image: "",
  });
  const { currentUser } = useSelector((state) => state.user);
  const turndownService = new TurndownService();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const apiRes = await axios.get(
          `http://localhost:4000/api/post/getallpost?postId=${postId}`,
          {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true,
          }
        );

        const fetchedData = apiRes.data.BlogPost[0];
        const markdownContent = turndownService.turndown(
          fetchedData?.content || ""
        );

        setFormData({
          title: fetchedData?.title || "",
          category: fetchedData?.category || "",
          image: fetchedData?.image || "",
          content: markdownContent,
        });

        setValue(markdownContent);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPost();
  }, [postId]);

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = e.target.title.value.trim();
    const category = e.target.category.value;

    const contentMarkdown = value;
    const htmlContent = marked.parse(contentMarkdown);

    const postFormData = new FormData();
    postFormData.append("title", title);
    postFormData.append("category", category);
    postFormData.append("content", htmlContent);
    if (file) postFormData.append("image", file);
    const userId = currentUser.user._id;
    // console.log(userId);

    try {
      setLoading(true);
      // console.log(postFormData.title);

      const response = await axios.put(
        `http://localhost:4000/api/post/updatepost/${postId}/${userId}`,
        postFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      console.log(response.data);

      if (response.data.success) {
        toast.success(response.data.message);
        const slug = slugify(title);
        setTimeout(() => navigate(`/post/${slug}`), 1500);
      } else {
        // console.log(response.data.token);
        
        if (response.data.token) {
          toast.error(response.data.message || "Something went wrong.");
          setTimeout(() => {
            navigate("/sign-in");
          }, 2000);
        }
        //  console.log(response.data.message);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to update post. Try again."
      );

      console.error("Error updating post:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-4xl lg:max-w-7xl mx-auto min-h-screen">
      <ToastContainer position="top-right" autoClose={4000} />
      <h1 className="text-2xl font-bold mb-4">Update Post</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={formData?.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Title"
          className="border p-2 w-full text-black"
          required
        />

        <select
          name="category"
          value={formData?.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
          required
          className="border p-2 w-full text-black"
        >
          <option value="">Select Category</option>
          <option value="Reactjs">ReactJS</option>
          <option value="NodeJS">NodeJS</option>
          <option value="Sport">Sport</option>
          <option value="Nature">Nature</option>
          <option value="Health">Health</option>
          <option value="Technology">Technology</option>
        </select>

        <input
          type="file"
          name="image"
          onChange={handleImageChange}
          accept="image/*"
        />

        {(preview || formData.image) && (
          <img
            src={preview || formData?.image}
            alt="Preview"
            className="w-40 h-40 object-cover rounded mt-2"
          />
        )}

        <div data-color-mode="light">
          <MDEditor
            value={value}
            onChange={(newVal) => {
              setValue(newVal);
              setFormData({ ...formData, content: newVal });
            }}
            height={300}
          />
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
            "Update"
          )}
        </button>
      </form>
    </div>
  );
};

export default UpdatePost;
