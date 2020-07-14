import React from "react";

const PoliciesTable = (props) => {
  const { policies, onDelete } = props;

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Start Date</th>
          <th>inforce</th>
        </tr>
      </thead>
      <tbody>
        {policies.map((policy) => (
          <tr key={policy._id}>
            <td>{policy.name}</td>
            <td>{policy.date}</td>
            <td>{policy.inforce}</td>
            <td>
              <button
                onClick={() => onDelete(policy)}
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

export default PoliciesTable;
