import { Link, useNavigate } from "react-router-dom";
import BaseLayout from "../../layouts/base/BaseLayout";
import { useState } from "react";
import * as yup from "yup";
import UseTop from "../../hooks/UseTop";

const LoginPage = () => {
  UseTop();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({});

  // Yup validation
  const schema = yup.object().shape({
    email: yup.string().email().required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Form
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await schema.validate(formData, { abortEarly: false });

      setIsLoading(true);
      console.log(formData);
      // try {
      //   const response = await userApi.login(formData);
      //   authService.saveUser(response);
      //   navigate("/");
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

  return (
    <BaseLayout>
      <section className="">
        <div className="container py-5 h-100">
          <div className="row justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div
                className="card bg-dark text-white"
                style={{ borderRadius: "1rem" }}
              >
                <div className="card-body p-5">
                  <div className="mb-md-5 mt-md-4 pb-5">
                    <div className="text-center">
                      <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                      <p className="text-white-50 mb-5">
                        Please enter your login and password!
                      </p>
                    </div>

                    <form
                      className="mb-4 needs-validation"
                      onSubmit={handleSubmit}
                      noValidate
                    >
                      <div className="form-floating mb-3">
                        <input
                          type="email"
                          className={`form-control ${
                            error.email ? "is-invalid" : ""
                          }`}
                          id="email"
                          name="email"
                          placeholder="name@example.com"
                          value={formData.email}
                          onChange={handleChange}
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
                          placeholder="Password"
                          value={formData.password}
                          onChange={handleChange}
                        />
                        <div className="invalid-feedback">
                          {error.password ? error.password : ""}
                        </div>
                        <label htmlFor="password" className="text-secondary">
                          Password
                        </label>
                      </div>

                      <div className="d-flex justify-content-between align-items-center mb-5">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="form1Example3"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="form1Example3"
                          >
                            {" "}
                            Remember me
                          </label>
                        </div>
                        <Link to="/login" className="link-danger">
                          Forgot password?
                        </Link>
                      </div>

                      <div className="d-grid">
                        <button
                          className="btn btn-lg btn-outline-danger btn-block px-5"
                          type="submit"
                        >
                          Login
                        </button>
                      </div>
                    </form>

                    <div className="d-flex justify-content-center text-center pt-1 gap-4">
                      <a href="#!" className="text-white">
                        <h4>
                          <i className="bi bi-facebook"></i>
                        </h4>
                      </a>
                      <a href="#!" className="text-white">
                        <h4>
                          <i className="bi bi-twitter"></i>
                        </h4>
                      </a>
                      <a href="#!" className="text-white">
                        <h4>
                          <i className="bi bi-google"></i>
                        </h4>
                      </a>
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="mb-0">
                      Don&apos;t have an account?{" "}
                      <Link to="/sign-up" className="link-danger fw-bold">
                        Sign Up
                      </Link>
                    </p>
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

export default LoginPage;
