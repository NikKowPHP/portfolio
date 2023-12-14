import React, { useEffect, useState } from "react";

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
  const [displayText, setDisplayText] = useState<string>("");
  const [currentPosition, setCurrentPosition] = useState<number>(0);

  useEffect(() => {
    const textLength = text.length;
    const interval = setInterval(() => {
      setCurrentPosition((currentPos) => {
        if (currentPos === textLength) {
          clearInterval(interval);
          onComplete();
          return currentPos;
        }
        setDisplayText(text.substring(0, currentPos + 1));
				return currentPos + 1;
      });
    }, durationInMs);
    return () => {
      clearInterval(interval);
    };
  }, [text]);
  return displayText.substring(0, currentPosition);
};
export default TextTypingEffect;
