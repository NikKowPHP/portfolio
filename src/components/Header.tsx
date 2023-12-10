import React from "react";

  const Header = (): JSX.Element => (
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
    </>
  );
	export default Header;