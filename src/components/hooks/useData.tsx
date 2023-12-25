import { useEffect, useState } from "react";
interface ProjectData {
  title: string;
  description: string;
  shortDescription: string;
  thumbnail: string;
  images: string[];
  id: number;
  link: string;
  features: string[];
  stack: string[];
  video: string;
}
interface AboutMe {
  title: string;
  description: string[];
}
interface Data {
  projects: ProjectData[];
  about: AboutMe;
}
export const useData = () => {
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    try {
      const response = await fetch("/src/data/data.json");
      if (!response.ok) throw new Error("Failed to fetch");

      const jsonData: Data = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error(" Error fetching data: ", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    setData,
    fetchData,
  };
};
