import BaseLayout from "../../layouts/base/BaseLayout";
import "./HomePage.css";
import MovieCard from "../../components/card/movie/MovieCard";
import ContactForm from "../../components/form/contact/ContactForm";
import UseTop from "../../hooks/UseTop";
import CarouselCard from "../../components/card/carousel/CarouselCard";
import authService from "../../services/AuthService";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import movieApi from "../../api/movieApi";
import handleError from "../../services/HandleErrors";

const HomePage = () => {
  UseTop();
  const [openingThisWeek, setOpeningThisWeek] = useState([]);
  const [comingSoon, setComingSoon] = useState([]);

  const isAuthenticated = () => {
    return authService.isLogin();
  };

  const isAdmin = () => {
    return authService.getUserRole() === "Admin";
  };

  if (isAuthenticated() && isAdmin()) {
    return <Navigate to="/admin/dashboard" />;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [getOpeningThisWeek, getComingSoon] = await Promise.all([
          // Get opening this week
          movieApi.OpenThisWeek(),
          // Get coming soon
          movieApi.ComingSoon(),
        ]);

        // Set opening this week
        setOpeningThisWeek(getOpeningThisWeek);
        // Set coming soon
        setComingSoon(getComingSoon);
      } catch (error) {
        handleError.showError(error);
      }
    };

    fetchData();
  }, []);

  return (
    <BaseLayout>
      <main
        data-bs-spy="scroll"
        data-bs-target="#navbar-example2"
        data-bs-smooth-scroll="true"
        tabIndex="0"
      >
        <section className="py-4 mt-5" id="home">
          <div
            id="carouselExampleAutoplaying"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carouselExampleAutoplaying"
                data-bs-slide-to="0"
                className="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleAutoplaying"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleAutoplaying"
                data-bs-slide-to="2"
                aria-label="Slide 3"
              ></button>
            </div>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src="img/home1.jpg" className="d-block w-100" alt="" />
                <div className="home-text">
                  <span>Marvel Universe</span>
                  <h1>
                    Venom: Let There <br /> Be Carnage
                  </h1>
                  <a href="#" className="btn btn-danger">
                    Watch Now
                  </a>
                </div>
                <a href="#" className="play">
                  <i className="bx bx-play"></i>
                </a>
              </div>
              <div className="carousel-item">
                <img src="img/home2.jpg" className="d-block w-100" alt="" />
                <div className="home-text">
                  <span>Marvel Universe</span>
                  <h1>
                    Avengers: <br /> Infinity War
                  </h1>
                  <a href="#" className="btn btn-danger">
                    Watch Now
                  </a>
                </div>
                <a href="#" className="play">
                  <i className="bx bx-play"></i>
                </a>
              </div>
              <div className="carousel-item">
                <img src="img/home3.jpg" className="d-block w-100" alt="" />
                <div className="home-text">
                  <span>Marvel Universe</span>
                  <h1>
                    Spiderman: <br /> Far From Home
                  </h1>
                  <a href="#" className="btn btn-danger">
                    Watch Now
                  </a>
                </div>
                <a href="#" className="play">
                  <i className="bx bx-play"></i>
                </a>
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleAutoplaying"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleAutoplaying"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </section>
        <section className="container py-4 mt-5" id="movies">
          <h5 className="heading">Opening This Week</h5>

          <div className="movies-container">
            {openingThisWeek.length > 0 && openingThisWeek.map((movie) => (
              <MovieCard key={movie.movieId} movie={movie}></MovieCard>
            ))}
          </div>
        </section>

        <section className="container py-4 mt-5" id="coming">
          <h5 className="heading">Coming Soon</h5>
          <CarouselCard listItems={comingSoon}></CarouselCard>
        </section>
        <section className="container py-4 mt-5 newsletter" id="newsletter">
          <h5 className="heading">Contact Us</h5>

          <div className="d-flex justify-content-center px-2 mt-4">
            <div className="row">
              <div className="col-lg-7 mb-5 mb-lg-0">
                <ContactForm></ContactForm>
              </div>

              <div className="col-lg-5 ps-4">
                <h3 className="mb-4">Let&apos;s talk about everything.</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Nihil deleniti itaque similique magni. Magni, laboriosam
                  perferendis maxime!
                </p>
                {/* <p>
                  <a href="#">Read more</a>
                </p> */}
              </div>
            </div>
          </div>
        </section>
      </main>
    </BaseLayout>
  );
};

export default HomePage;
