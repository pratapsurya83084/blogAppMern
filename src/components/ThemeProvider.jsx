// import React, { useEffect } from "react";
// import { useSelector } from "react-redux";
// const ThemeProvider = ({ children }) => {
//   const { theme } = useSelector((state) => state.theme);

//   useEffect(() => {
//     const root = document.documentElement;
//     if (theme === "dark") {
//       root.classList.add("dark");
//     } else {
//       root.classList.remove("dark");
//     }
//   }, [theme]);

//   return (
//     <div
//       className={`${
//         theme === "dark"
//           ? "dark bg-[rgb(16,23,42)] text-gray-200"
//           : "bg-white text-gray-700"
//       } min-h-screen`}
//     >
//       <div className=" ">{children}</div>
//     </div>
//   );
// };

// export default ThemeProvider;
import { useEffect } from "react";
import { useSelector } from "react-redux";

const ThemeProvider = ({ children }) => {
  const { theme } = useSelector((state) => state.theme);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  return <>{children}</>;
};

export default ThemeProvider;
