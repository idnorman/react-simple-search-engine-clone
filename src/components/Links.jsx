import React from "react";
import { NavLink } from "react-router-dom";

const links = [
  { url: "/search", text: "🔍 All" },
  { url: "/images", text: "🖼️ Images" },
];

export const Links = () => {
  let activeClassName =
    "text-blue-700 border-b-2 dark:text-blue-300 border-blue-700 pb-2";
  return (
    <div className="flex sm:justify-around justify-between items-center mt-4">
      {links.map(({ url, text }, index) => (
        <NavLink
          to={url}
          key={index}
          className={({ isActive }) => {
            let className = "px-2 ";
            if (isActive) {
              className += activeClassName;
            }
            return className;
          }}
        >
          {text}
        </NavLink>
      ))}
    </div>
  );
};
