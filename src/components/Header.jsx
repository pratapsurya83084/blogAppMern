import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaBars, FaTimes, FaMoon, FaSun } from "react-icons/fa";
import { useSelector ,useDispatch} from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [mode, setMode] = useState("light");
  const { currentUser } = useSelector((state) => state.user);
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch();
   const {theme}=useSelector((state)=>state.theme)
  // console.log(currentUser?.user);
// console.log(theme);


  return (
    <header
      className={`${theme==="light"?"dark:text-gray-200 dark:bg-[rgb(16,23,42)] ":"text-black bg-white shadow-lg"} shadow-[0_2px_4px_rgba(255,255,255,0.2)]   p-4 sticky top-0 z-50`}
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
          className="hidden md:flex  space-x-6 items-center">
          <Link to="/" className=" hover:text-indigo-500">
            Home
          </Link>
          <Link to="/about" className=" hover:text-indigo-500">
            About
          </Link>
          <Link to="/project" className=" hover:text-indigo-500">
            Projects
          </Link>
          <Link to="/dashboard?tab=profile" className=" hover:text-indigo-500">
            Dashboard
          </Link>

          {/* Sign Up Button */}
          {currentUser?.user ? (
            <div
              className="relative"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-indigo-500">
                <img
                  src={currentUser?.user.picture || currentUser?.user.ProfilePicture}
                  alt="profile"
                  className="w-full h-full object-cover"
                />
              </div>

              {isHovered && (
                <div className="absolute right-0 mt- w-48 bg-white border border-gray-200 rounded shadow-lg z-50">
                  <div className="px-4 py-2 text-sm text-gray-700 border-b font-medium">
                    Welcome {currentUser.user.username}
                  </div>
                  <Link
                    to="/dashboard?tab=profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  <button
                    // onClick={handleSignOut}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="inline-block p-[1.5px] bg-gradient-to-r from-indigo-500 via-pink-500 to-purple-500 rounded">
              <Link
                to="/sign-up"
                className="block px-2 py-1  text- text-xs rounded hover:transition "
              >
                Sign Up
              </Link>
            </div>
          )}

          {/* Dark Mode Toggle */}
         <button onClick={()=> dispatch(toggleTheme())} className="text-xl text-gray-600">
            {theme === "light" ? <FaSun /> : <FaMoon />}
          </button>
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center space-x-3">
          <FaSearch className="text-gray-600 text-xl" />
          {currentUser?.user ? (
            <div
              className="relative"
              onMouseMove={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-indigo-500">
                <img
                  src={currentUser.user.picture||currentUser?.user.ProfilePicture}
                  alt="profile"
                  className="w-full h-full object-cover"
                />
              </div>

              {isHovered && (
                <div className="absolute right-0 mt- w-48 bg-white  dark:text-gray-100  border border-gray-200 rounded shadow-lg z-50">
                  <div className="px-4 py-2 text-sm text-gray-700 border-b font-medium">
                    {currentUser.user.username}
                  </div>
                  <Link
                    to="/dashboard?tab=profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  <button
                    // onClick={handleSignOut}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="inline-block p-[1.5px] bg-gradient-to-r from-indigo-500 via-pink-500 to-purple-500 rounded">
              <Link
                to="/sign-up"
                className="block px-2 py-1  text- text-xs rounded hover:transition "
              >
                Sign Up
              </Link>
            </div>
          )}

          <button onClick={()=> dispatch(toggleTheme())} className="text-xl text-gray-600">
            {theme === "light" ? <FaSun /> : <FaMoon />}
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
          className="md:hidden mt-2 px-4 pb-4 space-y-2 ">
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
