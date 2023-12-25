import React from "react";
import { svg } from "../../assets/images/svg/svg";
import { useLinkAnimation } from "../hooks/useLinkAnimation";

interface FooterProps {
	classes: string;
}

const Footer: React.FC<FooterProps> = ({classes}) => {
  const { handleLinkClick } = useLinkAnimation(
    [".footer-link", ".nav-link"],
    400,
    400
  );

  return (
    <footer className={` ${classes} z-10  bottom-0  w-full bg-transparent text-white `}>
      <div className=" container mx-auto max-w-3xl ">
        <ul className="flex justify-around overflow-hidden">
          <li onClick={()=> handleLinkClick("https://www.linkedin.com/in/mikita-kavaliou-390b62236/", true)} className="footer-link transition-transform transform translate-y-full duration-1000 cursor-pointer">
            <span className="p-4 block" >
              {svg.linkedIn}
            </span>
          </li>
          <li onClick={() => handleLinkClick("https://github.com/NikKowPHP", true)} className="footer-link transition-transform transform translate-y-full duration-1000 cursor-pointer">
            <span className="block  p-4">
              {svg.github}
            </span>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
