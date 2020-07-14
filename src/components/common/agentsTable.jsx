import React from "react";

const AgentsTable = (props) => {
  const { agents, onDelete, onUpdate } = props;

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Mobile</th>
        </tr>
      </thead>
      <tbody>
        {agents.map((agent) => (
          <tr key={agent._id}>
            <td>{agent.name}</td>
            <td>{agent.email}</td>
            <td>{agent.mobile}</td>
            <td>
              <button
                onClick={() => onUpdate(agent)}
                className="btn btn-primary btn-sm m-2"
              >
                Update
              </button>
              <button
                onClick={() => onDelete(agent)}
                className="btn btn-danger btn-sm"
              >
                Resign
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AgentsTable;
