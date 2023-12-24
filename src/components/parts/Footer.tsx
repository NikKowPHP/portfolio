import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRedirectContext } from "../contexts/RedirectContext";
import { svg } from "../../assets/images/svg/svg";

const Footer: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [footerLinks, setFooterLinks] = useState<HTMLElement[]>([]);
  const { setIsRedirecting, isRedirecting } = useRedirectContext();

  const animateFooter = () => {
    footerLinks.forEach((link, idx) => {
      setTimeout(() => {
        link.style.transform = "translateX(0)";
      }, 3000 + idx * 400);
    });
  };
  const animateNavLinksReverse = (): Promise<boolean> => {
    return new Promise((resolve) => {
      let completedAnimations = 0;
      footerLinks.forEach((link, idx) => {
        setTimeout(() => {
          link.style.transform = "translateY(-100%)";
          completedAnimations++;
          if (completedAnimations === footerLinks.length) {
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
    animateFooter();
  }, [footerLinks, location.pathname]);

  useEffect(() => {
    const footerLinks = document.querySelectorAll<HTMLElement>(".footer-link");
    const footerLinksArray: HTMLElement[] = Array.from(footerLinks);
    setFooterLinks(footerLinksArray);
  }, []);

  return (
    <footer className="absolute bottom-0  w-full bg-transparent text-white z-10">
      <div className=" container mx-auto max-w-3xl ">
        <ul className="flex justify-around overflow-hidden">
          <li className="footer-link transition-transform transform translate-y-full duration-1000">
            <a className="p-4 block" href="in/mikita-kavaliou-390b62236">
              {svg.linkedIn}
            </a>
          </li>
          <li className="footer-link transition-transform transform translate-y-full duration-1000 ">
            <a className="block  p-4" href="https://github.com/NikKowPHP">{svg.github}</a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
