import { Button, FloatingLabel, Form, Modal, Spinner } from "react-bootstrap";
import "./Movie.css";
import AdminLayout from "../../../layouts/admin/AdminLayout";
import { useEffect, useState } from "react";
import * as yup from "yup";
import movieApi from "../../../api/movieApi";
import formatDateTime from "../../../services/FormatDateTime";
import handleError from "../../../services/HandleErrors";
import swalService from "../../../services/SwalService";
import DynamicDataTable from "../../../components/table/DynamicDataTable";
import countryApi from "../../../api/countryApi";
import genreApi from "../../../api/genreApi";
import directorApi from "../../../api/directorApi";
import SearchForm from "../../../components/form/search/SearchForm";
import movieActorApi from "../../../api/movieActorApi";
import { MEDIA_TYPE } from "../../../utils/constant";
import movieMediaApi from "../../../api/movieMediaApi";

const AdminMovie = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const dd = String(today.getDate()).padStart(2, '0');
  const formattedDate = `${yyyy}-${mm}-${dd}`;

  const [movies, setMovies] = useState([]);
  const [searchMovies, setSearchMovies] = useState([]);
  const [countries, setCountries] = useState([]);
  const [genres, setGenres] = useState([]);
  const [directors, setDirectors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [modelTitle, setModelTitle] = useState("");
  const [formData, setFormData] = useState({
    movieId: "",
    title: "",
    releaseDate: formattedDate,
    description: "",
    duration: 0,
    national: "",
    genreId: "",
    directorId: "",
    listActors: [],
    poster: {},
    posterFile: null,
    banner: {},
    bannerFile: null,
    video: {},
    videoFile: null,
    dateCreated: "",
    dateUpdated: "",
  });
  const [previewPoster, setPreviewPoster] = useState("");
  const [previewBanner, setPreviewBanner] = useState("");
  const [previewVideo, setPreviewVideo] = useState("");
  const [error, setError] = useState({});

  const columns = [
    {
      name: "ID",
      selector: (row) => row.movieId,
      sortable: true,
    },
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Release Date",
      selector: (row) => row.releaseDate,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.description,
      sortable: true,
    },
    {
      name: "Duration",
      selector: (row) => row.duration,
      sortable: true,
    },
    {
      name: "National",
      selector: (row) => row.national,
      sortable: true,
    },
    {
      name: "Genre",
      selector: (row) => row.genre.name,
      sortable: true,
    }, {
      name: "Director",
      selector: (row) => row.director.name,
      sortable: true,
    },
    {
      name: "Date Created",
      selector: (row) => row.dateCreated,
      sortable: true,
    },
    {
      name: "Date Updated",
      selector: (row) => row.dateUpdated,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="d-flex flex-wrap gap-2 py-2 justify-content-center">
          <button
            className="btn btn-outline-light"
            onClick={() => handleEdit(row.movieId)}
          >
            Edit
          </button>
          <button
            className="btn btn-danger"
            onClick={() => handleDelete(row.movieId)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  const handleClose = () => {
    setShow(false);
    setError({});
    setFormData({
      movieId: "",
      title: "",
      releaseDate: formattedDate,
      description: "",
      duration: 0,
      national: "",
      genreId: "",
      directorId: "",
      listActors: [],
      posterFile: null,
      bannerFile: null,
      videoFile: null,
      dateCreated: "",
      dateUpdated: "",
    });
    setModelTitle("");
    setPreviewPoster("");
    setPreviewBanner("");
    setPreviewVideo("");
  };
  const handleShow = () => {
    setShow(true);
    setModelTitle("Add new Movie");
  };

  // Yup validation
  const schema = yup.object().shape({
    title: yup.string().required("Title is required"),
    releaseDate: yup.date().required("Release Date is required").test({
      name: "release-date",
      message: "Release Date must be in the future",
      test: function (value) {
        return new Date(value) >= new Date();
      },
    }),
    description: yup.string().required("Description is required"),
    duration: yup.number().required("Duration is required").test({
      name: "duration",
      message: "Duration must be greater than 0",
      test: function (value) {
        return value > 0;
      },
    }),
    national: yup.string().required("National is required"),
    genreId: yup.string().required("Genre is required"),
    directorId: yup.string().required("Director is required"),
    listActors: yup.array().min(2, "At least 2 actors is required"),
    posterFile: yup.mixed().nullable(),
    bannerFile: yup.mixed().nullable(),
    videoFile: yup.mixed().nullable(),
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onloadend = () => {
      if (e.target.name === "posterFile") {
        delete error.posterFile;
        setPreviewPoster(reader.result);
      } else if (e.target.name === "bannerFile") {
        delete error.bannerFile;
        setPreviewBanner(reader.result);
      }
    };
    reader.readAsDataURL(file);

    setFormData({
      ...formData,
      [e.target.name]: file,
    });
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onloadend = () => {
      delete error.videoFile;
      setPreviewVideo(reader.result);
    };
    reader.readAsDataURL(file);

    setFormData({
      ...formData,
      [e.target.name]: file,
    });
  };

  const ensureFileNotNull = (file, message) => {
    if (!file) {
      throw new Error(message);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError({});

    try {
      await schema.validate(formData, { abortEarly: false });
      setIsLoading(true);

      try {
        if (formData.movieId) {
          console.log(formData)

          // Update movie
          formData.dateUpdated = new Date();
          const response = await movieApi.Update(formData);
          const movieId = response.movieId;

          // Update movie actors
          const listMovieActors = formData.listActors.map((item) => {
            return {
              movieActorId: item.movieActorId,
              movieId: movieId,
              actorId: item.actor.actorId,
              characterName: item.characterName,
              dateCreated: item.movieActorId ? item.dateCreated : new Date(),
              dateUpdated: new Date(),
            };
          });

          await Promise.all(
            listMovieActors.map(async (movieActor) => {
              if (movieActor.movieActorId) {
                return await movieActorApi.Update(movieActor);
              }
              return await movieActorApi.AddNew(movieActor);
            })
          );

          // Update files concurrently
          const uploadPromises = [];

          if (formData.posterFile) {
            const posterFormData = new FormData();
            posterFormData.append("movieId", movieId);
            posterFormData.append("type", MEDIA_TYPE.POSTER);
            posterFormData.append("fileUpload", formData.posterFile);

            uploadPromises.push(movieMediaApi.Update(formData.poster.movieMediaId, posterFormData));
          }

          if (formData.bannerFile) {
            const bannerFormData = new FormData();
            bannerFormData.append("movieId", movieId);
            bannerFormData.append("type", MEDIA_TYPE.BANNER);
            bannerFormData.append("fileUpload", formData.bannerFile);

            uploadPromises.push(movieMediaApi.Update(formData.banner.movieMediaId, bannerFormData));
          }

          if (formData.videoFile) {
            const videoFormData = new FormData();
            videoFormData.append("movieId", movieId);
            videoFormData.append("type", MEDIA_TYPE.VIDEO);
            videoFormData.append("fileUpload", formData.videoFile);

            uploadPromises.push(movieMediaApi.Update(formData.video.movieMediaId, videoFormData));
          }

          await Promise.all(uploadPromises);
        } else {
          ensureFileNotNull(formData.posterFile, "Poster is required");
          ensureFileNotNull(formData.bannerFile, "Banner is required");
          ensureFileNotNull(formData.videoFile, "Video is required");

          // Add new movie
          formData.dateCreated = new Date();
          formData.dateUpdated = new Date();

          const response = await movieApi.AddNew(formData);
          const movieId = response.movieId;

          // Add new movie actors
          const listMovieActors = formData.listActors.map((item) => {
            return {
              movieId: movieId,
              actorId: item.actor.actorId,
              characterName: item.characterName,
              dateCreated: new Date(),
              dateUpdated: new Date(),
            };
          });

          await Promise.all(
            listMovieActors.map(async (movieActor) => {
              return await movieActorApi.AddNew(movieActor);
            })
          );

          // Add files
          const posterFormData = new FormData();
          const bannerFormData = new FormData();
          const videoFormData = new FormData();

          posterFormData.append("movieId", movieId);
          posterFormData.append("type", MEDIA_TYPE.POSTER);
          posterFormData.append("fileUpload", formData.posterFile);

          bannerFormData.append("movieId", movieId);
          bannerFormData.append("type", MEDIA_TYPE.BANNER);
          bannerFormData.append("fileUpload", formData.bannerFile);

          videoFormData.append("movieId", movieId);
          videoFormData.append("type", MEDIA_TYPE.VIDEO);
          videoFormData.append("fileUpload", formData.videoFile);

          await Promise.all([
            movieMediaApi.AddNew(posterFormData),
            movieMediaApi.AddNew(bannerFormData),
            movieMediaApi.AddNew(videoFormData),
          ]);
        }

        const allMovies = await movieApi.getAll();
        // Format date
        allMovies.forEach((res) => {
          res.releaseDate = formatDateTime.toDateString(res.releaseDate);
          res.dateCreated = formatDateTime.toDateTimeString(res.dateCreated);
          res.dateUpdated = formatDateTime.toDateTimeString(res.dateUpdated);
        });
        setMovies(allMovies);

        handleClose();
      } catch (error) {
        handleError.showError(error);
      } finally {
        setIsLoading(false);
      }
    } catch (error) {
      const newError = {};
      error.inner.forEach((e) => {
        newError[e.path] = e.message;
      });
      setError(newError);
    }
  };

  const handleEdit = async (id) => {
    const movie = await movieApi.GetOne(id);
    console.log(movie);

    const posterFile = movie.movieMedias.find((media) => media.type === MEDIA_TYPE.POSTER);
    setPreviewPoster(posterFile ? posterFile.url : "");

    const bannerFile = movie.movieMedias.find((media) => media.type === MEDIA_TYPE.BANNER);
    setPreviewBanner(bannerFile ? bannerFile.url : "");

    const videoFile = movie.movieMedias.find((media) => media.type === MEDIA_TYPE.VIDEO);
    setPreviewVideo(videoFile ? videoFile.url : "");

    setFormData((previousState) => {
      return {
        ...previousState,
        movieId: movie.movieId,
        title: movie.title,
        releaseDate: formatDateTime.toBirthdayString(movie.releaseDate),
        description: movie.description,
        duration: movie.duration,
        national: movie.national,
        genreId: movie.genre.genreId,
        directorId: movie.director.directorId,
        listActors: movie.movieActors,
        poster: posterFile,
        banner: bannerFile,
        video: videoFile,
        dateCreated: movie.dateCreated,
        dateUpdated: movie.dateUpdated,
      };
    });

    setShow(true);
    setModelTitle("View/Edit Movie");
  };

  const handleDelete = (id) => {
    swalService.confirmDelete(async () => {
      try {
        await movieApi.Remove(id);
        setMovies((previousState) => {
          return previousState.filter((movie) => movie.movieId !== id);
        });
      } catch (error) {
        handleError.showError(error);
      }
    });
  };

  const handleSearch = (event) => {
    let searchValue;
    let movieIdValue;
    let titleValue;

    const searchResult = movies.filter((row) => {
      movieIdValue = row.movieId
        .toString()
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
      titleValue = row.name
        .toLowerCase()
        .includes(event.target.value.toLowerCase());

      if (movieIdValue) {
        searchValue = movieIdValue;
      } else {
        searchValue = titleValue;
      }

      return searchValue;
    });

    setSearchMovies(searchResult);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [allMovies, allGenres, allDirectors, allCountries] = await Promise.all([
          // Get all movies
          movieApi.getAll(),
          // Get all genres
          genreApi.getAll(),
          // Get all directors
          directorApi.getAll(),
          // Get all countries
          countryApi.getAll(),
        ]);

        // Format date
        allMovies.forEach((res) => {
          res.releaseDate = formatDateTime.toDateString(res.releaseDate);
          res.dateCreated = formatDateTime.toDateTimeString(res.dateCreated);
          res.dateUpdated = formatDateTime.toDateTimeString(res.dateUpdated);
        });

        // Set movies
        setMovies(allMovies);
        // Set genres
        setGenres(allGenres);
        // Set directors
        setDirectors(allDirectors);

        // Set countries
        const allCountriesName = allCountries.map(
          (country) => country.name.common
        );
        allCountriesName.sort((a, b) => a.localeCompare(b));
        setCountries(allCountriesName);
      } catch (error) {
        handleError.showError(error);
      }
    };

    fetchData();
  }, []);

  return (
    <AdminLayout>
      <section className="section dashboard">
        <h3 className="text-center fw-bold mb-3">Movie Management</h3>

        <nav className="navbar navbar-dark mb-2">
          <div>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={handleSearch}
            />
          </div>
          <Button variant="danger" onClick={handleShow}>
            <i className="bi bi-plus-circle"></i> Add
          </Button>
        </nav>

        <DynamicDataTable
          columns={columns}
          rows={searchMovies.length > 0 ? searchMovies : movies}
        ></DynamicDataTable>

        <Modal
          show={show}
          size="xl"
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          centered
        >
          <Form
            className="bg-dark text-white needs-validation"
            noValidate
            onSubmit={handleSubmit}
          >
            <Modal.Header closeButton closeVariant="white">
              <Modal.Title>{modelTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="row">
                <div className="col-4">
                  <FloatingLabel
                    controlId="floatingTitle"
                    label="Title"
                    className="mb-3 text-secondary"
                  >
                    <Form.Control
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      isInvalid={error.title}
                      placeholder="Action"
                    />
                    <Form.Control.Feedback type="invalid">
                      {error.title}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </div>

                <div className="col-4">
                  <FloatingLabel
                    controlId="floatingRealeseDate"
                    label="Realese Date"
                    className="mb-3 text-secondary"
                  >
                    <Form.Control
                      type="date"
                      name="releaseDate"
                      value={formData.releaseDate}
                      onChange={handleChange}
                      isInvalid={error.releaseDate}
                      placeholder="00/00/0000"
                    />
                    <Form.Control.Feedback type="invalid">
                      {error.releaseDate}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </div>

                <div className="col-4">
                  <FloatingLabel
                    controlId="floatingDuration"
                    label="Duration"
                    className="mb-3 text-secondary"
                  >
                    <Form.Control
                      type="number"
                      name="duration"
                      value={formData.duration}
                      onChange={handleChange}
                      isInvalid={error.duration}
                      placeholder="Action"
                    />
                    <Form.Control.Feedback type="invalid">
                      {error.duration}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </div>

                <div className="col-4">
                  <FloatingLabel
                    controlId="floatingNational"
                    label="National"
                    className="mb-3 text-secondary"
                  >
                    <Form.Select
                      aria-label="Floating label select example"
                      name="national"
                      onChange={handleChange}
                      isInvalid={error.national}
                      defaultValue={formData.national}
                    >
                      <option value="">Please select a country</option>
                      {countries.map((country, index) => (
                        <option key={index} value={country}>
                          {country}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {error.national}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </div>

                <div className="col-4">
                  <FloatingLabel
                    controlId="floatingGenre"
                    label="Genre"
                    className="mb-3 text-secondary"
                  >
                    <Form.Select
                      aria-label="Floating label select example"
                      name="genreId"
                      onChange={handleChange}
                      isInvalid={error.genreId}
                      defaultValue={formData.genreId}
                    >
                      <option value="">Please select a genre</option>
                      {genres.map((genre) => (
                        <option key={genre.genreId} value={genre.genreId}>
                          {genre.name}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {error.genreId}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </div>

                <div className="col-4">
                  <FloatingLabel
                    controlId="floatingDirector"
                    label="Director"
                    className="mb-3 text-secondary"
                  >
                    <Form.Select
                      aria-label="Floating label select example"
                      name="directorId"
                      onChange={handleChange}
                      isInvalid={error.directorId}
                      defaultValue={formData.directorId}
                    >
                      <option value="">Please select a director</option>
                      {directors.map((director) => (
                        <option key={director.directorId} value={director.directorId}>
                          {director.name}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {error.directorId}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </div>
              </div>

              <FloatingLabel controlId="floatingDescription" label="Description" className="mb-3 text-secondary">
                <Form.Control
                  as="textarea"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  isInvalid={error.description}
                  placeholder="Leave a description here"
                  style={{ height: '150px' }}
                />
                <Form.Control.Feedback type="invalid">
                  {error.description}
                </Form.Control.Feedback>
              </FloatingLabel>

              <div className="mt-4">
                <h4>Search Actor</h4>
                <SearchForm errorListActors={error.listActors} formData={formData} setFormData={setFormData}></SearchForm>
                <Form.Control.Feedback type="invalid">
                  {error.listActors}
                </Form.Control.Feedback>
              </div>

              <div className="mt-4">
                <h4>Media</h4>

                <div className="row">
                  <Form.Group className="col-12 col-md-4 mb-3">
                    <Form.Label>Poster</Form.Label>
                    <Form.Control type="file" id="posterFile" name="posterFile" accept="image/*" onChange={handleImageChange} />
                    {/* Preview image */}
                    {previewPoster && (
                      <div className="text-center mt-3">
                        <img src={previewPoster} alt="poster" className="w-100 h-auto" />
                      </div>
                    )}
                  </Form.Group>

                  <Form.Group className="col-12 col-md-4 mb-3">
                    <Form.Label>Banner</Form.Label>
                    <Form.Control type="file" id="bannerFile" name="bannerFile" accept="image/*" onChange={handleImageChange} />
                    {/* Preview image */}
                    {previewBanner && (
                      <div className="text-center mt-3">
                        <img src={previewBanner} alt="poster" className="w-100" />
                      </div>
                    )}
                  </Form.Group>

                  <Form.Group className="col-12 col-md-4 mb-3">
                    <Form.Label>Video</Form.Label>
                    <Form.Control type="file" id="videoFile" name="videoFile" accept="video/*" onChange={handleVideoChange} />
                    {/* Preview image */}
                    {previewVideo && (
                      <div className="text-center mt-3">
                        <video src={previewVideo} controls className="w-100"></video>
                      </div>
                    )}
                  </Form.Group>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="danger" type="submit" disabled={isLoading}>
                {isLoading ? (
                  <Spinner animation="border" variant="dark" />
                ) : (
                  "Save Changes"
                )}
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </section>
    </AdminLayout>
  );
};

export default AdminMovie;
