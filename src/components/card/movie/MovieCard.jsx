import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { MEDIA_TYPE } from "../../../utils/constant";

const MovieCard = ({ movie }) => {
  return (
    <div className="box px-2 mt-4">
      <div className="box-img">
        <Link to={`/movie/${movie.movieId}`}>
          <img src={movie.movieMedias.find((media) => media.type == MEDIA_TYPE.POSTER).url} alt="" />
        </Link>
      </div>
      <Link to={`/movie/${movie.movieId}`} className="text-white">
        <h6 className="mb-0 mt-2">{movie.title}</h6>
      </Link>
      <span>
        {movie.duration} | {movie.genre.name}
      </span>
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.object,
};

export default MovieCard;
