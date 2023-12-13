import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Nav: React.FC = () => {
  const navigate = useNavigate();
  const [navLinks, setNavLinks] = useState<HTMLElement[]>([]);

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
            resolve(true)
          }
        }, idx * 400);
      });
    });
  };
  const handleLinkClick = async (navLink: string) => {
    await animateNavLinksReverse();
    navigate(navLink);
  };
  useEffect(() => {
    animateNavLinks();
  }, [navLinks]);

  useEffect(() => {
    const navLinks = document.querySelectorAll<HTMLElement>(".nav-link");
    const navLinksArray: HTMLElement[] = Array.from(navLinks);
    setNavLinks(navLinksArray);
  }, []);

  return (
    <nav className=" absolute top-0  w-full  bg-transparent  z-10">
      <div className="max-w-4x1 mx-auto">
        <ul className="flex justify-around list-none text-white font-semibold">
          <li className="nav-link p-4 transition-transform transform -translate-y-full duration-1000 hover:text-lg font-semibold  ">
            <span onClick={() => handleLinkClick("/welcome")}>Home</span>
          </li>
          <li className="nav-link p-4 transition-transform transform -translate-y-full duration-1000 hover:text-lg font-semibold  ">
            <span onClick={() => handleLinkClick("/about")}>About</span>
          </li>
          <li className="nav-link p-4 transition-transform transform  -translate-y-full duration-1000 hover:scale-110 font-semibold">
            <span onClick={() => handleLinkClick("/projects")}>Projects</span>
          </li>
          <li className="nav-link hover:scale-110 p-4 transition-transform transform  -translate-y-full duration-1000 font-semibold ">
            <span onClick={() => handleLinkClick("/contact")}>Contact</span>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
