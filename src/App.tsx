import React from "react";
import "./App.css";

const App: React.FC = () => {
  const renderHeader = (): JSX.Element => (
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
    </section>
  );

  return <>{renderHeader()}</>;
}

export default App;
