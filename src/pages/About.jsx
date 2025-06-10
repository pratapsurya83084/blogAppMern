import React from 'react';

const About = () => {
  return (
    <div className=" bg-white text-black dark:bg-slate-900 dark:text-gray-200 bg-gradient-to-b from- py-20 px-6">
      <div className="max-w-6xl mx-auto ">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
          About <span className="text-blue-600">Our Blog</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg text-center  max-w-3xl mx-auto mb-14">
          We’re passionate about writing meaningful content to help readers stay informed, inspired, and engaged. Welcome to your new favorite corner of the internet.
        </p>

        {/* Two Column Section */}
   <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch">
  {/* Card 1 */}
  <div className="bg- p-8 rounded-xl shadow-md border hover:shadow-lg transition duration-300 h-full flex flex-col">
    <h2 className="text-2xl font-semibold mb-4 text-blue-700">🌟 Our Mission</h2>
    <p className="leading-relaxed flex-grow">
      We aim to create a community where curiosity thrives. Whether you’re a developer, entrepreneur, or casual reader, our mission is to provide well-researched, valuable insights that help you grow and stay ahead.
    </p>
  </div>

  {/* Card 2 */}
  <div className="bg- p-8 rounded-xl shadow-md border hover:shadow-lg transition duration-300 h-full flex flex-col">
    <h2 className="text-2xl font-semibold mb-4 text-blue-700">📝 Why We Blog</h2>
    <p className="leading-relaxed flex-grow">
      We believe that good writing sparks great ideas. This blog is our creative outlet to share knowledge, explore trends, and contribute to meaningful conversations—one post at a time.
    </p>
  </div>
</div>


        {/* Quote or Highlight */}
        <div className="mt-16 bg-blue-100 border p-6 md:p-10 rounded-xl text-center max-w-4xl mx-auto">
          <p className="text-xl italic text-blue-900 font-medium">
            “Blogging is not just about writing—it's about making an impact.”
          </p>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <h3 className="text-xl font-semibold mb-2">📬 Stay Connected</h3>
          <p className="">
            Follow us on social media or subscribe for fresh posts every week!
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
