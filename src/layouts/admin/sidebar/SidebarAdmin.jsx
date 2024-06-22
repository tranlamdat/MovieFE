import { Link } from "react-router-dom";
// import authService from "../../services/AuthService";
import { useEffect, useState } from "react";
import "./SidebarAdmin.css";

const SidebarAdmin = () => {
  const [pages, setPages] = useState([
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: "bi bi-grid",
      isActive: false,
      roles: ["Coordinator", "Manager", "Administrator"],
    },
    {
      name: "Actor",
      path: "/admin/actor",
      icon: "bi bi-person-workspace",
      isActive: false,
      role: "Administrator",
    },
    {
      name: "Director",
      path: "/admin/director",
      icon: "bi bi-calendar",
      isActive: false,
      role: "Administrator",
    },
    {
      name: "Genre",
      path: "/admin/genre",
      icon: "bi bi-bookmark-star",
      isActive: false,
      roles: ["Coordinator", "Manager"],
    },
    {
      name: "Movie",
      path: "/admin/movie",
      icon: "bi bi-film",
      isActive: false,
      role: "Administrator",
    },
    // {
    //   name: "User",
    //   path: "/admin/user",
    //   icon: "bi bi-person",
    //   isActive: false,
    //   role: "Administrator",
    // },
  ]);

  useEffect(() => {
    const path = window.location.pathname;
    const newPages = pages.map((page) => {
      if (path.includes(page.path)) {
        page.isActive = true;
      } else {
        page.isActive = false;
      }
      return page;
    });
    setPages(newPages);
  }, []);

  return (
    <aside id="sidebar" className="sidebar text-bg-dark">
      <ul className="sidebar-nav" id="sidebar-nav">
        {pages.map((page) => (
          <li
            className={`nav-item ${
              page.isActive ? "" : ""
            }`}
            key={page.name}
          >
            <Link
              className={`nav-link ${
                !page.isActive ? "collapsed" : "bg-secondary"
              }`}
              to={page.path}
            >
              <i className={page.icon}></i>
              <span>{page.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default SidebarAdmin;
