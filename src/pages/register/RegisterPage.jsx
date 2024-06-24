import { useState } from "react";
import UseTop from "../../hooks/UseTop";
import BaseLayout from "../../layouts/base/BaseLayout";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import handleError from "../../services/HandleErrors";
import authApi from "../../api/authApi";
import { Spinner } from "react-bootstrap";

const RegisterPage = () => {
  UseTop();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    termAndCondition: false,
  });
  const [error, setError] = useState({});

  // Yup validation
  const schema = yup.object().shape({
    email: yup.string().email().required("Email is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .required("Confirm Password is required")
      .oneOf([yup.ref("password"), null], "Passwords must match"),
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    termAndCondition: yup.boolean().oneOf([true], "You must accept the terms"),
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (event) => {
    setFormData({
      ...formData,
      termAndCondition: event.target.checked,
    });
  };

  // Form
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await schema.validate(formData, { abortEarly: false });
      setIsLoading(true);
      try {
        delete formData.confirmPassword;
        delete formData.termAndCondition;

        await authApi.register(formData);
        navigate("/login");
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

  return (
    <BaseLayout>
      <section className="">
        <div className="px-4 py-5 px-md-5 text-center text-lg-start">
          <div className="container">
            <div className="row gx-lg-5 align-items-center">
              <div className="col-lg-6 mb-5 mb-lg-0">
                <h1 className="my-5 display-3 fw-bold ls-tight">
                  The best offer <br />
                  <span className="text-primary">for your business</span>
                </h1>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Eveniet, itaque accusantium odio, soluta, corrupti aliquam
                  quibusdam tempora at cupiditate quis eum maiores libero
                  veritatis? Dicta facilis sint aliquid ipsum atque?
                </p>
              </div>

              <div className="col-lg-6 mb-5 mb-lg-0">
                <div className="card">
                  <div className="card-body py-5 px-md-5">
                    <h2 className="fw-bold mb-5 text-uppercase text-center">
                      Sign up now
                    </h2>

                    <form
                      className="mb-4 needs-validation"
                      onSubmit={handleSubmit}
                      noValidate
                    >
                      <div className="row">
                        <div className="col mb-3">
                          <div className="form-floating">
                            <input
                              type="text"
                              className={`form-control ${
                                error.firstName ? "is-invalid" : ""
                              }`}
                              id="firstName"
                              name="firstName"
                              value={formData.firstName}
                              onChange={handleChange}
                              placeholder="First name"
                            />
                            <div className="invalid-feedback">
                              {error.firstName ? error.firstName : ""}
                            </div>
                            <label
                              htmlFor="firstName"
                              className="text-secondary"
                            >
                              First name
                            </label>
                          </div>
                        </div>
                        <div className="col">
                          <div className="form-floating">
                            <input
                              type="text"
                              className={`form-control ${
                                error.lastName ? "is-invalid" : ""
                              }`}
                              id="lastName"
                              name="lastName"
                              value={formData.lastName}
                              onChange={handleChange}
                              placeholder="Last name"
                            />
                            <div className="invalid-feedback">
                              {error.lastName ? error.lastName : ""}
                            </div>
                            <label
                              htmlFor="lastName"
                              className="text-secondary"
                            >
                              Last name
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="form-floating mb-3">
                        <input
                          type="email"
                          className={`form-control ${
                            error.email ? "is-invalid" : ""
                          }`}
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="name@example.com"
                        />
                        <div className="invalid-feedback">
                          {error.email ? error.email : ""}
                        </div>
                        <label htmlFor="email" className="text-secondary">
                          Email address
                        </label>
                      </div>

                      <div className="form-floating mb-3">
                        <input
                          type="password"
                          className={`form-control ${
                            error.password ? "is-invalid" : ""
                          }`}
                          id="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="Password"
                        />
                        <div className="invalid-feedback">
                          {error.password ? error.password : ""}
                        </div>
                        <label htmlFor="password" className="text-secondary">
                          Password
                        </label>
                      </div>

                      <div className="form-floating mb-3">
                        <input
                          type="password"
                          className={`form-control ${
                            error.confirmPassword ? "is-invalid" : ""
                          }`}
                          id="confirmPassword"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          placeholder="Confirm password"
                        />
                        <div className="invalid-feedback">
                          {error.confirmPassword ? error.confirmPassword : ""}
                        </div>
                        <label
                          htmlFor="confirmPassword"
                          className="text-secondary"
                        >
                          Confirm password
                        </label>
                      </div>

                      <div className="form-check mb-5">
                        <input
                          className={`form-check-input me-2 ${
                            error.termAndCondition ? "is-invalid" : ""
                          }`}
                          type="checkbox"
                          id="termAndCondition"
                          name="termAndCondition"
                          value={formData.termAndCondition}
                          onChange={handleCheckboxChange}
                        />
                        <label
                          className="form-check-label text-reset"
                          htmlFor="termAndCondition"
                        >
                          I accept
                          <a href="#!" className="link-danger">
                            {" "}
                            the terms and guidelines{" "}
                          </a>
                          of this privacy statement.
                        </label>
                        <div className="invalid-feedback">
                          {error.termAndCondition ? error.termAndCondition : ""}
                        </div>
                      </div>

                      <div className="d-grid">
                        <button
                          className="btn btn-lg btn-danger btn-block px-5"
                          type="submit"
                        >
                          {isLoading ? (
                            <Spinner animation="border" variant="light" />
                          ) : (
                            "Sign up"
                          )}
                        </button>
                      </div>
                    </form>

                    <div className="d-flex justify-content-between align-items-center my-3">
                      <div className="border border-1 w-100"></div>
                      <p className="text-center fw-bold mx-3 mb-0 text-muted">
                        OR
                      </p>
                      <div className="border border-1 w-100"></div>
                    </div>

                    <div className="text-center">
                      <p>sign up with</p>

                      <div className="d-flex justify-content-center text-center pt-1 gap-4">
                        <a href="#!" className="text-dark">
                          <h4>
                            <i className="bi bi-facebook"></i>
                          </h4>
                        </a>
                        <a href="#!" className="text-dark">
                          <h4>
                            <i className="bi bi-twitter"></i>
                          </h4>
                        </a>
                        <a href="#!" className="text-dark">
                          <h4>
                            <i className="bi bi-google"></i>
                          </h4>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </BaseLayout>
  );
};

export default RegisterPage;
