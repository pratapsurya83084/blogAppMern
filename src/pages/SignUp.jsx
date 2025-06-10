import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import {useSelector}  from 'react-redux';


const url="https://blog-mern-api-3.onrender.com/api"

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Loading, setLoading] = useState(false);
  const navigate = useNavigate();
 const {theme}=useSelector((state)=>state.theme)

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !email || !email) {
      toast.error("please fill out all fields");
    }
    // console.log("Submit form:", { username, email, password });
    // Add your signup logic here
    try {
      setLoading(true);
      const api = await axios.post(
        `${url}/auth/signup`,
        { username, email, password },
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      console.log("signup suceess :", api.data.success);
      if (api.data.success == false) {
        toast.error("User already exist with that email");
      } else {
        toast.success("User created successfully");
        navigate("/sign-in");
      }
      setLoading(false);
    } catch (error) { 
      console.log("error while fetching signup api:", error);
      setLoading(false);
    }
  };

  return (
    <div className="bg-white text-black dark:bg-slate-900 dark:text-gray-200 min-h-screen flex flex-col md:flex-row mb-">
      <ToastContainer
        position="top-right"
        autoClose="2000"
        hideProgressBar="false"
      />
      {/* Left Side */}
      <div className="w-full md:w-1/2 relative  flex flex-col justify-center items-center p-8">
        <svg
          className="absolute top-0 left-0 w-full h-full object-cover opacity-20"
          viewBox="0 0 1024 1024"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="512" cy="512" r="400" fill="url(#grad)" />
          <defs>
            <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#6366F1" />
              <stop offset="100%" stopColor="#EC4899" />
            </linearGradient>
          </defs>
        </svg>

        <div className="relative z-10 text-center">
          <h1 className="text-4xl font-extrabold text-indigo-600 mb-4">
            Pratap's Blog
          </h1>
          <p className=" max-w-md mx-auto">
            This is a blog website. You can sign up with your email and password
            or continue with Google.
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full md:w-1/2 relative flex items-center justify-center  p-6 md:p-10 overflow-hidden">
        <svg
          className="absolute -top-20 -right-20 w-[500px] h-[500px] opacity-10"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#a78bfa"
            d="M37.3,-62.5C50.4,-55.1,64.3,-50.5,70.7,-40.5C77.2,-30.5,76.2,-15.2,75.2,-0.2C74.2,14.8,73.2,29.6,66.7,42.3C60.2,54.9,48.1,65.4,34.3,71.1C20.5,76.8,5.2,77.7,-8.4,72.6C-22.1,67.5,-34.1,56.3,-45.2,45.3C-56.3,34.3,-66.5,23.5,-66.4,12.5C-66.2,1.5,-55.6,-9.6,-49.6,-21.2C-43.6,-32.7,-42.1,-44.6,-34.8,-53.3C-27.6,-62.1,-13.8,-67.8,0.8,-69C15.4,-70.3,30.7,-67.9,37.3,-62.5Z"
            transform="translate(100 100)"
          />
        </svg>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md dark:border shadow-xl rounded-xl p-6 md:p-8 space-y-6 relative z-10"
        >
          <h2 className="text-2xl font-bold text-center ">Create an Account</h2>

          <input
            type="text"
            placeholder="Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={` text-black  w-full  px-4 py-2 border  rounded focus:outline-none focus:ring-2 focus:ring-indigo-500`}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="text-black  w-full px-4 py-2 border  rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="text-black  w-full px-4 py-2 border  rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <button
            type="submit"
            disabled={Loading}
            className="w-full bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 text-white py-2 rounded hover:brightness-110 transition font-semibold"
          >
            {Loading ? "Signing up..." : "Signup"}
          </button>

          <div className="flex items-center justify-center text-sm text-gray-500">
            or
          </div>
          <OAuth />

          <p className="text-sm">
            Have an account?{" "}
            <Link to="/sign-in">
              <span className="text-blue-500">Sign in</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
