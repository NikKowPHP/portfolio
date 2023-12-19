import React, { useEffect, useState } from "react";
import TextTypingEffect from "../TextTypingEffect";
import Card from "../parts/Card";
import { useRedirectContext } from "../contexts/RedirectContext";
import { useNavigate } from "react-router-dom";

interface Project {
  title: string;
  image: string;
  description: string;
  link: string;
}

const Projects: React.FC = () => {
  const navigate = useNavigate();
  const { setIsRedirecting } = useRedirectContext();
  const [cards, setCards] = useState<HTMLElement[]>([]);
  const [previosTextComplete, setPreviosTextComplete] =
    useState<boolean>(false);
  const [currentTextIndex, setCurrentTextIndex] = useState<number>(0);
  const [completedBlocks, setCompletedBlocks] = useState<number[]>([0]);

  const handleTypingComplete = (index: number) => {
    setCompletedBlocks((prevBlocks) => [...prevBlocks, index + 1]);
    setPreviosTextComplete(true);
  };

  const [projectList, setProjectList] = useState<Project[]>([
    {
      title: "TimeFlow",
      image: "timeflow/TimeFlow-logo.png",
      description: "dlsfkajsdfk ",
      link: "timeflow",
    },
    {
      title: "Twitter Clone",
      image: "TimeFlow-logo.png",
      description: "dlsfkajsdfk ",
      link: "twitter-clone",
    },
    {
      title: "CMS System",
      image: "TimeFlow-logo.png",
      description: "dlsfkajsdfk ",
      link: "cms-system",
    },
    {
      title: "YouTube Clone",
      image: "TimeFlow-logo.png",
      description: "dlsfkajsdfk ",
      link: "youtube-clone",
    },
  ]);

  const animateCards = () => {
    cards.forEach((card, idx) => {
      setTimeout(() => {
        card.style.transform = "translateY(0)";
      }, 3000 + idx * 400);
    });
  };

  const animateCardsReverse = (): Promise<boolean> => {
    return new Promise((resolve) => {
      let completedAnimations = 0;
      cards.forEach((card, idx) => {
        setTimeout(() => {
          card.style.transform = "translateY(250%)";
          completedAnimations++;
          if (completedAnimations === cards.length) {
            resolve(true);
          }
        }, idx * 400);
      });
    });
  };
  useEffect(() => {
    animateCards();
  }, [cards]);
  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>(".card");
    const cardsArray: HTMLElement[] = Array.from(cards);
    setCards(cardsArray);
  }, []);

  const texts = ["/projects", "Selected projects i've created"];

  useEffect(() => {
    if (previosTextComplete) {
      setTimeout(() => {
        setCurrentTextIndex(currentTextIndex + 1);
        setPreviosTextComplete(false);
      }, 1000);
    }
  }, [previosTextComplete, currentTextIndex]);

  const onCardClick = async (link: string) => {
    setIsRedirecting(true);
    await animateCardsReverse();
    navigate(link);
    setIsRedirecting(false);
  };

  const renderHeader = () => {
    return (
      <header className="projects-header__title flex flex-col items-center justify-center ">
        {completedBlocks.includes(0) && (
          <h1 className="text-center flex-1">
            <TextTypingEffect
              text={texts[0]}
              durationInMs={100}
              onComplete={() => handleTypingComplete(0)}
            />
          </h1>
        )}
        {completedBlocks.includes(1) && (
          <h3 className="text-center w-full flex-1">
            <TextTypingEffect
              text={texts[1]}
              durationInMs={100}
              onComplete={() => handleTypingComplete(1)}
            />
          </h3>
        )}
      </header>
    );
  };
  const renderProjects = () => {
    return projectList.map((project, index) => {
      return (
        <Card
          key={index}
          title={project.title}
          description={project.description}
          image={project.image}
          link={project.link}
          onClick={onCardClick}
        />
      );
    });
  };

  return (
    <div className="text-white mt-20 h-auto">
      {renderHeader()}
      <div className="mx-auto max-w-screen-xl mt-6 flex flex-wrap justify-center">
        {renderProjects()}
      </div>
    </div>
  );
};
export default Projects;
