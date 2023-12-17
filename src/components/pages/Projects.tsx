import React, { useEffect, useState } from "react";
import TextTypingEffect from "../TextTypingEffect";

const Projects: React.FC = () => {
  const [previosTextComplete, setPreviosTextComplete] =
    useState<boolean>(false);
  const [currentTextIndex, setCurrentTextIndex] = useState<number>(0);
	const [completedBlocks, setCompletedBlocks] = useState<number[]>([0]);



  const handleTypingComplete = (index: number) => {
		setCompletedBlocks((prevBlocks) => [...prevBlocks, index + 1])
    setPreviosTextComplete(true);
  };



  const texts = ["/projects", "Selected projects i've created"];




  useEffect(() => {
    if (previosTextComplete) {
      setTimeout(() => {
        setCurrentTextIndex(currentTextIndex + 1);
        setPreviosTextComplete(false);
      }, 1000);
    }
  }, [previosTextComplete, currentTextIndex]);

  return (
    <div className="container text-white p-20">
      {completedBlocks.includes(0) && (
        <h1>
          <TextTypingEffect
            text={texts[0]}
            durationInMs={100}
            onComplete={() => handleTypingComplete(0)}
          />
        </h1>
      )}
      {completedBlocks.includes(1) && (
        <h3>
          <TextTypingEffect
            text={texts[1]}
            durationInMs={100}
            onComplete={() => handleTypingComplete(1)}
          />
        </h3>
      )}
    </div>
  );
};
export default Projects;
