import "./BaseFooter.css";

const BaseFooter = () => {
  return (
    <footer className="container py-4 mt-5">
      <section className="footer">
        <a href="#" className="logo">
          <i className="bx bxs-movie"></i>Movie
        </a>
        <div className="social">
          <a href="#">
            <i className="bx bxl-facebook"></i>
          </a>
          <a href="#">
            <i className="bx bxl-twitter"></i>
          </a>
          <a href="#">
            <i className="bx bxl-instagram"></i>
          </a>
          <a href="#">
            <i className="bx bxl-tiktok"></i>
          </a>
        </div>
      </section>

      <div className="copyright">
        <p>&#169; 2002-2024 Movie, Inc.</p>
      </div>
    </footer>
  );
};

export default BaseFooter;
