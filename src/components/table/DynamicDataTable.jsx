import DataTable from "react-data-table-component";
import PropTypes from "prop-types";

const DynamicDataTable = ({ columns, rows }) => {
  return (
    <>
      <DataTable
        columns={columns}
        data={rows}
        highlightOnHover
        responsive
        pagination
        theme="dark"
      />
    </>
  );
};

DynamicDataTable.propTypes = {
  columns: PropTypes.array,
  rows: PropTypes.array,
};

export default DynamicDataTable;
