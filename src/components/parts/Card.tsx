import React from "react";

interface CardProps {
  image: string;
  title: string;
  description: string;
  link: string;
  stack: string[];
  video: string;
  shortDescription: string;
  onClick: (link: string) => void;
}

const Card: React.FC<CardProps> = ({
  image,
  title,
  description,
  shortDescription,
  video,
  stack,
  link,
  onClick,
}) => {
  return (
    <div
      onClick={() => onClick(link)}
      style={{ transform: "translateY(250%)" }}
      className="card relative transition-transform transform duration-500 m-4 max-w-lg bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700  ease-in-out hover:duration-500 cursor-pointer"
    >
      <div className="absolute bottom-0 left-0 w-full h-full z-10 bg-gradient-to-t from-black via-black-300/30 to-transparent"></div>
      <div className="flex justify-center ">
        <video className="w-full" src={video} autoPlay loop muted></video>
      </div>
      <div className="project-info absolute top-1/2 left-0  w-full px-5 z-20 ">
        <h3 className="card-title font-extrabold text-3xl text-white mb-2">
          {title}
        </h3>
        <p className="">{shortDescription}</p>
        <div className="tags flex">
          {" "}
          {stack.map((item, idx) => (
            <div
              key={idx}
              className="p-2 mr-2 mt-1 bg-gray-300/20 rounded-xl text-sm"
            >
              {item}
            </div>
          ))}{" "}
        </div>
      </div>
    </div>
  );
};
export default Card;
