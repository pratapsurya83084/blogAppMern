import { FaGithub, FaLinkedin, FaDiscord, FaTwitter } from 'react-icons/fa';
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className=" text-sm">
      <p className="h-1 bg-teal-500 "></p>

      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        {/* About */}
        <div>
          <h3 className="text-lg font-semibold text-indigo-500 mb-4">About</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:underline">Pratap's Blogs</Link></li>
            <li><Link to="/" className="hover:underline">Projects</Link></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="text-lg font-semibold text-indigo-500 mb-4">Legal</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:underline">Privacy Policy</Link></li>
            <li><Link to="/" className="hover:underline">Terms</Link></li>
          </ul>
        </div>

        {/* Follow Us */}
        <div>
          <h3 className="text-lg font-semibold text-indigo-500 mb-4">Follow Us</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="flex items-center justify-center gap-1 hover:underline"><FaGithub /> GitHub</Link></li>
            <li><Link to="/" className="flex items-center justify-center gap-1 hover:underline"><FaDiscord /> Discord</Link></li>
            <li><Link to="/" className="flex items-center justify-center gap-1 hover:underline"><FaLinkedin /> LinkedIn</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t py-4">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="mb-2">&copy; {new Date().getFullYear()} Pratap. All rights reserved.</p>
          <div className="flex justify-center space-x-4">
            <Link to="/" className="hover:text-indigo-500"><FaTwitter size={20} /></Link>
            <Link to="/" className="hover:text-indigo-500"><FaLinkedin size={20} /></Link>
            <Link to="/" className="hover:text-indigo-500"><FaGithub size={20} /></Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
