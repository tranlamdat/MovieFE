import { useEffect, useState } from "react";
import "./BaseHeader.css";
import { Link } from "react-router-dom";

const BaseHeader = () => {
  const [isShadow, setIsShadow] = useState(false);

  useEffect(() => {
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
                <Link to="/login" className="btn btn-outline-light">
                  Login
                </Link>
                <Link to="/sign-up" className="btn btn-danger ms-2">
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default BaseHeader;
