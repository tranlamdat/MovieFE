import PropTypes from 'prop-types';

const MovieCard = ({ movie }) => {
  return (
    <div className="box px-2 mt-4">
      <div className="box-img">
        <img src={movie.img} alt="" />
      </div>
      <h6 className="mb-0 mt-2">{movie.title}</h6>
      <span>
        {movie.duration} | {movie.genre}
      </span>
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    img: PropTypes.string,
    title: PropTypes.string,
    duration: PropTypes.string,
    genre: PropTypes.string,
  }),
};

export default MovieCard;
