import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaBars, FaTimes, FaMoon, FaSun } from "react-icons/fa";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Toggle dark mode for body
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };
  console.log(darkMode);

  return (
    <header
      className={`${
        !darkMode
          ? "text-black bg-white"
          : "text-white bg-black shadow-[0_2px_4px_rgba(255,255,255,0.2)]"
      } shadow-md p-4 sticky top-0 z-50`}
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="lg:text-xl font-bold ">
          <span className="px-2 py-1 rounded bg-gradient-to-r from-indigo-500 via-pink-400 to-purple-500 text-white">
            Pratap
          </span>{" "}
          Blogs
        </Link>

        {/* Search Input (desktop only) */}
        <div className="hidden lg:flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search here..."
            className="px-2 py-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <FaSearch className="text-gray-600 text-xl" />
        </div>

        {/* Desktop Menu */}
        <nav
          className={`hidden md:flex ${
            darkMode ? "text-white" || "bg-black" : "text-black" || "bg-white"
          } space-x-6 items-center`}
        >
          <Link to="/" className=" hover:text-indigo-500">
            Home
          </Link>
          <Link to="/about" className=" hover:text-indigo-500">
            About
          </Link>
          <Link to="/project" className=" hover:text-indigo-500">
            Projects
          </Link>
          <Link to="/dashboard" className=" hover:text-indigo-500">
            Dashboard
          </Link>

          {/* Sign Up Button */}
          <Link
            to="/sign-up"
            className="px-4 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition text-sm"
          >
            Sign Up
          </Link>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="text-xl text-gray-600"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center space-x-3">
          <FaSearch className="text-gray-600 text-xl" />
          <div className="inline-block p-[1.5px] bg-gradient-to-r from-indigo-500 via-pink-500 to-purple-500 rounded">
            <Link
              to="/sign-up"
              className="block px-2 py-1  text- text-xs rounded hover:transition "
            >
              Sign Up
            </Link>
          </div>

          <button onClick={toggleDarkMode} className="text-xl text-gray-600">
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <FaTimes className="text-gray-600 text-xl" />
            ) : (
              <FaBars className="text-gray-600 text-xl" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Items */}
      {menuOpen && (
        <div
          className={`md:hidden mt-2 px-4 pb-4 space-y-2 ${
            darkMode ? "text-white" || "bg-black" : "text-black" || "bg-white"
          }  rounded `}
        >
          <Link to="/" className="block ">
            Home
          </Link>
          <Link to="/about" className="block ">
            About
          </Link>
          <Link to="/project" className="block ">
            Projects
          </Link>
          <Link to="/dashboard" className="block ">
            Dashboard
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
