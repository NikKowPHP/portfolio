import { useEffect, useState } from "react";
import { useRedirectContext } from "../contexts/RedirectContext";
import { useNavigate } from "react-router-dom";

export const useLinkAnimation = (
  selectors: string[],
  animationDelay: number = 3000,
  elementAnimationDelay: number = 400
) => {
  const navigate = useNavigate();
  const [links, setLinks] = useState<HTMLElement[]>([]);
  const { setIsRedirecting, isRedirecting } = useRedirectContext();

  const animateLinks = () => {
    links.forEach((link, idx) => {
      setTimeout(() => {
        link.style.transform = "translateY(0)";
      }, animationDelay + idx * elementAnimationDelay);
    });
  };
  const animateLinksReverse = (): Promise<boolean> => {
    return new Promise((resolve) => {
      let completedAnimations = 0;
      links.forEach((link, idx) => {
        setTimeout(() => {
          link.style.transform = "translateY(-100%)";
          completedAnimations++;
          if (completedAnimations === links.length) {
            resolve(true);
          }
        }, idx * animationDelay);
      });
    });
  };
  const handleLinkClick = async (
    navLink: string,
    isExternalLink: boolean = false
  ) => {
    setIsRedirecting(true);
    await animateLinksReverse();
    !isExternalLink ? navigate(navLink) : (window.location.href = navLink);
    setIsRedirecting(false);
  };
  useEffect(() => {
    animateLinks();
  }, [links, location.pathname]);

  useEffect(() => {
    const allLinks: HTMLElement[] = [];
    selectors.forEach((selector) => {
      const links = document.querySelectorAll<HTMLElement>(selector);
      const linksArray: HTMLElement[] = Array.from(links);
      allLinks.push(...linksArray);
    });

    setLinks(allLinks);
  }, []);

  return { links, animateLinksReverse, handleLinkClick };
};
