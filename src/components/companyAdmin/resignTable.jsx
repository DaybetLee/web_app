import React, { Component } from "react";
import Table from "../common/table";
import TickCrossSym from "../common/tickCrossSym";

class ResignTable extends Component {
  columns = [
    {
      path: "name",
      label: "Name",
      content: (agent) => <span>{agent.name}</span>,
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
      content: (agent) => (
        <button
          onClick={() => this.props.onTransfer(agent)}
          className="btn btn-info btn-sm"
          disabled={!agent.active || agent._id === this.props.resigneeId}
        >
          Transfer
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

export default ResignTable;
