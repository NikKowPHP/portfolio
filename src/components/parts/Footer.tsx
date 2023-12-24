import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRedirectContext } from "../contexts/RedirectContext";
import { svg } from "../../assets/images/svg/svg";

const Footer: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [navLinks, setNavLinks] = useState<HTMLElement[]>([]);
  const { setIsRedirecting } = useRedirectContext();

  const animateNavLinks = () => {
    navLinks.forEach((link, idx) => {
      setTimeout(() => {
        link.style.transform = "translateY(0)";
      }, 3000 + idx * 400);
    });
  };
  const animateNavLinksReverse = (): Promise<boolean> => {
    return new Promise((resolve) => {
      let completedAnimations = 0;
      navLinks.forEach((link, idx) => {
        setTimeout(() => {
          link.style.transform = "translateY(-100%)";
          completedAnimations++;
          if (completedAnimations === navLinks.length) {
            resolve(true);
          }
        }, idx * 400);
      });
    });
  };
  const handleLinkClick = async (navLink: string) => {
    setIsRedirecting(true);
    await animateNavLinksReverse();
    navigate(navLink);
    setIsRedirecting(false);
  };
  useEffect(() => {
    animateNavLinks();
  }, [navLinks, location.pathname]);

  useEffect(() => {
    const navLinks = document.querySelectorAll<HTMLElement>(".nav-link");
    const navLinksArray: HTMLElement[] = Array.from(navLinks);
    setNavLinks(navLinksArray);
  }, []);

  return (
    <footer className="bg-transparent text-white">
      <div className="container">
        <ul className="flex flex-around">
          <li>
            <a className="text-white" href="in/mikita-kavaliou-390b62236">{svg.linkedIn}</a>
          </li>
          <li>
            <a href="https://github.com/NikKowPHP">{svg.github}</a>
          </li>
        </ul>
      </div>
    </footer>
  );

  return (
    <nav className=" absolute top-0  w-full  bg-transparent  z-10">
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

export default Footer;
