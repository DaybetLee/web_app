import React, { Component } from "react";
import { Link } from "react-router-dom";

import Table from "../common/table";

class AgentsTable extends Component {
  columns = [
    {
      path: "name",
      label: "Name",
      content: (agent) => <Link to={`/agent/${agent._id}`}>{agent.name}</Link>,
    },
    { path: "email", label: "Email" },
    { path: "mobile", label: "Mobile" },

    {
      key: "resign",
      content: (agent) => (
        <button
          onClick={() => this.props.onDelete(agent)}
          className="btn btn-danger btn-sm"
        >
          Resign
        </button>
      ),
    },
  ];
  render() {
    const { agents, sortColumn, onSort } = this.props;

    return (
      <Table
        columns={this.columns}
        data={agents}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default AgentsTable;
