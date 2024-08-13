import BaseLayout from "../../layouts/base/BaseLayout";
import "./ProfilePage.css";
import MemberProtected from "../../layouts/base/MemberProtected";
import { useEffect, useState } from "react";
import authService from "../../services/AuthService";
import handleError from "../../services/HandleErrors";
import formatDateTime from "../../services/FormatDateTime";
import { Card, Col, Form, Nav, Row, Spinner, Tab } from "react-bootstrap";
import userApi from "../../api/userApi";
import * as yup from "yup";
import swalService from "../../services/SwalService";
import { SWAL_POSITION } from "../../utils/constant";

const ProfilePage = () => {
  const phonePattern = /^(\(0\d{1,3}\)\d{7})|(0\d{9,10})$/;
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    userId: "",
    email: "",
    firstName: "",
    lastName: "",
    gender: "true",
    telephone: "",
    profilePicture: "",
    newProfilePicture: null,
    roleId: "",
    dateCreated: "",
    dateUpdated: "",
  });
  const [error, setError] = useState({});
  const [previewImage, setPreviewImage] = useState("/img/default-avatar-1.png");
  const [formChangePassword, setFormChangePassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [errorChangePassword, setErrorChangePassword] = useState({});

  // Yup validation
  const schema = yup.object().shape({
    email: yup.string().email().required("Email is required"),
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    gender: yup.string().required("Gender is required"),
    telephone: yup.string().matches(phonePattern, 'Phone number is not valid')
  });

  const schemaChangePassword = yup.object().shape({
    currentPassword: yup.string().required("Old Password is required"),
    newPassword: yup.string().required("New Password is required"),
    confirmPassword: yup.string().oneOf([yup.ref('newPassword'), null], 'Passwords must match'),
  })

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleChangePassword = (event) => {
    const { name, value } = event.target;
    setFormChangePassword({
      ...formChangePassword,
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
      newProfilePicture: file,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await schema.validate(formData, { abortEarly: false });
      setIsLoading(true);
      try {
        const formDataSubmit = new FormData();
        formDataSubmit.append("userId", formData.userId);
        formDataSubmit.append("email", formData.email);
        formDataSubmit.append("firstName", formData.firstName);
        formDataSubmit.append("lastName", formData.lastName);
        formDataSubmit.append("gender", formData.gender == "true" ? true : false);
        formDataSubmit.append("telephone", formData.telephone);
        formDataSubmit.append("profilePicture", formData.profilePicture);
        formDataSubmit.append("newProfilePicture", formData.newProfilePicture);
        formDataSubmit.append("roleId", formData.roleId);
        formDataSubmit.append("dateCreated", formData.dateCreated);
        formDataSubmit.append("dateUpdated", new Date().toISOString());

        await userApi.Update(formDataSubmit);

        swalService.showCustomPosition("Profile updated successfully", "success", SWAL_POSITION.TOP_END);
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

  const handleSubmitChangePassword = async (event) => {
    event.preventDefault();
    try {
      await schemaChangePassword.validate(formChangePassword, { abortEarly: false });
      setIsLoading(true);
      try {
        const user = authService.getUserData();
        delete formChangePassword.confirmPassword;
        await userApi.ChangePassword(user.userId, formChangePassword);
        swalService.showCustomPosition("Password updated successfully", "success", SWAL_POSITION.TOP_END);
        setFormChangePassword({ currentPassword: "", newPassword: "", confirmPassword: "" });
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
      setErrorChangePassword(newError);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = authService.getUserData();
        const profile = await userApi.GetOne(user.userId);

        setFormData({
          userId: profile.userId,
          email: profile.email,
          firstName: profile.firstName,
          lastName: profile.lastName,
          gender: profile.gender ? "true" : "false" ?? "true",
          telephone: profile.telephone ?? "",
          profilePicture: profile.profilePicture ?? "",
          roleId: profile.role.roleId,
          dateCreated: profile.dateCreated,
          dateUpdated: profile.dateUpdated,
        })

        if (profile.profilePicture) {
          setPreviewImage(profile.profilePicture);
        }
      } catch (error) {
        handleError.showError(error);
      }
    };

    fetchData();
  }, []);

  return (
    <MemberProtected>
      <BaseLayout>
        <section className="container py-4 mt-5">
          <div className="row">
            <div className="col-12">
              <div
                className="card bg-dark text-white"
                style={{ borderRadius: "1rem" }}
              >
                <div className="p-5">
                  <Card className="text-bg-secondary">
                    <Card.Body>
                      <Tab.Container id="left-tabs-example" defaultActiveKey="profile">
                        <Row>
                          <Col sm={3}>
                            <Nav variant="pills" className="flex-column custom-tab">
                              <Nav.Item>
                                <Nav.Link eventKey="profile">Profile</Nav.Link>
                              </Nav.Item>
                              <Nav.Item>
                                <Nav.Link eventKey="privacy">Privacy</Nav.Link>
                              </Nav.Item>
                            </Nav>
                          </Col>
                          <Col sm={9}>
                            <Tab.Content>
                              <Tab.Pane eventKey="profile">
                                {formData && (
                                  <div className="row justify-content-center">
                                    <Form
                                      className="needs-validation col-md-8 col-lg-6"
                                      onSubmit={handleSubmit}
                                      noValidate
                                    >
                                      <div className="text-center">
                                        <figure className="figure">
                                          <img src={previewImage} className="figure-img rounded avatar" alt="Avatar" />
                                          <figcaption className="figure-caption text-light">
                                            <h5 className="mt-2 mb-1">{formData?.firstName} {formData?.lastName}</h5>
                                            <p>Joined: {formatDateTime.toDateString(formData?.dateCreated)}</p>
                                          </figcaption>
                                        </figure>
                                      </div>

                                      <Form.Group
                                        controlId="email"
                                        className="mb-3"
                                      >
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                          type="text"
                                          name="email"
                                          value={formData.email}
                                          onChange={handleChange}
                                          isInvalid={error.email}
                                          placeholder="John Doe"
                                          disabled
                                        />
                                        <Form.Control.Feedback type="invalid">
                                          {error.email}
                                        </Form.Control.Feedback>
                                      </Form.Group>

                                      <Form.Group
                                        controlId="firstName"
                                        className="mb-3"
                                      >
                                        <Form.Label>First name</Form.Label>
                                        <Form.Control
                                          type="text"
                                          name="firstName"
                                          value={formData.firstName}
                                          onChange={handleChange}
                                          isInvalid={error.firstName}
                                          placeholder="John"
                                        />
                                        <Form.Control.Feedback type="invalid">
                                          {error.firstName}
                                        </Form.Control.Feedback>
                                      </Form.Group>

                                      <Form.Group
                                        controlId="lastName"
                                        className="mb-3"
                                      >
                                        <Form.Label>Last name</Form.Label>
                                        <Form.Control
                                          type="text"
                                          name="lastName"
                                          value={formData.lastName}
                                          onChange={handleChange}
                                          isInvalid={error.lastName}
                                          placeholder="Doe"
                                        />
                                        <Form.Control.Feedback type="invalid">
                                          {error.lastName}
                                        </Form.Control.Feedback>
                                      </Form.Group>

                                      <div className="mb-3">
                                        <Form.Label>Gender</Form.Label>
                                        <div>
                                          <Form.Check
                                            inline
                                            label="Male"
                                            name="gender"
                                            type="radio"
                                            value="true"
                                            id="inline-radio-1"
                                            checked={formData.gender === "true"}
                                            onClick={handleChange}
                                          />
                                          <Form.Check
                                            inline
                                            label="Female"
                                            name="gender"
                                            type="radio"
                                            value="false"
                                            id="inline-radio-2"
                                            checked={formData.gender === "false"}
                                            onClick={handleChange}
                                          />
                                        </div>
                                      </div>

                                      <Form.Group
                                        controlId="telephone"
                                        className="mb-3"
                                      >
                                        <Form.Label>Telephone</Form.Label>
                                        <Form.Control
                                          type="text"
                                          name="telephone"
                                          value={formData.telephone}
                                          onChange={handleChange}
                                          isInvalid={error.telephone}
                                          placeholder="0123456789"
                                        />
                                        <Form.Control.Feedback type="invalid">
                                          {error.telephone}
                                        </Form.Control.Feedback>
                                      </Form.Group>

                                      <Form.Group controlId="formFile" className="mb-3">
                                        <Form.Label>Avatar</Form.Label>
                                        <Form.Control type="file" accept="image/*" name="newProfilePicture" onChange={handleImageChange} />
                                      </Form.Group>

                                      <div className="text-center mt-4">
                                        <button
                                          className="btn btn-danger px-5"
                                          type="submit"
                                        >
                                          {isLoading ? (
                                            <Spinner animation="border" variant="light" />
                                          ) : (
                                            "Save changes"
                                          )}
                                        </button>
                                      </div>
                                    </Form>
                                  </div>
                                )}
                              </Tab.Pane>
                              <Tab.Pane eventKey="privacy">
                                <div className="row justify-content-center">
                                  <Form
                                    className="needs-validation col-md-8 col-lg-6"
                                    onSubmit={handleSubmitChangePassword}
                                    noValidate
                                  >
                                    <Form.Group
                                      controlId="currentPassword"
                                      className="mb-3"
                                    >
                                      <Form.Label>Current password</Form.Label>
                                      <Form.Control
                                        type="password"
                                        name="currentPassword"
                                        value={formChangePassword.currentPassword}
                                        onChange={handleChangePassword}
                                        isInvalid={errorChangePassword.currentPassword}
                                      />
                                      <Form.Control.Feedback type="invalid">
                                        {errorChangePassword.currentPassword}
                                      </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group
                                      controlId="newPassword"
                                      className="mb-3"
                                    >
                                      <Form.Label>New password</Form.Label>
                                      <Form.Control
                                        type="password"
                                        name="newPassword"
                                        value={formChangePassword.newPassword}
                                        onChange={handleChangePassword}
                                        isInvalid={errorChangePassword.newPassword}
                                      />
                                      <Form.Control.Feedback type="invalid">
                                        {errorChangePassword.newPassword}
                                      </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group
                                      controlId="confirmPassword"
                                      className="mb-3"
                                    >
                                      <Form.Label>Confirm new password</Form.Label>
                                      <Form.Control
                                        type="password"
                                        name="confirmPassword"
                                        value={formChangePassword.confirmPassword}
                                        onChange={handleChangePassword}
                                        isInvalid={errorChangePassword.confirmPassword}
                                      />
                                      <Form.Control.Feedback type="invalid">
                                        {errorChangePassword.confirmPassword}
                                      </Form.Control.Feedback>
                                    </Form.Group>

                                    <div className="text-center mt-4">
                                      <button
                                        className="btn btn-danger px-5"
                                        type="submit"
                                      >
                                        {isLoading ? (
                                          <Spinner animation="border" variant="light" />
                                        ) : (
                                          "Save changes"
                                        )}
                                      </button>
                                    </div>
                                  </Form>
                                </div>
                              </Tab.Pane>
                            </Tab.Content>
                          </Col>
                        </Row>
                      </Tab.Container>
                    </Card.Body>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>
      </BaseLayout>
    </MemberProtected>
  );
}

export default ProfilePage