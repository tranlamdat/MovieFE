import { Button, FloatingLabel, Form, Image, ListGroup, Modal, Spinner } from "react-bootstrap";
import AdminLayout from "../../../layouts/admin/AdminLayout";
import { useEffect, useState } from "react";
import actorApi from "../../../api/actorApi";
import handleError from "../../../services/HandleErrors";
import DynamicDataTable from "../../../components/table/DynamicDataTable";
import formatDateTime from "../../../services/FormatDateTime";
import countryApi from "../../../api/countryApi";
import * as yup from "yup";
import swalService from "../../../services/SwalService";
import { MEDIA_TYPE } from "../../../utils/constant";

const Actor = () => {
  const [actors, setActors] = useState([]);
  const [searchActors, setSearchActors] = useState([]);
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [modelTitle, setModelTitle] = useState("");
  const [formData, setFormData] = useState({
    actorId: "",
    name: "",
    doB: "",
    nationality: "",
    avatarUrl: "",
    publicId: "",
    newAvatar: null,
    dateCreated: "",
    dateUpdated: "",
  });
  const [error, setError] = useState({});
  const [previewImage, setPreviewImage] = useState("/img/default-avatar.png");

  const [showFilm, setShowFilm] = useState(false);
  const [movieActors, setMovieActors] = useState([]);

  const columns = [
    {
      name: "ID",
      selector: (row) => row.actorId,
      sortable: true,
    },
    {
      name: "Full Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "DoB",
      selector: (row) => row.doB,
      sortable: true,
    },
    {
      name: "Nationality",
      selector: (row) => row.nationality,
      sortable: true,
    },
    {
      name: "Avatar",
      cell: (row) => (
        <img
          src={row.avatarUrl != "" ? row.avatarUrl : "/img/default-avatar.png"}
          alt="avatar"
          style={{ width: "50px", height: "50px", objectFit: "cover" }}
          className="my-2"
        />
      ),
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
            onClick={() => handleEdit(row.actorId)}
          >
            Edit
          </button>
          <button
            className="btn btn-danger"
            onClick={() => handleDelete(row.actorId)}
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
      actorId: "",
      name: "",
      doB: "",
      nationality: "",
      avatarUrl: "",
      publicId: "",
      newAvatar: null,
      dateCreated: "",
      dateUpdated: "",
    });
  };

  const handleCloseFilm = () => {
    setShowFilm(false);
  };

  const handleShow = () => {
    setShow(true);
    setModelTitle("Add new Actor");
  };

  // Yup validation
  const schema = yup.object().shape({
    name: yup.string().required("Full name is required"),
    doB: yup
      .string()
      .required("Date of Birth is required")
      .test({
        name: "date-of-birth",
        message: "Date of Birth must be in the past",
        test: function (dateOfBirth) {
          return new Date(dateOfBirth) < new Date();
        },
      }),
    nationality: yup.string().required("Nationality is required"),
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
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);

    setFormData({
      ...formData,
      newAvatar: file,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await schema.validate(formData, { abortEarly: false });

      setIsLoading(true);
      try {
        const formDataSubmit = new FormData();
        formDataSubmit.append("name", formData.name);
        formDataSubmit.append("doB", formData.doB);
        formDataSubmit.append("nationality", formData.nationality);
        formDataSubmit.append("avatarUrl", formData.avatarUrl);
        formDataSubmit.append("publicId", formData.publicId);
        formDataSubmit.append("newAvatar", formData.newAvatar);
        formDataSubmit.append("dateCreated", new Date().toISOString());

        if (formData.actorId) {
          // Update actor
          formDataSubmit.append("actorId", formData.actorId);
          formDataSubmit.append("dateUpdated", new Date().toISOString());
          const response = await actorApi.Update(formDataSubmit);
          setActors((previousState) => {
            return previousState.map((actor) => {
              if (actor.actorId === formData.actorId) {
                response.doB = formatDateTime.toBirthdayString(response.doB);
                response.dateCreated = formatDateTime.toDateTimeString(
                  response.dateCreated
                );
                response.dateUpdated = formatDateTime.toDateTimeString(
                  response.dateUpdated
                );
                return response;
              }
              return actor;
            });
          });
        } else {
          // Add new actor
          formDataSubmit.append("dateUpdated", new Date().toISOString());
          const response = await actorApi.AddNew(formDataSubmit);

          response.doB = formatDateTime.toBirthdayString(response.doB);
          response.dateCreated = formatDateTime.toDateTimeString(
            response.dateCreated
          );
          response.dateUpdated = formatDateTime.toDateTimeString(
            response.dateUpdated
          );

          setActors((previousState) => {
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

  const handleViewFile = (actor) => {
    setMovieActors(actor.movieActors);
    setShowFilm(true);
  };

  const handleEdit = async (id) => {
    const actor = await actorApi.GetOne(id);

    if (actor.avatarUrl) {
      setPreviewImage(actor.avatarUrl);
    } else {
      setPreviewImage("/image/default-avatar.png");
    }

    setFormData((previousState) => {
      return {
        ...previousState,
        actorId: actor.actorId,
        name: actor.name,
        doB: formatDateTime.toBirthdayString(actor.doB),
        nationality: actor.nationality,
        avatarUrl: actor.avatarUrl,
        publicId: actor.publicId,
        dateCreated: actor.dateCreated,
        dateUpdated: actor.dateUpdated,
      };
    });

    setShow(true);
    setModelTitle("View/Edit Actor");
  };

  const handleDelete = (id) => {
    swalService.confirmDelete(async () => {
      try {
        await actorApi.Remove(id);
        setActors((previousState) => {
          return previousState.filter((actor) => actor.actorId !== id);
        });
      } catch (error) {
        handleError.showError(error);
      }
    });
  };

  const handleSearch = (event) => {
    let searchValue;
    let actorIdValue;
    let fullNameValue;
    let doBValue;
    let nationalityValue;

    const searchResult = actors.filter((row) => {
      actorIdValue = row.actorId
        .toString()
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
      fullNameValue = row.name
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
      doBValue = row.doB
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
      nationalityValue = row.nationality
        .toLowerCase()
        .includes(event.target.value.toLowerCase());

      if (actorIdValue) {
        searchValue = actorIdValue;
      } else if (fullNameValue) {
        searchValue = fullNameValue;
      } else if (doBValue) {
        searchValue = doBValue;
      } else {
        searchValue = nationalityValue;
      }

      return searchValue;
    });

    setSearchActors(searchResult);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [allActors, allCountries] = await Promise.all([
          // Get all actors
          actorApi.getAll(),
          // Get all countries
          countryApi.getAll(),
        ]);

        // Format date
        allActors.forEach((res) => {
          res.doB = formatDateTime.toBirthdayString(res.doB);
          res.dateCreated = formatDateTime.toDateTimeString(res.dateCreated);
          res.dateUpdated = formatDateTime.toDateTimeString(res.dateUpdated);
        });

        // Set actors
        setActors(allActors);

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
        <h3 className="text-center fw-bold mb-3">Actor Management</h3>

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
          rows={searchActors.length > 0 ? searchActors : actors}
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
              <div className="mb-3 text-center">
                <label>
                  <img
                    src={previewImage}
                    width={100}
                    height={100}
                    className="rounded-circle mb-2"
                    alt="Preview"
                  />
                </label>
                <input
                  type="file"
                  className="form-control"
                  name="newAvatar"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>

              <FloatingLabel
                controlId="floatingFullName"
                label="Full name"
                className="mb-3 text-secondary"
              >
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  isInvalid={error.name}
                  placeholder="John Doe"
                />
                <Form.Control.Feedback type="invalid">
                  {error.name}
                </Form.Control.Feedback>
              </FloatingLabel>

              <FloatingLabel
                controlId="floatingDoB"
                label="Date of Birth"
                className="mb-3 text-secondary"
              >
                <Form.Control
                  type="date"
                  name="doB"
                  value={formData.doB}
                  onChange={handleChange}
                  isInvalid={error.doB}
                  placeholder="00/00/0000"
                />
                <Form.Control.Feedback type="invalid">
                  {error.doB}
                </Form.Control.Feedback>
              </FloatingLabel>

              <FloatingLabel
                controlId="floatingNationality"
                label="Nationality"
                className="mb-3 text-secondary"
              >
                <Form.Select
                  aria-label="Floating label select example"
                  name="nationality"
                  onChange={handleChange}
                  isInvalid={error.nationality}
                  defaultValue={formData.nationality}
                >
                  <option value="">Please select a country</option>
                  {countries.map((country, index) => (
                    <option key={index} value={country}>
                      {country}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {error.nationality}
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
              <Modal.Title>View film of actors</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="mb-3">
                {movieActors.length > 0 ? (
                  <ListGroup variant="flush">
                    {movieActors.map((movieActor) => (
                      <ListGroup.Item key={movieActor.movieActorId} variant="secondary">
                        <div className="d-flex gap-3">
                          <Image src={movieActor.movie.movieMedias.find((media) => media.type == MEDIA_TYPE.POSTER).url} width={100} height="auto" rounded />
                          <div>
                            <h6 className="mb-2">Title: {movieActor.movie.title}</h6>
                            <p className="mb-1">National: {movieActor.movie.national}</p>
                            <p className="mb-1">Genre: {movieActor.movie.genre.name}</p>
                            <p className="mb-1">Play: {movieActor.characterName}</p>
                            <p className="mb-1">View: {movieActor.movie.numberOfView}</p>
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

export default Actor;
