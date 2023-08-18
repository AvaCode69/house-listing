import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";
import { links } from "../utils/constants";
import { FaBars } from "react-icons/fa";

const Nav = () => {
  return (
    <div className="nav-bar">
      <div className="nav-center">
        <div className="nav-header">
          <Link to="/">
            <img src={logo} alt="comfy sloth" />
          </Link>
          <button type="button" className="nav-toggle">
            <FaBars />
          </button>
        </div>
        <ul className="nav-links">
          {links.map((link) => {
            const { id, text, url } = link;
            return (
              <li key={id}>
                <Link to={url}>{text}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Nav;
