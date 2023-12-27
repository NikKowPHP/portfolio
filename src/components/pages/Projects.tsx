import React, { useEffect, useState } from "react";
import TextTypingEffect from "../TextTypingEffect";
import Card from "../parts/Card";
import { useData } from "../hooks/useData";
import Panels from "../parts/Panels";
import { AnimationType, useLinkAnimation } from "../hooks/useLinkAnimation";
import Footer from "../parts/Footer";
import { useRedirectContext } from "../contexts/RedirectContext";

const Projects: React.FC = () => {
  const [previosTextComplete, setPreviosTextComplete] =
    useState<boolean>(false);
  const [currentTextIndex, setCurrentTextIndex] = useState<number>(0);
  const [completedBlocks, setCompletedBlocks] = useState<number[]>([0]);

  const texts = ["/projects", "Selected projects i've created"];

  const { isRedirecting } = useRedirectContext();

  const { data, fetchData } = useData();

  const { handleLinkClick, animateLinksReverse } = useLinkAnimation(
    [".card"],
    AnimationType.SlideIn,
    AnimationType.SlideOutReverse,
    600,
    700,
    data
  );

  const handleTypingComplete = (index: number) => {
    setCompletedBlocks((prevBlocks) => [...prevBlocks, index + 1]);
    setPreviosTextComplete(true);
  };
  useEffect(() => {
    if (isRedirecting) animateLinksReverse();
  }, [isRedirecting]);

  useEffect(() => {
    fetchData();
  }, []);

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
          <h2 className="text-center text-5xl md:text-8xl lg:text-9xl mb-5 flex-1">
            <TextTypingEffect
              text={texts[0]}
              durationInMs={100}
              onComplete={() => handleTypingComplete(0)}
            />
          </h2>
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
    return (
      data &&
      data.projects.map((project, index) => {
        return (
          <Card
            key={index}
            video={project.video}
            title={project.title}
            description={project.shortDescription}
            shortDescription={project.shortDescription}
            image={project.thumbnail}
            link={project.link}
            stack={project.stack}
            onClick={() => handleLinkClick(`projects/${project.link}`)}
          />
        );
      })
    );
  };

  return (
    <>
      <Panels
        texts={["cool projects", "github streak", "dedication", "constance"]}
      />
      <div className="relative z-10 text-white mt-20 mb-4 h-auto pb-[56px]">
        {renderHeader()}
        <div className="mx-auto max-w-screen-xl mt-6 flex flex-wrap justify-center overflow-hidden">
          {renderProjects()}
        </div>
      </div>
      <Footer classes="fixed" />
    </>
  );
};
export default Projects;
