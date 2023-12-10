import React, { useEffect } from "react";
import "./App.css";

const App: React.FC = () => {

    interface Coordinates {
      x: number;
      y: number;
    }
    interface MouseCoords {
      x: number;
      y: number;
      targetX: number;
      targetY: number;
    }
    
  const renderHeader = (): JSX.Element => (
    <>
      <section>
        <div className="hero-text">
          <div>
            <span>
              <h1 className="hero__header">2023</h1>
            </span>
          </div>
          <div>
            <span>
              <h1 className="hero__header">PORTFOLIO</h1>
            </span>
          </div>
          <div>
            <span>
              <h1 className="hero__header">MIKITA KAVALIOU</h1>
            </span>
          </div>
        </div>
        <div className="panel__container">
          <div className="panel">
            <div className="text__wrap reverse">
              <h1>PHP DEVELOPER</h1>
            </div>
          </div>
          <div className="panel">
            <div className="text__wrap forward">
              <h1>LARAVEL</h1>
            </div>
          </div>
          <div className="panel">
            <div className="text__wrap reverse">
              <h1>JAVASCRIPT</h1>
            </div>
          </div>
          <div className="panel">
            <div className="text__wrap forward">
              <h1>REACT</h1>
            </div>
          </div>
        </div>
      </section>
      <canvas id="headerCanvas"></canvas>
    </>
  );

  return <>{renderHeader()}</>;
};

export default App;
