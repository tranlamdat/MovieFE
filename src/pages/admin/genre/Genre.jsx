import { Button, FloatingLabel, Form, Image, ListGroup, Modal, Spinner } from "react-bootstrap";
import AdminLayout from "../../../layouts/admin/AdminLayout";
import { useEffect, useState } from "react";
import * as yup from "yup";
import genreApi from "../../../api/genreApi";
import formatDateTime from "../../../services/FormatDateTime";
import handleError from "../../../services/HandleErrors";
import swalService from "../../../services/SwalService";
import DynamicDataTable from "../../../components/table/DynamicDataTable";
import { MEDIA_TYPE } from "../../../utils/constant";

const Genre = () => {
  const [genres, setGenres] = useState([]);
  const [searchGenres, setSearchGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [modelTitle, setModelTitle] = useState("");
  const [formData, setFormData] = useState({
    genreId: "",
    name: "",
    dateCreated: "",
    dateUpdated: "",
  });
  const [error, setError] = useState({});

  const [showFilm, setShowFilm] = useState(false);
  const [movies, setMovies] = useState([]);

  const columns = [
    {
      name: "ID",
      selector: (row) => row.genreId,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
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
      name: "Film",
      grow: 0,
      cell: (row) => (
        <button
          className="btn btn-outline-danger"
          onClick={() => handleViewFile(row)}
        >
          <i className="bi bi-eye-fill"></i>
        </button>
      ),
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="d-flex flex-wrap gap-2 py-2 justify-content-center">
          <button
            className="btn btn-outline-light"
            onClick={() => handleEdit(row.genreId)}
          >
            Edit
          </button>
          <button
            className="btn btn-danger"
            onClick={() => handleDelete(row.genreId)}
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
      genreId: "",
      name: "",
      dateCreated: "",
      dateUpdated: "",
    });
  };

  const handleShow = () => {
    setShow(true);
    setModelTitle("Add new Genre");
  };

  const handleCloseFilm = () => {
    setShowFilm(false);
  };

  // Yup validation
  const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
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
      try {
        if (formData.genreId) {
          // Update genre
          formData.dateUpdated = new Date();
          const response = await genreApi.Update(formData);
          setGenres((previousState) => {
            return previousState.map((genre) => {
              if (genre.genreId === formData.genreId) {
                response.dateCreated = formatDateTime.toDateTimeString(
                  response.dateCreated
                );
                response.dateUpdated = formatDateTime.toDateTimeString(
                  response.dateUpdated
                );
                return response;
              }
              return genre;
            });
          });
        } else {
          // Add new genre
          formData.dateCreated = new Date();
          formData.dateUpdated = new Date();
          const response = await genreApi.AddNew(formData);

          response.dateCreated = formatDateTime.toDateTimeString(
            response.dateCreated
          );
          response.dateUpdated = formatDateTime.toDateTimeString(
            response.dateUpdated
          );

          setGenres((previousState) => {
            return [response, ...previousState];
          });
        }

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

  const handleViewFile = (genre) => {
    setMovies(genre.movies);
    setShowFilm(true);
  };

  const handleEdit = async (id) => {
    const genre = await genreApi.GetOne(id);
    console.log(genre);

    setFormData((previousState) => {
      return {
        ...previousState,
        genreId: genre.genreId,
        name: genre.name,
        dateCreated: genre.dateCreated,
        dateUpdated: genre.dateUpdated,
      };
    });

    setShow(true);
    setModelTitle("View/Edit Genre");
  };

  const handleDelete = (id) => {
    swalService.confirmDelete(async () => {
      try {
        await genreApi.Remove(id);
        setGenres((previousState) => {
          return previousState.filter((genre) => genre.genreId !== id);
        });
      } catch (error) {
        handleError.showError(error);
      }
    });
  };

  const handleSearch = (event) => {
    let searchValue;
    let genreIdValue;
    let nameValue;

    const searchResult = genres.filter((row) => {
      genreIdValue = row.genreId
        .toString()
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
      nameValue = row.name
        .toLowerCase()
        .includes(event.target.value.toLowerCase());

      if (genreIdValue) {
        searchValue = genreIdValue;
      } else {
        searchValue = nameValue;
      }

      return searchValue;
    });

    setSearchGenres(searchResult);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get all genres
        const allGenres = await genreApi.getAll();

        // Format date
        allGenres.forEach((res) => {
          res.dateCreated = formatDateTime.toDateTimeString(res.dateCreated);
          res.dateUpdated = formatDateTime.toDateTimeString(res.dateUpdated);
        });

        // Set genres
        setGenres(allGenres);
      } catch (error) {
        handleError.showError(error);
      }
    };

    fetchData();
  }, []);

  return (
    <AdminLayout>
      <section className="section dashboard">
        <h3 className="text-center fw-bold mb-3">Genre Management</h3>

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
          rows={searchGenres.length > 0 ? searchGenres : genres}
        ></DynamicDataTable>

        <Modal
          show={show}
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
              <FloatingLabel
                controlId="floatingName"
                label="Name"
                className="mb-3 text-secondary"
              >
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  isInvalid={error.name}
                  placeholder="Action"
                />
                <Form.Control.Feedback type="invalid">
                  {error.name}
                </Form.Control.Feedback>
              </FloatingLabel>
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

        <Modal
          show={showFilm}
          onHide={handleCloseFilm}
          backdrop="static"
          keyboard={false}
          centered
        >
          <div className="bg-dark text-white">
            <Modal.Header closeButton closeVariant="white">
              <Modal.Title>View film of director</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="mb-3">
                {movies.length > 0 ? (
                  <ListGroup variant="flush">
                    {movies.map((movie) => (
                      <ListGroup.Item key={movie.movieId} variant="secondary">
                        <div className="d-flex gap-3">
                          <Image src={movie.movieMedias.find((media) => media.type == MEDIA_TYPE.POSTER).url} width={100} height="auto" rounded />
                          <div>
                            <h6 className="mb-2">Title: {movie.title}</h6>
                            <p className="mb-1">National: {movie.national}</p>
                            <p className="mb-1">Duration: {movie.duration} minutes</p>
                            {/* <p className="mb-1">Play: {characterName}</p> */}
                            <p className="mb-1">View: {movie.numberOfView}</p>
                          </div>
                        </div>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                ) : (
                  <p>No data</p>
                )}
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseFilm}>
                Close
              </Button>
            </Modal.Footer>
          </div>
        </Modal>
      </section>
    </AdminLayout>
  );
};

export default Genre;
