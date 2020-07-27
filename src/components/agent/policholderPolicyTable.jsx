import React, { Component } from "react";

import Table from "../common/table";
import Inforce from "../common/inforce";
import { Link } from "react-router-dom";

class PolicyholderPolicyTable extends Component {
  columns = [
    { path: "name", label: "Name" },
    { path: "date", label: "Date" },
    {
      path: "inforce",
      label: "Inforce",
      content: (policy) => <Inforce true={policy.inforce} />,
    },
    {
      key: "View",
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
