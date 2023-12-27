import React, { useEffect } from "react";
import { useLinkAnimation,AnimationType } from "../hooks/useLinkAnimation";
import { BASE_URL } from "../../constants/constants";
import { useRedirectContext } from "../contexts/RedirectContext";

const Nav: React.FC = () => {
  const {isRedirecting} = useRedirectContext();
  const {handleLinkClick, animateLinksReverse} = useLinkAnimation([".nav-link" ],AnimationType.SlideIn,AnimationType.SlideOut, 250, 250);
  useEffect(() => {
    if (isRedirecting) animateLinksReverse();
  }, [isRedirecting]);

  return (
    <nav className=" absolute top-0  w-full  bg-transparent  z-10 overflow-hidden">
      <div className="max-w-4x1 mx-auto">
        <ul className="flex justify-around list-none text-white font-semibold">
          <li className="nav-link transition-transform transform -translate-y-full duration-1000 ">
            <button
              className="block p-4  font-semibold cursor-pointer hover:scale-110 text-opacity-75 text-whiteBlue"
              onClick={() => handleLinkClick("")}
            >
              Home
            </button>
          </li>
          <li className="nav-link transition-transform transform -translate-y-full duration-1000">
            <button
              className="block p-4  font-semibold cursor-pointer hover:scale-110  text-opacity-75 text-whiteBlue"
              onClick={() => handleLinkClick("about")}
            >
              About
            </button>
          </li>
          <li className="nav-link transition-transform transform -translate-y-full duration-1000 ">
            <button
              className="block p-4  font-semibold cursor-pointer hover:scale-110
              text-opacity-75 text-whiteBlue
              "
              onClick={() => handleLinkClick("projects")}
            >
              Projects
            </button>
          </li>
          <li
            className="nav-link transition-transform transform -translate-y-full duration-1000 
          text-opacity-75 text-whiteBlue
          "
          >
            <button
              className="block p-4  font-semibold cursor-pointer hover:scale-110  "
              onClick={() => handleLinkClick("contact")}
            >
              Contact
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
