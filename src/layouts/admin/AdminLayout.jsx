import { useEffect, useState } from "react";
import "./AdminLayout.css";
import AdminHeader from "./header/AdminHeader";
import { useNavigate } from "react-router-dom";
import SidebarAdmin from "./sidebar/SidebarAdmin";

const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  //   const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // const user = authService.getUserData();
    // setUserData(user);

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

  //   const handleLogout = () => {
  //     swalService.confirmToHandle(
  //       "Are you sure you want to logout?",
  //       "warning",
  //       () => {
  //         authService.logout();
  //         navigate("/");
  //       }
  //     );
  //   };

  return (
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
  );
};

export default AdminLayout;
