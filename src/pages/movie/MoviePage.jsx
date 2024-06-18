import { Card, Figure, Image, Tab, Table, Tabs } from "react-bootstrap";
import BaseLayout from "../../layouts/base/BaseLayout";
import "./MoviePage.css";
import UseTop from "../../hooks/UseTop";
import CarouselCard from "../../components/card/carousel/CarouselCard";
import VideoPlayer from "../../components/video-player/VideoPlayer";
import { useState } from "react";

const relatedMovie = [
  {
    id: 1,
    img: "/img/c1.jpg",
    title: "Venom",
    duration: "120 min",
    genre: "Action",
  },
  {
    id: 2,
    img: "/img/c2.jpg",
    title: "Dunkirk",
    duration: "120 min",
    genre: "Adventure",
  },
  {
    id: 3,
    img: "/img/c3.jpg",
    title: "Batman",
    duration: "120 min",
    genre: "Thriller",
  },
  {
    id: 4,
    img: "/img/c4.jpg",
    title: "John Wick 2",
    duration: "120 min",
    genre: "Adventure",
  },
  {
    id: 5,
    img: "/img/c5.jpg",
    title: "Aquaman",
    duration: "120 min",
    genre: "Action",
  },
  {
    id: 6,
    img: "/img/c6.jpg",
    title: "Black Panther",
    duration: "120 min",
    genre: "Thriller",
  },
  {
    id: 7,
    img: "/img/c7.jpg",
    title: "Thor",
    duration: "120 min",
    genre: "Adventure",
  },
  {
    id: 8,
    img: "/img/c8.jpg",
    title: "Bumlebee",
    duration: "120 min",
    genre: "Thriller",
  },
  {
    id: 9,
    img: "/img/c9.jpg",
    title: "Mortal Engines",
    duration: "120 min",
    genre: "Action",
  },
  {
    id: 10,
    img: "/img/c10.jpg",
    title: "UnderWorld Blood War",
    duration: "120 min",
    genre: "Action",
  },
];

const MoviePage = () => {
  UseTop();
  const [isWatchNow, setIsWatchNow] = useState(false);

  const handleWatchNow = () => {
    setIsWatchNow(true);
  };

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
                    <Card.Img
                      src="/img/home1.jpg"
                      className="card-img"
                      alt="Card image"
                    />
                    <Card.ImgOverlay>
                      <div className="row py-4">
                        <div className="col-12 col-md-5 col-xl-3 text-center">
                          <figure className="figure">
                            <img
                              src="/img/c1.jpg"
                              className="figure-img img-fluid rounded"
                              alt="..."
                            />
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
                          <Card.Title as="h2">My Demon</Card.Title>
                          <Card.Text>
                            This is a wider card with supporting text below as a
                            natural lead-in to additional content. This content
                            is a little bit longer.
                          </Card.Text>
                          <Card.Text>Last updated 3 mins ago</Card.Text>
                        </div>
                      </div>
                    </Card.ImgOverlay>
                  </Card>

                  {isWatchNow && (
                    <div className="card text-bg-secondary p-3 mb-3">
                      <VideoPlayer url="/video/trailer.mp4"></VideoPlayer>
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
                                <td>Anime</td>
                              </tr>
                              <tr>
                                <td className="fw-bold">Director</td>
                                <td>Sotozaki Haruo</td>
                              </tr>
                              <tr>
                                <td className="fw-bold">National</td>
                                <td>Japan</td>
                              </tr>
                              <tr>
                                <td className="fw-bold">Duration</td>
                                <td>1h 30m</td>
                              </tr>
                            </tbody>
                          </Table>
                        </Tab>
                        <Tab eventKey="character" title="Character">
                          <div className="d-flex flex-wrap gap-3">
                            <div className="text-center">
                              <Image
                                src="/img/c3.jpg"
                                width={150}
                                height={150}
                                roundedCircle
                                style={{ objectFit: "cover" }}
                              />
                              <h6>Naruto</h6>
                            </div>
                            <div className="text-center">
                              <Image
                                src="/img/c3.jpg"
                                width={150}
                                height={150}
                                roundedCircle
                                style={{ objectFit: "cover" }}
                              />
                              <h6>Naruto</h6>
                            </div>
                          </div>
                        </Tab>
                        <Tab eventKey="picture" title="Picture">
                          <Figure>
                            <Figure.Image src="/img/home1.jpg" width={"100%"} />
                            <Figure.Caption>
                              Nulla vitae elit libero, a pharetra augue mollis
                              interdum.
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
