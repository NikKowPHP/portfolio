import React, { useEffect, useState } from "react";
import { json, useLocation } from "react-router-dom";

interface ProjectData{
  title: string;
  description: string;
  thumbnail: string;
  images: string[];
  id: number;
  link: string;
  features: string[];
}

const Project: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [data, setData] = useState<ProjectData[]>([]);

  const location = useLocation();
  const segments = location.pathname.split("/");
  const projectName = segments[segments.length - 1];

  const fetchData = async () => {
    try {
      const response = await fetch("/src/data/data.json");
      if (!response.ok) throw new Error("Failed to fetch");

      const jsonData = await response.json();
      setData(jsonData);

      const foundProject = jsonData.projects.find(
        (project: ProjectData) => project.title === projectName
      );

      setSelectedProject(foundProject || null);
    } catch (error) {
      console.error(" Error fetching data: ", error);
    }
  };

  useEffect(() => {
		fetchData();
	}, [projectName]);

  const renderProjectInfo = () => {
    return (
      selectedProject && (
        <div className="text-white">
          latina!
          <div className="flex justify-center mt-5"></div>
        </div>
      )
    );
  };

  return renderProjectInfo();
};
export default Project;
