import React from "react";
import { useSelector } from "react-redux";
const ThemeProvider = ({ children }) => {
  const { theme } = useSelector((state) => state.theme);
  return (
    <div
      className={`${
        theme === "light"
          ? "dark:text-gray-200 dark:bg-[rgb(16,23,42)]"
          : "bg-white text-gray-700"
      } min-h-screen`}
    >
      <div className=" ">{children}</div>
    </div>
  );
};

export default ThemeProvider;
