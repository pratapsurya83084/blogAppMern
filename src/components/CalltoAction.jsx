import React from "react";
import { Link } from "react-router-dom";
const CalltoAction = () => {
  return (
    <section className="bg-gradient-to-r  from-indigo-600 to-purple-600 text-white py-12 px-6 rounded-tl-3xl rounded-br-3xl shadow-lg my-12 mx-auto max-w-5xl">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Enjoying our Blogs?
        </h2>
        <p className="text-lg md:text-xl mb-6">
          Subscribe to our newsletter and never miss an update from your favorite authors.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full sm:w-80 px-4 py-2 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-white"
          />
          <button className="bg-white text-indigo-700 font-semibold px-6 py-2 rounded-md hover:bg-gray-200 transition-all">
            Subscribe
          </button>
        </div>

        <p className="mt-6">
          or{" "}
          <Link
            to="/blogs"
            className="underline font-semibold hover:text-yellow-200"
          >
            Explore more blogs →
          </Link>
        </p>
      </div>
    </section>
  )
}

export default CalltoAction
