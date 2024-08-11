import Carousel from "react-multi-carousel";
import MovieCard from "../movie/MovieCard";
import PropTypes from "prop-types";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1200 },
    items: 6,
  },
  desktop: {
    breakpoint: { max: 1200, min: 992 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 992, min: 768 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 768, min: 0 },
    items: 2,
  },
  mobileSmall: {
    breakpoint: { max: 576, min: 0 },
    items: 1,
  },
};

const CarouselCard = ({ listItems }) => {
  return (
    <Carousel
      additionalTransfrom={0}
      arrows
      autoPlaySpeed={3000}
      centerMode={false}
      className="coming-container"
      draggable
      focusOnSelect={false}
      infinite={false}
      itemClass=""
      keyBoardControl
      minimumTouchDrag={80}
      pauseOnHover
      renderArrowsWhenDisabled={false}
      renderButtonGroupOutside={false}
      renderDotsOutside={false}
      responsive={responsive}
      rewind={false}
      rewindWithAnimation={false}
      rtl={false}
      shouldResetAutoplay
      showDots={false}
      sliderClass=""
      slidesToSlide={1}
      swipeable
    >
      {listItems.length > 0 && listItems.map((item) => (
        <MovieCard key={item.movieId} movie={item}></MovieCard>
      ))}
    </Carousel>
  );
};

CarouselCard.propTypes = {
  listItems: PropTypes.array,
};

export default CarouselCard;
