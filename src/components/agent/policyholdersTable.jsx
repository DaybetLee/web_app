import React, { Component } from "react";

import Table from "../common/table";
import { Link } from "react-router-dom";

class PolicyholdersTable extends Component {
  columns = [
    {
      path: "name",
      label: "Name",
      content: (policyholder) => (
        <Link to={`/policyholder/${policyholder._id}`}>
          {policyholder.name}
        </Link>
      ),
    },
    { path: "email", label: "Email" },
    { path: "mobile", label: "Mobile" },
    { path: "nric", label: "NRIC" },
    {
      path: "policy",
      label: "Policy",
      content: (policyholder) => (
        <Link to={`/policyholderpolicy/${policyholder._id}`}>
          {policyholder.policy.length}
        </Link>
      ),
    },
  ];
  render() {
    const { policyholders, sortColumn, onSort } = this.props;
    return (
      <Table
        columns={this.columns}
        data={policyholders}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default PolicyholdersTable;
