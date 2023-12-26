import React, { ReactElement, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import TextTypingEffect from "../TextTypingEffect";
import Carousel from "../parts/Carousel";
import Footer from "../parts/Footer";
import { useData } from "../hooks/useData";

interface ProjectData {
  title: string;
  description: string;
  thumbnail: string;
  images: string[];
  id: number;
  link: string;
  features: string[];
}
interface AboutMe {
  title: string;
  description: string[];
}
interface Data {
  projects: ProjectData[];
  about: AboutMe;
}

const Project: React.FC = () => {
  const corouselRef = useRef<HTMLDivElement | null>(null);
  const projectDescriptionRef = useRef<HTMLDivElement | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectData | undefined>(
   undefined 
  );
  const [isTypingComplete, setIsTypingComplete] = useState<boolean>(false);
  const location = useLocation();
  const segments = location.pathname.split("/");
  const projectName = segments[segments.length - 1];

  const { data, fetchData } = useData();

  const findProject = (data: Data): ProjectData | undefined => {
    return data.projects.find(
      (project: ProjectData) => project.link === projectName
    );
  };

  useEffect(() => {
    fetchData();
  }, [projectName]);
  useEffect(() => {
    if(data){
      const foundProject = findProject(data)
      setSelectedProject(foundProject && foundProject);
    }
  },[data])

  useEffect(() => {
    if (isTypingComplete) {
      corouselRef &&
        corouselRef.current &&
        (corouselRef.current.style.transform = "translateY(0)");
      setTimeout(() => {
        projectDescriptionRef.current &&
          (projectDescriptionRef.current.style.transform = "translateY(0)");
      }, 1000);
    }
  }, [isTypingComplete]);


  const renderCorousel: () => ReactElement = () => {
    return (
      <div className="flex justify-center  ">
        <div className=" max-w-2x1 lg:max-w-[1200px] md:max-w-[1000px]  sm:max-w-full px-4 mb-5 ">
          <Carousel autoSlide={true}>
            {selectedProject?.images.map((image, index) => (
              <img
                key={index}
                src={`/portfolio/images/${image}`}
                alt={image}
                className="w-full h-auto"
              />
            ))}
          </Carousel>
        </div>
      </div>
    );
  };

  const renderDescription: () => ReactElement | null = () => {
    return (
      selectedProject && (
        <div
          ref={projectDescriptionRef}
          className="max-w-[1200px] lg:max-w-[1200px] md:max-w-full sm:max-w-full p-4 project-description transform translate-y-full duration-500 text-lg"
        >
          {selectedProject.description}
        </div>
      )
    );
  };

  const renderProjectInfo: () => ReactElement | null = () => {
    return (
      selectedProject && (
        <div className="text-white flex justify-center flex-col mt-20 overflow-hidden">
          <h1 className="text-center lg:text-9xl">
            <TextTypingEffect
              text={selectedProject.title}
              durationInMs={100}
              onComplete={() => setIsTypingComplete(true)}
            />
          </h1>
          <div
            ref={corouselRef}
            className="max-w-4x1 mx-auto transform ease-in-out translate-y-full duration-1000"
          >
            {isTypingComplete && renderCorousel()}
            {renderDescription()}
          </div>
        </div>
      )
    );
  };

  return (
    <>
    {renderProjectInfo()}
    <Footer classes="fixed" />
    </>
  )
};
export default Project;
