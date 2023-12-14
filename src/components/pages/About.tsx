import React, { useEffect, useState } from "react";
import TextTypingEffect from "../TextTypingEffect";

const About: React.FC = () => {
  const texts = [
    "About Me: I'm a dedicated and enthusiastic junior ",
    "developer with a deep passion for crafting web applications using PHP Laravel and JavaScript React.",
    "💼 Seeking Job Opportunities",
    "My Strengths:",
    "💡 Innovative Problem Solver: I enjoy tackling complex challenges and finding creative solutions.",
    "I firmly believe that the tech world is ever-evolving, and I'm committed to continuous learning.",
  ];
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isTypingComplete, setIsTypingComplete] = useState<boolean>(false);


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        if (!isTypingComplete) return prevIndex;
        if (prevIndex < texts.length - 1) {
          setIsTypingComplete(false);
          return prevIndex + 1;
        } else {
          clearInterval(interval);
          return prevIndex;
        }
      });
    }, 200);

    return () => clearInterval(interval);
  }, [texts.length, isTypingComplete]);

  return (
    <div className="container mx-auto max-w-3x1 mt-20 ">
      <div className="mt-20  text-white">
        {texts.slice(0, currentIndex + 1).map((text, index) => (
          <div key={index}>
            <div className="p-4">
              <TextTypingEffect
                text={text}
                durationInMs={30}
                onComplete={() => setIsTypingComplete(true)}
              />{" "}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
