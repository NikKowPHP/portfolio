import React, { useEffect, useState } from "react";
import "../../styles/welcome.css";
import "../../styles/background.css";

type panelProps = {
  texts: string[];
};

const Panels = ({ texts }: panelProps) => {
  const [panelHeaders, setPanelHeaders] = useState<HTMLElement[]>([]);

  const initiatePanels = () => {
    let panelHeaders = document.querySelectorAll(".panel h1");
    let panelHeadersArray: HTMLElement[] =
      Array.prototype.slice.call(panelHeaders);
    setPanelHeaders(panelHeadersArray);
  };
  const animatePanels = () => {
    // Animate panel headers
    if (panelHeaders.length > 0) {
      setTimeout(() => {
        panelHeaders.forEach((header, idx) => {
          for (let i = 0; i < 10; i++) {
            let clone = header.cloneNode(true);
            header.parentElement?.appendChild(clone);
          }
          setTimeout(() => {
            header.parentElement?.classList.add("active");
          }, 1000 + idx * 100);
        });
      }, 1000);
    }
  };
  useEffect(() => {
    initiatePanels();
  }, []);
  useEffect(() => {
    animatePanels();
  }, [panelHeaders]);
  return (
    <div className="panel__container">
      {texts &&
        texts.map((text, idx) => (
          <div key={idx} className="panel">
            <div
              className={`text__wrap  ${idx % 2 == 0 ? "forward" : "backward"}`}
            >
              <h1>{text}</h1>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Panels;
