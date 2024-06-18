import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  return (
    <div className="box px-2 mt-4">
      <div className="box-img">
        <Link to={`/movie/${movie.id}`}>
          <img src={movie.img} alt="" />
        </Link>
      </div>
      <Link to={`/movie/${movie.id}`} className="text-white">
        <h6 className="mb-0 mt-2">{movie.title}</h6>
      </Link>
      <span>
        {movie.duration} | {movie.genre}
      </span>
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number,
    img: PropTypes.string,
    title: PropTypes.string,
    duration: PropTypes.string,
    genre: PropTypes.string,
  }),
};

export default MovieCard;
