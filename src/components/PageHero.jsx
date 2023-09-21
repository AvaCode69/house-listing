import React from "react";
import { Link } from "react-router-dom";
import {
  FaArrowLeft
} from "react-icons/fa";
const PageHero = ({ title, item }) => {
  return (
    <div>
      <div className="section-hero">
        <h4>
          <Link to="/">Home</Link>
        /{title}
        </h4>
        <Link to="/" className="btn-back">
      <FaArrowLeft/>  back to Home
      </Link>
      </div>
    </div>
  );
};

export default PageHero;
