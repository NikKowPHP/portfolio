import React, { useEffect, useRef, useState } from "react";
import "../styles/typewritter.css";

interface TextTypingEffectProps {
  text: string;
  durationInMs: number;
  onComplete: () => void;
}

const TextTypingEffect: React.FC<TextTypingEffectProps> = ({
  text,
  durationInMs,
  onComplete,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [displayText, setDisplayText] = useState<string>("");
  const [currentPosition, setCurrentPosition] = useState<number>(0);
  const [isCursorVisible, setIsCursorVisible] = useState<boolean>(true);
  const [isTypingComplete, setIsTypingComplete] = useState<boolean>(false);

  useEffect(() => {
    const textLength = text.length;
    const interval = setInterval(() => {
      setCurrentPosition((currentPos) => {
        if (currentPos === textLength) {
          clearInterval(interval);
          onComplete();
          setIsTypingComplete(true);
          return currentPos;
        }
        setDisplayText(text.substring(0, currentPos + 1));
        return currentPos + 1;
      });
    }, durationInMs);


    const cursorInterval = setInterval(() => {
      if (!isTypingComplete) {
        setIsCursorVisible((prevVisibility) => !prevVisibility);
      } else {
        clearInterval(cursorInterval);
        setIsCursorVisible(false);
      }
    }, 500);
    return () => {
      clearInterval(interval);
      clearInterval(cursorInterval);
    };
  }, [text]);
  return (
    <div>
      <span ref={containerRef} className="type-writter">{displayText.substring(0, currentPosition)}</span>
      {isCursorVisible && !isTypingComplete &&  <span className="cursor">|</span>}
    </div>
  );
};
export default TextTypingEffect;
