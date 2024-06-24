import { Link, useNavigate } from "react-router-dom";
import swalService from "../../../services/SwalService";
import authService from "../../../services/AuthService";

const AdminHeader = ({ toggleSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    swalService.confirmToHandle(
      "Are you sure you want to logout?",
      "warning",
      () => {
        authService.logout();
        navigate("/");
      }
    );
  };

  return (
    <header
      id="header"
      className="header fixed-top d-flex align-items-center text-bg-dark"
    >
      <div className="d-flex align-items-center justify-content-between">
        <Link to="/admin/dashboard" className="logo d-flex align-items-center">
          <img src="/image/logo.png" alt="" />
          <span className="d-none d-lg-block">Movie</span>
        </Link>
        <i
          className="bi bi-list toggle-sidebar-btn"
          onClick={toggleSidebar}
        ></i>
      </div>

      <nav className="header-nav ms-auto">
        <ul className="d-flex align-items-center">
          <li className="nav-item dropdown pe-3">
            <a
              className="nav-link nav-profile d-flex align-items-center pe-0"
              href="#"
              data-bs-toggle="dropdown"
            >
              <img
                src="/img/default-avatar.png"
                alt="Profile"
                width={30}
                height={30}
                className="rounded-circle"
              />
              <span className="d-none d-md-block dropdown-toggle ps-2">
                Admin
              </span>
            </a>

            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
              <li>
                <Link
                  className="dropdown-item d-flex align-items-center"
                  to="/profile"
                >
                  <i className="bi bi-shield-lock"></i>
                  <span>Change Password</span>
                </Link>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>

              <li>
                <a
                  className="dropdown-item d-flex align-items-center"
                  style={{ cursor: "pointer" }}
                  onClick={handleLogout}
                >
                  <i className="bi bi-box-arrow-right"></i>
                  <span>Sign Out</span>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </header>
  );
};

AdminHeader.propTypes = {
  toggleSidebar: () => {},
};

export default AdminHeader;
