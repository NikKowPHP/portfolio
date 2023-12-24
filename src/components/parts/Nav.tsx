import React from "react";
import { useLinkAnimation } from "../hooks/useLinkAnimation";

const Nav: React.FC = () => {
  const {handleLinkClick} = useLinkAnimation([".nav-link", ".footer-link"], 400, 400);

  return (
    <nav className=" absolute top-0  w-full  bg-transparent  z-10 overflow-hidden">
      <div className="max-w-4x1 mx-auto">
        <ul className="flex justify-around list-none text-white font-semibold">
          <li className="nav-link transition-transform transform -translate-y-full duration-1000 ">
            <span
              className="block p-4  font-semibold cursor-pointer hover:scale-110 text-opacity-75 text-whiteBlue"
              onClick={() => handleLinkClick("welcome")}
            >
              Home
            </span>
          </li>
          <li className="nav-link transition-transform transform -translate-y-full duration-1000">
            <span
              className="block p-4  font-semibold cursor-pointer hover:scale-110  text-opacity-75 text-whiteBlue"
              onClick={() => handleLinkClick("about")}
            >
              About
            </span>
          </li>
          <li className="nav-link transition-transform transform -translate-y-full duration-1000 ">
            <span
              className="block p-4  font-semibold cursor-pointer hover:scale-110
              text-opacity-75 text-whiteBlue
              "
              onClick={() => handleLinkClick("projects")}
            >
              Projects
            </span>
          </li>
          <li
            className="nav-link transition-transform transform -translate-y-full duration-1000 
          text-opacity-75 text-whiteBlue
          "
          >
            <span
              className="block p-4  font-semibold cursor-pointer hover:scale-110  "
              onClick={() => handleLinkClick("contact")}
            >
              Contact
            </span>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
