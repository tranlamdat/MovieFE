import { useState } from "react";
import contactApi from "../../../api/contactApi";
import handleError from "../../../services/HandleErrors";
import * as yup from "yup";
import swalService from "../../../services/SwalService";
import { SWAL_POSITION } from "../../../utils/constant";
import { Button, FloatingLabel, Form, Spinner } from "react-bootstrap";

const ContactForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    contactId: "",
    firstName: "",
    lastName: "",
    email: "",
    message: "",
    dateCreated: "",
    dateUpdated: "",
  });
  const [error, setError] = useState({});

  // Yup validation
  const schema = yup.object().shape({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    message: yup.string().required("Message is required"),
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
        // Add new genre
        formData.dateCreated = new Date();
        formData.dateUpdated = new Date();
        await contactApi.AddNew(formData);
        
        swalService.showCustomPosition("Send contact successfully", "success", SWAL_POSITION.TOP_END); 4

        // Reset form
        setFormData({
          contactId: "",
          firstName: "",
          lastName: "",
          email: "",
          message: "",
          dateCreated: "",
          dateUpdated: "",
        });
        setError({});
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
    <Form
      className="border-end border-danger border-1 pe-5 mb-5 needs-validation"
      noValidate
      onSubmit={handleSubmit}
    >
      <div className="row">
        <div className="col mb-3">
          <FloatingLabel
            controlId="floatingFirstName"
            label="First Name"
            className="text-secondary"
          >
            <Form.Control
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              isInvalid={error.firstName}
              placeholder="First Name"
            />
            <Form.Control.Feedback type="invalid">
              {error.firstName}
            </Form.Control.Feedback>
          </FloatingLabel>
        </div>
        <div className="col">
          <FloatingLabel
            controlId="floatingLastName"
            label="Last Name"
            className="text-secondary"
          >
            <Form.Control
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              isInvalid={error.lastName}
              placeholder="Last Name"
            />
            <Form.Control.Feedback type="invalid">
              {error.lastName}
            </Form.Control.Feedback>
          </FloatingLabel>
        </div>
      </div>

      <FloatingLabel
        controlId="floatingEmail"
        label="Email"
        className="mb-3 text-secondary"
      >
        <Form.Control
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
          isInvalid={error.email}
          placeholder="Last Name"
        />
        <Form.Control.Feedback type="invalid">
          {error.email}
        </Form.Control.Feedback>
      </FloatingLabel>

      <FloatingLabel
        controlId="floatingMessage"
        label="Write your message"
        className="mb-3 text-secondary">
        <Form.Control
          as="textarea"
          name="message"
          value={formData.message}
          onChange={handleChange}
          isInvalid={error.message}
          placeholder="Write your message"
          style={{ height: '150px' }}
        />
        <Form.Control.Feedback type="invalid">
          {error.message}
        </Form.Control.Feedback>
      </FloatingLabel>

      <div className="row">
        <div className="col-md-12">
          <Button variant="danger" type="submit" className="py-2 px-4">
            {isLoading ? (
              <Spinner animation="border" variant="dark" />
            ) : (
              "Send Message"
            )}
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default ContactForm;
