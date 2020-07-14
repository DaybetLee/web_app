import React from "react";

const PolicyholdersTable = (props) => {
  const { policyholders, onView } = props;

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Mobile</th>
          <th>NRIC</th>
        </tr>
      </thead>
      <tbody>
        {policyholders.map((policyholder) => (
          <tr key={policyholder._id}>
            <td>{policyholder.name}</td>
            <td>{policyholder.email}</td>
            <td>{policyholder.mobile}</td>
            <td>{policyholder.nric}</td>
            <td>
              <button
                onClick={() => onView(policyholder)}
                className="btn btn-primary btn-sm"
              >
                View
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PolicyholdersTable;
