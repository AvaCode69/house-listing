import React from "react";
import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";
import { links } from "../utils/constants";
import { useListsContext } from "../context/lists_context";
import { FaTimes } from "react-icons/fa";
const Sidebar = () => {
  const { isSidebarOpen, closeSidebar } = useListsContext();

  return (
    <div className="side-bar">
      <aside
        className={`${isSidebarOpen ? "sidebar show-sidebar" : "sidebar"}`}
      >
        <div className="sidebar-header">
          <img src={logo} className="logo" alt="comfy sloth" />
          <button className="close-btn" type="button" onClick={closeSidebar}>
            <FaTimes />
          </button>
        </div>
        <ul className="links">
          {links.map(({ id, text, url }) => {
            return (
              <li key={id}>
                <Link to={url} onClick={closeSidebar}>
                  {text}
                </Link>
              </li>
            );
          })}
        </ul>
      </aside>
    </div>
  );
};
export default Sidebar;
