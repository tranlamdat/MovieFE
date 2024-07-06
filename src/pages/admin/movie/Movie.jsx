import { Button, FloatingLabel, Form, Modal, Spinner } from "react-bootstrap";
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
    dateCreated: "",
    dateUpdated: "",
  });
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
      dateCreated: "",
      dateUpdated: "",
    });
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
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await schema.validate(formData, { abortEarly: false });

      setIsLoading(true);

      console.log(formData);
      // try {
      //   if (formData.movieId) {
      //     // Update movie
      //     formData.dateUpdated = new Date();
      //     const response = await movieApi.Update(formData);
      //     setMovies((previousState) => {
      //       return previousState.map((movie) => {
      //         if (movie.movieId === formData.movieId) {
      //           response.releaseDate = formatDateTime.toDateString(response.releaseDate);
      //           response.dateCreated = formatDateTime.toDateTimeString(
      //             response.dateCreated
      //           );
      //           response.dateUpdated = formatDateTime.toDateTimeString(
      //             response.dateUpdated
      //           );
      //           return response;
      //         }
      //         return movie;
      //       });
      //     });
      //   } else {
      //     // Add new movie
      //     formData.dateCreated = new Date();
      //     formData.dateUpdated = new Date();
      //     const response = await movieApi.AddNew(formData);

      //     response.releaseDate = formatDateTime.toDateString(response.releaseDate);
      //     response.dateCreated = formatDateTime.toDateTimeString(
      //       response.dateCreated
      //     );
      //     response.dateUpdated = formatDateTime.toDateTimeString(
      //       response.dateUpdated
      //     );

      //     setMovies((previousState) => {
      //       return [response, ...previousState];
      //     });
      //   }

      //   handleClose();
      // } catch (error) {
      //   handleError.showError(error);
      // } finally {
      //   setIsLoading(false);
      // }
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

    setFormData((previousState) => {
      return {
        ...previousState,
        movieId: movie.movieId,
        title: movie.title,
        releaseDate: movie.releaseDate,
        description: movie.description,
        duration: movie.duration,
        national: movie.national,
        genreId: movie.genreId,
        directorId: movie.directorId,
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

        console.log(allMovies);

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
          fullscreen={true}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          centered
        >
          <Form
            className="vh-100 bg-dark text-white needs-validation"
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

                  <FloatingLabel controlId="floatingDescription" label="Description" className="mb-3 text-secondary">
                    <Form.Control
                      as="textarea"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      isInvalid={error.description}
                      placeholder="Leave a description here"
                      style={{ height: '100px' }}
                    />
                    <Form.Control.Feedback type="invalid">
                      {error.description}
                    </Form.Control.Feedback>
                  </FloatingLabel>

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
                <div className="col-4">

                </div>
                <div className="col-4">

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
