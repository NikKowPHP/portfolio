import React, { ReactElement, useEffect, useState } from "react";
import { json, useLocation } from "react-router-dom";

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
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(
    null
  );
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
    console.log(selectedProject);
  }, [selectedProject]);

  useEffect(() => {
    fetchData();
  }, [projectName]);
  const renderCorousel = () => {
    return (
      <div className="relative">
        <div className="overflow-hidden h-96">
          <div className="flex">
            {selectedProject?.images.map((image, index) => (
              <div
                key={index}
                className={`w-full h-full ${
                  index === 0 ? "ml-0" : "-ml-96"
                } transition-transform ease-in-out duration-500 transform ${
                  index === 0 ? "translate-x-0" : "translate-x-full"
                }`}
              >
                <img src={`/src/assets/images/${image}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderProjectInfo = () => {
    return (
      selectedProject && (
        <div className="flex justify-center mt-5">
          <div className="max-w-4x1 mx-auto">{renderCorousel()}</div>
        </div>
      )
    );
  };

  return renderProjectInfo();
};
export default Project;
