import { Card, Figure, Image, Tab, Table, Tabs } from "react-bootstrap";
import BaseLayout from "../../layouts/base/BaseLayout";
import "./MoviePage.css";
import UseTop from "../../hooks/UseTop";
import CarouselCard from "../../components/card/carousel/CarouselCard";
import VideoPlayer from "../../components/video-player/VideoPlayer";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import movieApi from "../../api/movieApi";
import handleError from "../../services/HandleErrors";
import { MEDIA_TYPE } from "../../utils/constant";
import { formatDistanceToNow } from "date-fns";

const MoviePage = () => {
  UseTop();
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});
  const [relatedMovie, setRelatedMovie] = useState([]);
  const [isWatchNow, setIsWatchNow] = useState(false);

  const handleWatchNow = () => {
    setIsWatchNow(true);
  };

  const getFormatDistanceToNow = (date) => {
    const formattedDate = formatDistanceToNow(new Date(date), {
      addSuffix: true,
    });

    return formattedDate;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getMovie = await movieApi.GetOne(movieId);
        // Set movie
        setMovie(getMovie);

        const getRelatedMovie = await movieApi.RelatedMovie(getMovie.genre.genreId);
        // Set related movies
        setRelatedMovie(getRelatedMovie);
      } catch (error) {
        handleError.showError(error);
      }
    };

    fetchData();
  }, [movieId]);

  const bannerUrl = movie.movieMedias?.find((media) => media.type === MEDIA_TYPE.BANNER);
  const posterUrl = movie.movieMedias?.find((media) => media.type === MEDIA_TYPE.POSTER);
  const videoUrl = movie.movieMedias?.find((media) => media.type === MEDIA_TYPE.VIDEO);

  return (
    <BaseLayout>
      <section>
        <div className="container py-5">
          <div className="row">
            <div className="col-12">
              <div
                className="card bg-dark text-white"
                style={{ borderRadius: "1rem" }}
              >
                <div className="card-body p-5">
                  <Card className="text-bg-secondary p-3 mb-3">
                    {bannerUrl && (
                      <Card.Img
                        src={bannerUrl?.url}
                        className="card-img"
                        alt="Card image"
                      />
                    )}
                    <Card.ImgOverlay>
                      <div className="row py-4">
                        <div className="col-12 col-md-5 col-xl-3 text-center">
                          <figure className="figure">
                            {posterUrl && (
                              <img
                                src={posterUrl?.url}
                                className="figure-img img-fluid rounded"
                                alt="..."
                              />
                            )}
                            <figcaption className="figure-caption">
                              <button
                                className="btn btn-danger"
                                onClick={handleWatchNow}
                              >
                                Watch now
                              </button>
                            </figcaption>
                          </figure>
                        </div>
                        <div className="col-12 col-md-7 col-xl-9">
                          <Card.Title as="h1">{movie.title}</Card.Title>
                          <Card.Text>{movie.description}</Card.Text>
                          <Card.Text>{getFormatDistanceToNow(movie.dateCreated ?? new Date())}</Card.Text>
                        </div>
                      </div>
                    </Card.ImgOverlay>
                  </Card>

                  {isWatchNow && videoUrl && (
                    <div className="card text-bg-secondary p-3 mb-3">
                      <VideoPlayer url={videoUrl?.url}></VideoPlayer>
                    </div>
                  )}

                  <Card className="text-bg-secondary">
                    <Card.Body>
                      <Tabs
                        defaultActiveKey="information"
                        id="uncontrolled-tab-example"
                        className="mb-3 custom-tab"
                      >
                        <Tab eventKey="information" title="Information">
                          <Table striped bordered hover variant="dark">
                            <tbody>
                              <tr>
                                <td className="col-4 col-md-3 col-lg-2 fw-bold">
                                  Status
                                </td>
                                <td>Released</td>
                              </tr>
                              <tr>
                                <td className="fw-bold">Genre</td>
                                <td>{movie.genre?.name}</td>
                              </tr>
                              <tr>
                                <td className="fw-bold">Director</td>
                                <td>{movie.director?.name}</td>
                              </tr>
                              <tr>
                                <td className="fw-bold">National</td>
                                <td>{movie.national}</td>
                              </tr>
                              <tr>
                                <td className="fw-bold">Duration</td>
                                <td>{movie.duration} minutes</td>
                              </tr>
                            </tbody>
                          </Table>
                        </Tab>
                        <Tab eventKey="character" title="Character">
                          <div className="d-flex flex-wrap gap-3">
                            {movie.movieActors?.map((item, index) => (
                              <div key={index} className="text-center" style={{ width: "160px" }}>
                                <Image
                                  src={item.actor.avatarUrl}
                                  width={150}
                                  height={150}
                                  roundedCircle
                                  style={{ objectFit: "cover" }}
                                />
                                <h6>{item.actor.name} ({item.characterName})</h6>
                              </div>
                            ))}
                          </div>
                        </Tab>
                        <Tab eventKey="picture" title="Picture">
                          <Figure>
                            <Figure.Image src={bannerUrl?.url} width={"100%"} />
                            <Figure.Caption>
                              {bannerUrl?.name}
                            </Figure.Caption>
                          </Figure>
                        </Tab>
                      </Tabs>
                    </Card.Body>
                  </Card>

                  <section className="container py-3 px-0" id="coming">
                    <h5 className="heading">Related</h5>
                    <CarouselCard listItems={relatedMovie}></CarouselCard>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </BaseLayout>
  );
};

export default MoviePage;
