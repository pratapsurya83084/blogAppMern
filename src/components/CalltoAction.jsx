import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast ,Toaster} from "react-hot-toast";
const url="https://blog-mern-api-3.onrender.com/api"
const CalltoAction = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
const [Loading ,setLoading]=useState(false);

  const handleSubscribe = async () => {
    if (!email) {
      setMessage("Please enter a valid email.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${url}/user/subscribe/sendmail`,
        {
          email,
        }
      );
      console.log(response.data);

      if (response.data.success) {
        setMessage("Thank you for subscribing!");
        toast.success("Thank you for subscribing!");
        setEmail("");
        setLoading(false)
      } else {
        setMessage("Something went wrong. Please try again later.");
        setLoading(false);
      }
    } catch (error) {
      const msg = error.response?.data?.message || "Something went wrong!";
      console.error("Subscription error:", msg);
      toast.error(msg); // Show error toast
      setMessage("Failed to subscribe. Try again later.");
      setLoading(false)
    }
  };

  return (
    <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-12 px-6 rounded-tl-3xl rounded-br-3xl shadow-lg my-12 mx-auto max-w-5xl">
 <Toaster position="top-right" reverseOrder={false} />
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Enjoying our Blogs?
        </h2>
        <p className="text-lg md:text-xl mb-6">
          Subscribe to our newsletter and never miss an update from your
          favorite authors.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full sm:w-80 px-4 py-2 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            onClick={handleSubscribe}
            className="bg-white text-indigo-700 font-semibold px-6 py-2 rounded-md hover:bg-gray-200 transition-all"
          >
           {
            Loading ? "Loading ...":" Subscribe"
           }
          </button>
        </div>

        {message && <p className="mt-4 text-sm text-yellow-100">{message}</p>}

        <p className="mt-6">
          or{" "}
          <Link
            to="/allpost"
            className="underline font-semibold hover:text-yellow-200"
          >
            Explore more blogs →
          </Link>
        </p>
      </div>
    </section>
  );
};

export default CalltoAction;
