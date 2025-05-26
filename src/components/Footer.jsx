import { FaGithub, FaLinkedin, FaDiscord, FaTwitter } from 'react-icons/fa';
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className=" ">
        <p className=' h-1 bg-teal-500'></p>
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
        {/* About */}
        <div>
          <h3 className="text-2xl font-bold mb-6 text-indigo-400">About</h3>
          <ul className="space-y-3 text-lg">
            <li><Link to="/" className="hover:underline">Pratap's Blogs</Link></li>
            <li><Link to="/" className="hover:underline">Projects</Link></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="text-2xl font-bold mb-6 text-indigo-400">Legal</h3>
          <ul className="space-y-3 text-lg">
            <li><Link to="/" className="hover:underline">Privacy Policy</Link></li>
            <li><Link to="/" className="hover:underline">Terms & Conditions</Link></li>
          </ul>
        </div>

        {/* Follow Us */}
        <div>
          <h3 className="text-2xl font-bold mb-6 text-indigo-400">Follow Us</h3>
          <ul className="space-y-3 text-lg">
            <li><Link to="/" className="hover:underline flex justify-center items-center gap-2"><FaGithub /> GitHub</Link></li>
            <li><Link to="/" className="hover:underline flex justify-center items-center gap-2"><FaDiscord /> Discord</Link></li>
            <li><Link to="/" className="hover:underline flex justify-center items-center gap-2"><FaLinkedin /> LinkedIn</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom Social Icons */}
      <div className="border-t  py-6">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className=" text-base mb-4">&copy; {new Date().getFullYear()} Pratap. All rights reserved.</p>
          <div className="flex justify-center space-x-6">
            <Link to="/" className=" hover:text-gray-400"><FaTwitter size={24} /></Link>
            <Link to="/" className=" hover:text-gray-400"><FaLinkedin size={24} /></Link>
            <Link to="/" className=" hover:text-gray-400"><FaGithub size={24} /></Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
