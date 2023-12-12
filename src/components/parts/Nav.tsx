import React, { useEffect } from "react";

const Nav: React.FC = () => {
  useEffect(() => {
    const animateNavLinks = () => {
      const navLinks = document.querySelectorAll<HTMLElement>(".nav-link");
      const navLinksArray: HTMLElement[] = Array.from(navLinks);

      navLinksArray.forEach((link, idx) => {
        setTimeout(() => {
          link.style.transform = "translateY(0)";
        }, 3000 + idx * 400);
      });
    };
    animateNavLinks();
  }, []);

  return (
    <div className="absolute top-0  w-full  bg-transparent  z-10">
      <nav className="max-w-4x1 mx-auto">
        <ul className="flex justify-around list-none text-white">
          <li className="nav-link p-4 transition-transform transform -translate-y-full duration-1000  hover:scale-110 hover:bg-gray-700 hover:text-blue-500">
            About
          </li>
          <li className="nav-link p-4 transition-transform transform  -translate-y-full duration-1000 hover:scale-110 hover:bg-gray-700 hover:text-blue-500">
            Projects
          </li>
          <li className="nav-link p-4 transition-transform transform  -translate-y-full duration-1000 hover:scale-110 hover:bg-gray-700 hover:text-blue-500">
            Contact
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
