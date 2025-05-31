/** @type {import('tailwindcss').Config} */
export default {
content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
}




 {/* Renders formatted HTML */}
    //   <div
    //     className="prose max-w-none"
    //     dangerouslySetInnerHTML={{ __html: blog.content }}
    //   />
    // </div>