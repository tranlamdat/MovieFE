import { useState } from "react";
import DynamicDataTable from "../../../components/table/DynamicDataTable";
import AdminLayout from "../../../layouts/admin/AdminLayout";

const Dashboard = () => {
  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Full Name",
      selector: (row) => row.fullName,
      sortable: true,
    },
    {
      name: "Height",
      selector: (row) => row.height,
      sortable: true,
    },
    {
      name: "Weight",
      selector: (row) => row.weight,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <>
          <button
            className="btn btn-outline-light"
            onClick={() => handleEdit(row.id)}
          >
            Edit
          </button>
          <button
            className="btn btn-danger ms-2"
            onClick={() => handleDelete(row.id)}
          >
            Delete
          </button>
        </>
      ),
    },
  ];

  const rows = [
    {
      id: 1,
      fullName: "John Doe",
      height: "1.75m",
      weight: "89kg",
    },
    {
      id: 2,
      fullName: "Jane Doe",
      height: "1.64m",
      weight: "55kg",
    },
    {
      id: 3,
      fullName: "Sheera Maine",
      height: "1.69m",
      weight: "74kg",
    },
    {
      id: 4,
      fullName: "John Doe",
      height: "1.75m",
      weight: "89kg",
    },
    {
      id: 5,
      fullName: "Jane Doe",
      height: "1.64m",
      weight: "55kg",
    },
    {
      id: 6,
      fullName: "Sheeraawaii",
      height: "1.69m",
      weight: "74kg",
    },
    {
      id: 7,
      fullName: "John Doe",
      height: "1.75m",
      weight: "89kg",
    },
    {
      id: 8,
      fullName: "Jane Doe",
      height: "1.64m",
      weight: "55kg",
    },
    {
      id: 9,
      fullName: "Sheeraawaii",
      height: "1.69m",
      weight: "74kg",
    },
    {
      id: 10,
      fullName: "John Doe",
      height: "1.75m",
      weight: "89kg",
    },
    {
      id: 11,
      fullName: "Jane Doe",
      height: "1.64m",
      weight: "55kg",
    },
    {
      id: 12,
      fullName: "Sheeraawaii",
      height: "1.69m",
      weight: "74kg",
    },
    {
      id: 13,
      fullName: "John Doe",
      height: "1.75m",
      weight: "89kg",
    },
    {
      id: 14,
      fullName: "Jane Doe",
      height: "1.64m",
      weight: "55kg",
    },
    {
      id: 15,
      fullName: "Sheeraawaii",
      height: "1.69m",
      weight: "74kg",
    },
    {
      id: 16,
      fullName: "John Doe",
      height: "1.75m",
      weight: "89kg",
    },
    {
      id: 17,
      fullName: "Jane Doe",
      height: "1.64m",
      weight: "55kg",
    },
    {
      id: 18,
      fullName: "Sheeraawaii",
      height: "1.69m",
      weight: "74kg",
    },
    {
      id: 19,
      fullName: "John Doe",
      height: "1.75m",
      weight: "89kg",
    },
    {
      id: 20,
      fullName: "Jane Doe",
      height: "1.64m",
      weight: "55kg",
    },
    {
      id: 21,
      fullName: "Sheeraawaii",
      height: "1.69m",
      weight: "74kg",
    },
  ];

  const [data, setData] = useState(rows);

  const handleSearch = (e) => {
    let searchValue;
    let personIDValue;
    let fullNameValue;
    let heightValue;

    const newRows = rows.filter((row) => {
      personIDValue = row.id
        .toString()
        .toLowerCase()
        .includes(e.target.value.toLowerCase());
      fullNameValue = row.fullName
        .toLowerCase()
        .includes(e.target.value.toLowerCase());
      heightValue = row.height
        .toLowerCase()
        .includes(e.target.value.toLowerCase());

      if (personIDValue) {
        searchValue = personIDValue;
      } else if (fullNameValue) {
        searchValue = fullNameValue;
      } else {
        searchValue = heightValue;
      }

      return searchValue;
    });

    setData(newRows);
  };

  const handleEdit = (id) => {
    alert("Edit " + id);
  };

  const handleDelete = (id) => {
    alert("Delete " + id);
  };

  return (
    <AdminLayout>
      <section className="section dashboard">
        <h1>Dashboard</h1>
        <input
          type="search"
          className="form-control-sm border ps-3"
          placeholder="Search"
          onChange={handleSearch}
        />
        <DynamicDataTable columns={columns} rows={data}></DynamicDataTable>
      </section>
    </AdminLayout>
  );
};

export default Dashboard;
