import React from "react";
import Panels from "./Panels";

const Header = (): JSX.Element => (
  <>
    <section>
      <div
        className="hero-text absolute z-10 bottom-12 md:bottom-10 lg:xl:bottom-10 grid grid-cols-12 w-full"
        style={{ color: "rgba(240, 248, 255, 0.76)" }}
      >
        <div>
          <span className="hero__header-container">
            <h1 className="hero__header">2023</h1>
          </span>
        </div>
        <div>
          <span className="hero__header-container">
            <h1 className="hero__header">PORTFOLIO</h1>
          </span>
        </div>
        <div>
          <span className="hero__header-container">
            <h1 className="hero__header">MIKITA KAVALIOU</h1>
          </span>
        </div>
      </div>
      <Panels texts={["Mikita", "Kavaliou", "JavaScript", "React.js"]} />
    </section>
  </>
);
export default Header;
