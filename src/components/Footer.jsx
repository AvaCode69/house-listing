import React from "react";
const Footer = () => {
  return (
    <section className="footer">
      <h5>
        &copy;{new Date().getFullYear()}
        <span>House real estate </span>
        <span>All rights reserved</span>
      </h5>
    </section>
  );
};

export default Footer;
