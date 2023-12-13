import React, { useEffect, useState } from "react";

interface TextTypingEffectProps {
  text: string;
}

const TextTypingEffect: React.FC<TextTypingEffectProps> = ({ text }) => {
  const [displayText, setDisplayText] = useState<string>("");

  useEffect(() => {
    let index = 0;
    const textLength = text.length;
    const interval = setInterval(() => {
      setDisplayText((prevText) => {
        if (index === textLength) {
          clearInterval(interval);
          return prevText;
        }
        return prevText + text.charAt(index++);
      });
    }, 30);
  }, [text]);
  return <>{displayText}</>;
};
export default TextTypingEffect;
