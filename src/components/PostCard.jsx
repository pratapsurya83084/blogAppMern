import React from 'react';
import { Link } from 'react-router-dom';

const PostCard = ({ post }) => {
  return (
    <div className="max-w-sm rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group relative h-full border dark:border">
      <Link to={`/post/${post.slug}`}>
        <img
          src={post.image}
          alt="Post banner"
          className="w-full h-40 object-cover"
        />
      </Link>

     <div className="p-4">
  <div className="flex justify-between items-center text-xs text-gray-500 mb-1">
    <span className="uppercase text-indigo-600 font-semibold">{post.category}</span>
    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
  </div>

  {/* Slug title with hover-trigger for Read More */}
  <div className="group">
    <h2 className="text-lg font-semibold mb-2 line-clamp-2">
      {decodeURIComponent(post.slug.replace(/-/g, ' '))}
    </h2>

    {/* Read More Button (shows only on hover of title container) */}
    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <Link
        to={`/post/${post.slug}`}
        className="inline-block bg-indigo-600 text-white px-4 py-2 text-sm rounded-md hover:bg-indigo-700"
      >
        Read More
      </Link>
    </div>
    
  </div>
</div>


    </div>
  );
};

export default PostCard;
