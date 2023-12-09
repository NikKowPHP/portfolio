import React from "react";
import "./App.css";

const App: React.FC = () => {
  const renderHeader = (): JSX.Element => (
    <>
      <section>
        <div>
          <div className="hero-text">
            <span>
              <h1 className="hero__header">2023</h1>
            </span>
          </div>
          <div className="hero-text">
            <span>
              <h1 className="hero__header">PORTFOLIO</h1>
            </span>
          </div>
          <div className="hero-text">
            <span>
              <h1 className="hero__header">MIKITA KAVALIOU</h1>
            </span>
          </div>
        </div>
        <div className="panel__container">
          <div className="panel">
            <div className="text__wrap reverse">
              <h1>JUNIOR PHP DEVELOPER</h1>
            </div>
          </div>
          <div className="panel">
            <div className="text__wrap">
              <h1>JUNIOR JAVASCRIPT DEVELOPER</h1>
            </div>
          </div>
        </div>
        <div className="panel">
          <div className="text__wrap reverse">
            <h1>REACT LARAVEL</h1>
          </div>
        </div>
        <div className="panel">
          <div className="text__wrap">
            <h1>MIKITA KAVALIOU</h1>
          </div>
        </div>
      </section>
      <canvas></canvas>
    </>
  );

  return <>{renderHeader()}</>;
};

export default App;
