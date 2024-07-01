import { Button, Table } from "react-bootstrap";
import AdminLayout from "../../../layouts/admin/AdminLayout";
import { useEffect, useState } from "react";
import actorApi from "../../../api/actorApi";
import handleError from "../../../services/HandleErrors";
import DynamicDataTable from "../../../components/table/DynamicDataTable";
import formatDateTime from "../../../services/FormatDateTime";

const Actor = () => {
  const [actors, setActors] = useState([]);

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
        <>
          <button
            className="btn btn-outline-light"
            onClick={() => handleEdit(row.actorId)}
          >
            Edit
          </button>
          <button
            className="btn btn-danger ms-2"
            onClick={() => handleDelete(row.actorId)}
          >
            Delete
          </button>
        </>
      ),
    },
  ];

  const handleEdit = (id) => {
    alert("Edit " + id);
  };

  const handleDelete = (id) => {
    alert("Delete " + id);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get all actors
        const response = await actorApi.getAll();
        // Format date
        response.forEach((res) => {
          res.doB = formatDateTime.toDateString(res.doB);
          res.dateCreated = formatDateTime.toDateTimeString(res.dateCreated);
          res.dateUpdated = formatDateTime.toDateTimeString(res.dateUpdated);
        });
        // Set actors
        setActors(response);
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
            />
          </div>
          <Button variant="danger">
            <i className="bi bi-plus-circle"></i> Add
          </Button>
        </nav>

        {/* <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
          </tbody>
        </Table> */}
        <DynamicDataTable columns={columns} rows={actors}></DynamicDataTable>
      </section>
    </AdminLayout>
  );
};

export default Actor;
