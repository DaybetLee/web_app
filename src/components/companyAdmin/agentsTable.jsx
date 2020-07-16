import React, { Component } from "react";

import Table from "../common/table";

class AgentsTable extends Component {
  columns = [
    { path: "name", label: "Name" },
    { path: "email", label: "Email" },
    { path: "mobile", label: "Mobile" },
    {
      key: "update",
      content: (agent) => (
        <button
          onClick={() => this.props.onUpdate(agent)}
          className="btn btn-primary btn-sm"
        >
          Update
        </button>
      ),
    },
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
