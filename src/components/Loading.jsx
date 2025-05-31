import React from "react";

const Loading = () => {
  return (
    <div>
      <div className="flex justify-center items-center h-64">
        <div className="flex flex-col items-center gap-2">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-600 font-medium">Loading posts...</p>
        </div>
      </div>
    </div>
  );
};

export default Loading;
