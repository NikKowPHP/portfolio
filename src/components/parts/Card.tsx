import React from "react";
import { Link } from "react-router-dom";

interface CardProps {
  image: string;
  title: string;
  description: string;
  link: string;
}

const Card: React.FC<CardProps> = ({ image, title, description, link }) => {

  const alt = image.slice(0, -4);
  return (
    <div style={{transform: 'translateY(250%)'}} className="card transition-transform transform  duration-500 m-4 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <Link className="flex justify-center mt-5" to={`/projects/${link}`}>
        <img
          className="rounded-t-lg rounded-b-lg w-1/2  h-auto"
          src={`/src/assets/images/${image}`}
          alt={alt}
        />
      </Link>
      <div className="p-5">
        <Link to={`/projects/${link}`}>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white ">
            {title}
          </h5>
        </Link>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {description}
        </p>
      </div>
    </div>
  );
};
export default Card;
