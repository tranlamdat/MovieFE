import { useEffect, useState } from "react";
import "./AdminLayout.css";
import AdminHeader from "./header/AdminHeader";
import SidebarAdmin from "./sidebar/SidebarAdmin";
import PropTypes from "prop-types";
import AdminProtected from "./AdminProtected";

const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    // Check initial screen width
    if (window.innerWidth < 1200) {
      setIsSidebarOpen(false);
    }

    // Add event listener to check screen width on resize
    window.addEventListener("resize", handleResize);

    return () => {
      // Clean up event listener
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleResize = () => {
    // Check screen width on resize
    if (window.innerWidth < 1200) {
      setIsSidebarOpen(false);
    } else {
      setIsSidebarOpen(true);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <AdminProtected>
      <div className="container-fluid">
        <AdminHeader toggleSidebar={toggleSidebar} />
        {isSidebarOpen && <SidebarAdmin />}
        <main
          id="main"
          className={`${isSidebarOpen ? "" : "main-sidebar-closed"}`}
        >
          {children}
        </main>
      </div>
    </AdminProtected>
  );
};

AdminLayout.propTypes = {
  children: PropTypes.node,
};

export default AdminLayout;
