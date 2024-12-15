import AdminLayout from "../../../layouts/admin/AdminLayout";
import DynamicDataTable from "../../../components/table/DynamicDataTable";
import { useEffect, useState } from "react";
import contactApi from "../../../api/contactApi";
import formatDateTime from "../../../services/FormatDateTime";
import handleError from "../../../services/HandleErrors";
import { Button, Modal } from "react-bootstrap";
import swalService from "../../../services/SwalService";

const Contact = () => {
  const [contacts, setContacts] = useState([]);
  const [searchContacts, setSearchContacts] = useState([]);
  const [contact, setContact] = useState({});
  const [showDetail, setShowDetail] = useState(false);

  const columns = [
    {
      name: "ID",
      selector: (row) => row.contactId,
      sortable: true,
    },
    {
      name: "First Name",
      selector: (row) => row.firstName,
      sortable: true,
    },
    {
      name: "Last Name",
      selector: (row) => row.lastName,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Message",
      selector: (row) => row.message,
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
            onClick={() => handleView(row.contactId)}
          >
            View
          </button>
          <button
            className="btn btn-danger"
            onClick={() => handleDelete(row.contactId)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  const handleCloseDetail = () => {
    setShowDetail(false);
    setContact({});
  };

  const handleShowDetail = () => {
    setShowDetail(true);
  };

  const handleView = (id) => {
    const contact = contacts.find((contact) => contact.contactId === id);
    setContact(contact);
    handleShowDetail();
  };

  const handleDelete = (id) => {
    swalService.confirmDelete(async () => {
      try {
        await contactApi.Remove(id);
        setContacts((previousState) => {
          return previousState.filter((contact) => contact.contactId !== id);
        });
      } catch (error) {
        handleError.showError(error);
      }
    });
  };

  const handleSearch = (event) => {
    let searchValue;
    let contactIdValue;
    let firstNameValue;
    let lastNameValue;
    let emailValue;
    let messageValue;

    const searchResult = contacts.filter((row) => {
      contactIdValue = row.contactId
        .toString()
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
      firstNameValue = row.firstName
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
      lastNameValue = row.lastName
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
      emailValue = row.email
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
      messageValue = row.message
        .toLowerCase()
        .includes(event.target.value.toLowerCase());

      if (contactIdValue) {
        searchValue = contactIdValue;
      } else if (firstNameValue) {
        searchValue = firstNameValue;
      } else if (lastNameValue) {
        searchValue = lastNameValue;
      } else if (emailValue) {
        searchValue = emailValue;
      } else {
        searchValue = messageValue;
      }

      return searchValue;
    });

    setSearchContacts(searchResult);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allContacts = await contactApi.getAll();

        // Format date
        allContacts.forEach((res) => {
          res.dateCreated = formatDateTime.toDateTimeString(res.dateCreated);
          res.dateUpdated = formatDateTime.toDateTimeString(res.dateUpdated);
        });

        // Set actors
        setContacts(allContacts);
      } catch (error) {
        handleError.showError(error);
      }
    };

    fetchData();
  }, []);

  return (
    <AdminLayout>
      <section className="section dashboard">
        <h3 className="text-center fw-bold mb-3">Contact Management</h3>

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
        </nav>

        <DynamicDataTable
          columns={columns}
          rows={searchContacts.length > 0 ? searchContacts : contacts}
        ></DynamicDataTable>

        <Modal
          show={showDetail}
          onHide={handleCloseDetail}
          backdrop="static"
          keyboard={false}
          centered
        >
          <div className="bg-dark text-white">
            <Modal.Header closeButton closeVariant="white">
              <Modal.Title>View contact</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="mb-3">
                {contact ? (
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      <span className="fw-bold">First name:</span>{" "}
                      {contact.firstName}
                    </li>
                    <li className="list-group-item">
                      <span className="fw-bold">Last name:</span>{" "}
                      {contact.lastName}
                    </li>
                    <li className="list-group-item">
                      <span className="fw-bold">Email:</span> {contact.email}
                    </li>
                    <li className="list-group-item">
                      <span className="fw-bold">Message:</span>{" "}
                      {contact.message}
                    </li>
                  </ul>
                ) : (
                  <p>No data</p>
                )}
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseDetail}>
                Close
              </Button>
            </Modal.Footer>
          </div>
        </Modal>
      </section>
    </AdminLayout>
  );
};

export default Contact;
