import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  SignInSuccess,
  signInFailure,
} from "../redux/user/userSlice";

import OAuth from "../components/OAuth";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [Loading , setLoading]=useState(false)
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { Loading ,currentUser} = useSelector((state) => state.user);
// console.log(currentUser);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !email) {
      toast.error("please fill out all fields");
      return;
    }
    console.log("Submit form:", { email, password });
    // Add your signup logic here
    try {
      dispatch(signInStart())

      const api = await axios.post(
        `http://localhost:4000/api/auth/signin`,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      // console.log("signin suceess :", api.data.success);
      if (api.data.success == false) {
        toast.error(api.data.message);
        dispatch(signInFailure("please fill the form with correct credential"));
      } else {
        toast.success(api.data.message);
        dispatch(SignInSuccess(api.data));
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }

  
    } catch (error) {
      console.log("error while fetching signup api:", error);
      dispatch(signInFailure());
      toast.error("An error occurred during sign-in");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <ToastContainer
        position="top-right"
        autoClose="2000"
        hideProgressBar="false"
      />
      {/* Left Side        i remove = bg-indigo-100 */}
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
          <h1 className="text-4xl font-extrabold dark:text-indigo-700 mb-4">
            Pratap's Blog
          </h1>
          <p className=" max-w-md mx-auto">
            This is a blog website. You can sign In with your email and password
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
          className="w-full max-w-md bg-gray-50 shadow-xl rounded-xl p-6 md:p-8 space-y-6 relative z-10"
        >
          <h2 className="text-2xl font-bold text-center text-gray-800">
            SignIn
          </h2>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <button
            type="submit"
            disabled={Loading}
            className="w-full bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 text-white py-2 rounded hover:brightness-110 transition font-semibold"
          >
            {Loading ? "Signing up..." : "Signin"}
          </button>

          <div className="flex items-center justify-center text-sm text-gray-500">
            or
          </div>
<OAuth/>

          <p className="text-sm">
            Have an not account?{" "}
            <Link to="/sign-up">
              <span className="text-blue-500">Sign up</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signin;
