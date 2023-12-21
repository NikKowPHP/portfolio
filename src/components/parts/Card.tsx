import React from "react";

interface CardProps {
  image: string;
  title: string;
  description: string;
  link: string;
  onClick: (link: string) => void;
}

const Card: React.FC<CardProps> = ({
  image,
  title,
  description,
  link,
  onClick,
}) => {
  const alt = image.slice(0, -4);
  return (
    <div
      style={{ transform: "translateY(250%)" }}
      className="card transition-transform transform duration-500 m-4 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 transition duration-500 ease-in-out hover:duration-500 cursor-pointer "
    >
      <div className="flex justify-center mt-5 " onClick={() => onClick(link)}>
        <img
          className="rounded-t-lg rounded-b-lg w-1/2  h-1/2"
          src={`./src/assets/images/${image}`}
          alt={alt}
        />
      </div>
      <div className="p-5 text-center">
        <div onClick={() => onClick(link)}>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white ">
            {title}
          </h5>
        </div>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {description}
        </p>
      </div>
    </div>
  );
};
export default Card;
