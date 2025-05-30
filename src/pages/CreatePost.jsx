import React, { useState } from 'react';
import MDEditor from '@uiw/react-md-editor';

const CreatePost = () => {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const category = e.target.category.value;
    console.log({ title, category, content: value });
  };

  return (
    <div className=" p-4 max-w-4xl lg:max-w-7xl mx-auto  min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Create Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="border p-2 w-full text-black"
          required
        />
        <select
          name="category"
          required
          className="border p-2 w-full text-black"
        >
          <option value="">Select Category</option>
          <option value="reactjs">ReactJS</option>
        </select>
        <input type="file" name="image" accept="image/*" />

        <div data-color-mode="light" className=''>
          <MDEditor
            value={value}
            onChange={setValue}
            className=" h-[400px]"
            height={300}
          />
        </div>

        <button type="submit" className="bg-indigo-600 text-white p-2 rounded">
          Submit Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
