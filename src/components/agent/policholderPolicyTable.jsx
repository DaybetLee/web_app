import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "../common/table";
import TickCrossSym from "../common/tickCrossSym";

class PolicyholderPolicyTable extends Component {
  columns = [
    { path: "name", label: "Name" },
    {
      path: "date",
      label: "Date",
      content: (policy) => {
        const date = policy.date;
        return date.slice(0, 10);
      },
    },
    {
      path: "inforce",
      label: "Inforce",
      content: (policy) => <TickCrossSym true={policy.inforce} />,
    },
    {
      key: "Edit",
      content: (policy) => (
        <Link
          to={`/policyholderpolicy2/${policy._id}`}
          className="btn btn-info pull-right"
          style={{ marginBottom: 20 }}
        >
          Edit
        </Link>
      ),
    },
  ];

  render() {
    const { policies, sortColumn, onSort } = this.props;
    return (
      <Table
        columns={this.columns}
        data={policies}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default PolicyholderPolicyTable;
