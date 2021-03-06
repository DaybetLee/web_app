import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "../common/table";
import TickCrossSym from "../common/tickCrossSym";

class AgentsTable extends Component {
  columns = [
    {
      path: "name",
      label: "Name",
      content: (agent) => {
        if (agent.active) {
          return <Link to={`/agent/${agent._id}`}>{agent.name}</Link>;
        } else return <span>{agent.name}</span>;
      },
    },

    { path: "email", label: "Email" },
    { path: "mobile", label: "Mobile" },
    {
      path: "active",
      label: "Active",
      content: (agent) => <TickCrossSym true={agent.active} />,
    },
    {
      path: "policyholder",
      label: "No. Policy",
      content: (agent) => <span>{agent.policyholder.length}</span>,
    },
    {
      key: "resign",
      content: (agent) => {
        if (agent.active)
          return (
            <Link
              to={`/resign/${agent._id}`}
              className="btn btn-danger btn-sm"
              disabled={!agent.active}
            >
              Resign
            </Link>
          );
        else
          return (
            <button className="btn btn-danger btn-sm" disabled={!agent.active}>
              Resign
            </button>
          );
      },
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
