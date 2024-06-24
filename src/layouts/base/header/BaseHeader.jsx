import { useEffect, useState } from "react";
import "./BaseHeader.css";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../../services/AuthService";
import { Image } from "react-bootstrap";
import swalService from "../../../services/SwalService";

const BaseHeader = () => {
  const [userData, setUserData] = useState(null);
  const [isShadow, setIsShadow] = useState(false);
  const navigate = useNavigate();

  const isAuthenticated = () => {
    return authService.isLogin();
  };

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

  useEffect(() => {
    const user = authService.getUserData();
    setUserData(user);

    const handleScroll = () => {
      setIsShadow(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky-top">
      <nav
        className={`navbar navbar-expand-lg navbar-dark py-3 ${
          isShadow ? "bg-dark" : ""
        }`}
        aria-label="Offcanvas navbar large"
      >
        <div className="container-fluid">
          <Link className="navbar-brand logo" to="/">
            <i className="bx bxs-movie"></i>Movie Website
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar2"
            aria-controls="offcanvasNavbar2"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="offcanvas offcanvas-end text-bg-dark"
            tabIndex="-1"
            id="offcanvasNavbar2"
            aria-labelledby="offcanvasNavbar2Label"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbar2Label">
                Movie
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body" id="navbar-example2">
              <ul className="navbar-nav nav-pills justify-content-center flex-grow-1 gap-4 gap-lg-5 pe-3">
                <li className="nav-item">
                  <a className="nav-link active" href="#home">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#movies">
                    Movies
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#coming">
                    Coming
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#newsletter">
                    Contact
                  </a>
                </li>
              </ul>
              <div className="mt-5 mt-lg-0">
                {isAuthenticated() ? (
                  <>
                    <div className="btn-group dropstart">
                      <button
                        type="button"
                        className="btn btn-dark dropdown-toggle"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <Image
                          src="/img/default-avatar-1.png"
                          width={30}
                          height={30}
                          roundedCircle
                        />
                      </button>
                      <ul className="dropdown-menu">
                        <li>
                          <a className="dropdown-item" href="#">
                            Hi {userData?.firstName}
                          </a>
                        </li>
                        <li>
                          <hr className="dropdown-divider" />
                        </li>
                        <li>
                          <Link className="dropdown-item" to="/profile">
                            My Profile
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="/change-password">
                            Change Password
                          </Link>
                        </li>
                        <li>
                          <hr className="dropdown-divider" />
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            style={{ cursor: "pointer" }}
                            onClick={handleLogout}
                          >
                            Logout
                          </a>
                        </li>
                      </ul>
                    </div>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="btn btn-outline-light">
                      Login
                    </Link>
                    <Link to="/sign-up" className="btn btn-danger ms-2">
                      Sign up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default BaseHeader;
