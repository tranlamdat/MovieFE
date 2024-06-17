import BaseLayout from "../../layouts/base/BaseLayout";

const RegisterPage = () => {
  return (
    <BaseLayout>
      <section className="vh-100">
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

                    <form className="mb-4">
                      <div className="row">
                        <div className="col mb-3">
                          <div className="form-floating">
                            <input
                              type="text"
                              className="form-control"
                              id="firstName"
                              placeholder="First name"
                            />
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
                              className="form-control"
                              id="lastName"
                              placeholder="Last name"
                            />
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
                          className="form-control"
                          id="email"
                          placeholder="name@example.com"
                        />
                        <label htmlFor="email" className="text-secondary">
                          Email address
                        </label>
                      </div>

                      <div className="form-floating mb-3">
                        <input
                          type="password"
                          className="form-control"
                          id="password"
                          placeholder="Password"
                        />
                        <label htmlFor="password" className="text-secondary">
                          Password
                        </label>
                      </div>

                      <div className="form-floating mb-3">
                        <input
                          type="password"
                          className="form-control"
                          id="confirmPassword"
                          placeholder="Confirm password"
                        />
                        <label
                          htmlFor="confirmPassword"
                          className="text-secondary"
                        >
                          Confirm password
                        </label>
                      </div>

                      <div className="form-check d-flex justify-content-start mb-5">
                        <input
                          className="form-check-input me-2"
                          type="checkbox"
                          id="form2Example33"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="form2Example33"
                        >
                          I accept
                          <a href="#!" className="link-danger">
                            {" "}
                            the terms and guidelines{" "}
                          </a>
                          of this privacy statement.
                        </label>
                      </div>

                      <div className="d-grid">
                        <button
                          className="btn btn-lg btn-danger btn-block px-5"
                          type="submit"
                        >
                          Sign up
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
