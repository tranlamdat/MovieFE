import BaseLayout from "../../layouts/base/BaseLayout";
import "./HomePage.css";
import MovieCard from "../../components/card/movie/MovieCard";
import ContactForm from "../../components/form/contact/ContactForm";
import UseTop from "../../hooks/UseTop";
import CarouselCard from "../../components/card/carousel/CarouselCard";
import authService from "../../services/AuthService";
import { Navigate } from "react-router-dom";

const openingThisWeek = [
  {
    id: 1,
    img: "img/m1.jpg",
    title: "My Demon",
    duration: "2h 48m",
    genre: "Romantic",
  },
  {
    id: 2,
    img: "img/m2.jpg",
    title: "Itaewon className",
    duration: "1h 30m",
    genre: "Drama",
  },
  {
    id: 3,
    img: "img/m3.jpg",
    title: "Sweet Home",
    duration: "2h 48m",
    genre: "Horror",
  },
  {
    id: 4,
    img: "img/m4.jpg",
    title: "Our Beloved Summer",
    duration: "1h 30m",
    genre: "Romantic",
  },
  {
    id: 5,
    img: "img/m5.jpg",
    title: "Youth of May",
    duration: "2h 48m",
    genre: "Drama",
  },
  {
    id: 6,
    img: "img/m6.jpg",
    title: "MidWay",
    duration: "1h 30m",
    genre: "Epic",
  },
  {
    id: 7,
    img: "img/m7.jpg",
    title: "Peaky Blinders",
    duration: "2h 48m",
    genre: "Violent",
  },
  {
    id: 8,
    img: "img/m8.jpg",
    title: "VAGABOND",
    duration: "1h 30m",
    genre: "Action",
  },
  {
    id: 9,
    img: "img/m9.jpg",
    title: "D.P",
    duration: "2h 48m",
    genre: "Dark",
  },
  {
    id: 10,
    img: "img/m10.jpg",
    title: "All Of Us Are Dead",
    duration: "1h 30m",
    genre: "Horror",
  },
];

const commingSoon = [
  {
    id: 1,
    img: "img/c1.jpg",
    title: "Venom",
    duration: "120 min",
    genre: "Action",
  },
  {
    id: 2,
    img: "img/c2.jpg",
    title: "Dunkirk",
    duration: "120 min",
    genre: "Adventure",
  },
  {
    id: 3,
    img: "img/c3.jpg",
    title: "Batman",
    duration: "120 min",
    genre: "Thriller",
  },
  {
    id: 4,
    img: "img/c4.jpg",
    title: "John Wick 2",
    duration: "120 min",
    genre: "Adventure",
  },
  {
    id: 5,
    img: "img/c5.jpg",
    title: "Aquaman",
    duration: "120 min",
    genre: "Action",
  },
  {
    id: 6,
    img: "img/c6.jpg",
    title: "Black Panther",
    duration: "120 min",
    genre: "Thriller",
  },
  {
    id: 7,
    img: "img/c7.jpg",
    title: "Thor",
    duration: "120 min",
    genre: "Adventure",
  },
  {
    id: 8,
    img: "img/c8.jpg",
    title: "Bumlebee",
    duration: "120 min",
    genre: "Thriller",
  },
  {
    id: 9,
    img: "img/c9.jpg",
    title: "Mortal Engines",
    duration: "120 min",
    genre: "Action",
  },
  {
    id: 10,
    img: "img/c10.jpg",
    title: "UnderWorld Blood War",
    duration: "120 min",
    genre: "Action",
  },
];

const HomePage = () => {
  UseTop();

  const isAuthenticated = () => {
    return authService.isLogin();
  };

  const isAdmin = () => {
    return authService.getUserRole() === "Admin";
  };

  if (isAuthenticated() && isAdmin()) {
    return <Navigate to="/admin/dashboard" />;
  }

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
            {openingThisWeek.map((movie) => (
              <MovieCard key={movie.id} movie={movie}></MovieCard>
            ))}
          </div>
        </section>

        <section className="container py-4 mt-5" id="coming">
          <h5 className="heading">Coming Soon</h5>
          <CarouselCard listItems={commingSoon}></CarouselCard>
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
