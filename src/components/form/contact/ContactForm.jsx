const ContactForm = () => {
  return (
    <form className="border-end border-danger border-1 pe-5 mb-5">
      <div className="row">
        <div className="col mb-3">
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="firstName"
              placeholder="First name"
            />
            <label htmlFor="firstName" className="text-secondary">
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
            <label htmlFor="lastName" className="text-secondary">
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
        <textarea
          className="form-control"
          name="message"
          id="message"
          style={{ height: "150px" }}
          placeholder="Write your message"
        ></textarea>
        <label htmlFor="message" className="text-secondary">
          Write your message
        </label>
      </div>

      <div className="row">
        <div className="col-md-12">
          <input
            type="submit"
            value="Send Message"
            className="btn btn-danger py-2 px-4"
          />
        </div>
      </div>
    </form>
  );
};

export default ContactForm;
