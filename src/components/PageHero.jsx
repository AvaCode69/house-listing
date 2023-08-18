import React from "react";
import { Link } from "react-router-dom";
const PageHero = ({ title, item }) => {
  return (
    <div>
      <div className="section-center">
        <h3>
          <Link to="/">Home</Link>
          {item && <Link to="/">/item</Link>}/{title}
        </h3>
      </div>
    </div>
  );
};

export default PageHero;
