import { useEffect, useState } from "react";
import { useRedirectContext } from "../contexts/RedirectContext";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../constants/constants";

export enum AnimationType {
  SlideIn = "slide-in",
  SlideOut = "slide-out",
  SlideOutReverse = "slide-out--reverse",
  FadeIn = "fade-in",
  FadeOut = "fade-out",
}

export const useLinkAnimation = (
  selectors: string[],
  animationType: AnimationType = AnimationType.SlideIn,
  animationTypeReverse: AnimationType = AnimationType.SlideOut,
  animationDelay: number = 3000,
  elementAnimationDelay: number = 400,
  data: any | undefined = undefined
) => {
  const navigate = useNavigate();
  const [links, setLinks] = useState<HTMLElement[]>([]);
  const { setIsRedirecting, isRedirecting } = useRedirectContext();

  const slideInAnimation = (link: HTMLElement) => {
    link.style.transform = "translateY(0)";
  };

  const slideOutAnimation = (link: HTMLElement) => {
    link.style.transform = "translateY(-250%)";
  };
  const slideOutReverseAnimation = (link: HTMLElement) => {
    link.style.transform = "translateY(+250%)";
  };

  const fadeInAnimation = (link: HTMLElement) => {
    link.style.opacity = "1";
  };

  const fadeOutAnimation = (link: HTMLElement) => {
    link.style.opacity = "0";
  };

  const performAnimation = (selectedAnimation: AnimationType, link:HTMLElement) => {
    switch (selectedAnimation) {
      case AnimationType.SlideIn:
        slideInAnimation(link);
        break;
      case AnimationType.SlideOut:
        slideOutAnimation(link);
        break;
      case AnimationType.SlideOutReverse:
        slideOutReverseAnimation(link);
        break;
      case AnimationType.FadeIn:
        fadeInAnimation(link);
        break;
      case AnimationType.FadeOut:
        fadeOutAnimation(link);
        break;
    }
  };

  const animateLinks = () => {
    links.forEach((link, idx) => {
      setTimeout(() => {
        performAnimation(animationType, link);
      }, animationDelay + idx * elementAnimationDelay);
    });
  };

  const animateLinksReverse = (): Promise<boolean> => {
    return new Promise((resolve) => {
      let completedAnimations = 0;
      links.forEach((link, idx) => {
        setTimeout(() => {
          performAnimation(animationTypeReverse, link);
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
    setTimeout(() => {
      !isExternalLink
        ? navigate(BASE_URL + navLink)
        : (window.location.href = navLink);
    }, 700);
    setIsRedirecting(false);
  };

  const updateLinks = () => {
    const allLinks: HTMLElement[] = [];
    selectors.forEach((selector) => {
      const links = document.querySelectorAll<HTMLElement>(selector);
      const linksArray: HTMLElement[] = Array.from(links);
      allLinks.push(...linksArray);
    });

    setLinks(allLinks);
  };
  
  useEffect(() => {
    animateLinks();
  }, [links, location.pathname]);

  useEffect(() => {
    updateLinks();
  }, []);

  useEffect(() => {
    updateLinks();
  }, [data]);

  return { links, animateLinksReverse, handleLinkClick };
};
