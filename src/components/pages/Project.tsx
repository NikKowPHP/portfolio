import React, { ReactElement, useEffect, useRef, useState } from "react";
import { json, useLocation } from "react-router-dom";
import TextTypingEffect from "../TextTypingEffect";

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
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(
    null
  );
  const [isTypingComplete, setIsTypingComplete] = useState<boolean>(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const [data, setData] = useState<ProjectData[]>([]);

  const location = useLocation();
  const segments = location.pathname.split("/");
  const projectName = segments[segments.length - 1];

  const findProject = (data: Data): ProjectData | undefined => {
    return data.projects.find(
      (project: ProjectData) => project.link === projectName
    );
  };
  const fetchData = async () => {
    try {
      const response = await fetch("/src/data/data.json");
      if (!response.ok) throw new Error("Failed to fetch");

      const jsonData: Data = await response.json();
      setData(jsonData.projects);

      const foundProject: ProjectData | undefined = findProject(jsonData);
      setSelectedProject(foundProject || null);
    } catch (error) {
      console.error(" Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [projectName]);

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

  const handlePrev = () => {
    setCurrentSlide((prevSlide) =>
      selectedProject && prevSlide === 0
        ? selectedProject?.images.length - 1
        : prevSlide - 1
    );
  };

  const handleNext = () => {
    setCurrentSlide((prevSlide) =>
      selectedProject && prevSlide === selectedProject?.images.length - 1
        ? 0
        : prevSlide + 1
    );
  };

  const renderCorousel: () => ReactElement = () => {
    return (
      <div
        id="default-carousel"
        className="corousel relative w-full py-16 m-auto px-4 group"
      >
        <div className="relative max-w-[1400px]  overflow-hidden rounded-lg md:h-96">
          {selectedProject?.images.map((image, index) => (
            <div
              key={index}
              className={`duration-700 ease-in-out ${
                index === currentSlide ? "block" : "hidden"
              }`}
            >
              <img
                src={`/src/assets/images/${image}`}
                className="absolute h-full block  -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                alt={image}
              />
            </div>
          ))}
        </div>

        <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
          {selectedProject?.images.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`w-3 h-3 rounded-full ${
                currentSlide === index ? "bg-gray-600" : "bg-gray-300"
              }`}
              aria-current={currentSlide === index}
              aria-label={`Slide ${index + 1}`}
              data-carousel-slide-to={index}
              onClick={() => setCurrentSlide(index)}
            ></button>
          ))}
        </div>

        <button
          type="button"
          className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          data-carousel-prev
          onClick={handlePrev}
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-400/30 group-hover:bg-white/50 dark:group-hover:bg-gray-500/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg
              className="w-4 h-4 text-white dark:text-gray rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
            <span className="sr-only">Previous</span>
          </span>
        </button>

        <button
          type="button"
          className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          data-carousel-next
          onClick={handleNext}
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/50 dark:bg-gray-400/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg
              className="w-4 h-4 text-white dark:text-gray rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
            <span className="sr-only">Next</span>
          </span>
        </button>
      </div>
    );
  };

  const renderDescription: () => ReactElement | null = () => {
    return (
      selectedProject && (
        <div
          ref={projectDescriptionRef}
          className="project-description transform translate-y-full duration-500"
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
          <h1 className="text-center">
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

  return renderProjectInfo();
};
export default Project;
