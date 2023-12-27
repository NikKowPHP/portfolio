import React, { useEffect } from "react";
import { useLinkAnimation, AnimationType } from "../hooks/useLinkAnimation";
import { useRedirectContext } from "../contexts/RedirectContext";
import { useLocation } from "react-router-dom";

interface NavLink {
  link: string;
  path: string;
}

const Nav: React.FC = () => {
  const { isRedirecting } = useRedirectContext();
  const { handleLinkClick, animateLinksReverse } = useLinkAnimation(
    [".nav-link"],
    AnimationType.SlideIn,
    AnimationType.SlideOut,
    250,
    250
  );
  const location = useLocation();
  const currentLocation = location.pathname;
  const currentPage = currentLocation.split("/").slice(2, 3).toLocaleString();

  useEffect(() => {
    if (isRedirecting) animateLinksReverse();
  }, [isRedirecting]);

  const navLinks: { [key: string]: NavLink } = {
    home: { link: "welcome", path: "Home" },
    about: { link: "about", path: "About" },
    projects: { link: "projects", path: "Projects" },
    contact: { link: "contact", path: "Projects" },
  };

  const handleClick = (link: string) => {
    if (currentPage !== link) {
      handleLinkClick(link);
    }
  };

  return (
    <nav className=" absolute top-0  w-full  bg-transparent  z-10 overflow-hidden">
      <div className="max-w-4x1 mx-auto">
        <ul className="flex justify-around list-none text-white font-semibold">
          {currentLocation &&
            Object.keys(navLinks).map((key) => {
              const { link, path } = navLinks[key];
              return (
                <li
                  key={key}
                  className="nav-link transition-transform transform -translate-y-full duration-1000 "
                >
                  <button
                    className="block p-4  font-semibold cursor-pointer hover:scale-110 text-opacity-75 text-whiteBlue "
                    disabled={currentPage === link}
                    onClick={() => handleClick(link)}
                  >
                    {path}
                  </button>
                </li>
              );
            })}
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
