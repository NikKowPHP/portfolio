import React, { useEffect, useState } from "react";
import TextTypingEffect from "../TextTypingEffect";
import Card from "../parts/Card";

interface Project {
  title: string;
  image: string;
  description: string;
  link: string;
}

const Projects: React.FC = () => {
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
      image: "TimeFlow-logo.png",
      description: "dlsfkajsdfk ",
      link: "timeflow",
    },
    {
      title: "TimeFlow",
      image: "TimeFlow-logo.png",
      description: "dlsfkajsdfk ",
      link: "timeflow",
    },
    {
      title: "TimeFlow",
      image: "TimeFlow-logo.png",
      description: "dlsfkajsdfk ",
      link: "timeflow",
    },
    {
      title: "TimeFlow",
      image: "TimeFlow-logo.png",
      description: "dlsfkajsdfk ",
      link: "timeflow",
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
          card.style.transform = "translateY(100%)";
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
	}, [cards])
	useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>(".card");
    const cardsArray : HTMLElement[] = Array.from(cards);
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
        />
      );
    });
  };

  return (
    <div className="text-white mt-20 h-auto">
      {renderHeader()}
      <div className="mx-auto max-w-screen-xl mt-6 flex flex-wrap justify-center">{renderProjects()}</div>
    </div>
  );
};
export default Projects;
