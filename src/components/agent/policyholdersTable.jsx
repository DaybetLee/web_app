import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "../common/table";

class PolicyholdersTable extends Component {
  columns = [
    {
      path: "name",
      label: "Name",
      content: (policyholder) => {
        if (policyholder.viewable) {
          return (
            <Link to={`/policyholder/${policyholder._id}`}>
              {policyholder.name}
            </Link>
          );
        } else return <span>{policyholder.name}</span>;
      },
    },
    { path: "email", label: "Email" },
    { path: "mobile", label: "Mobile" },
    { path: "nric", label: "NRIC" },
    {
      path: "policy",
      label: "Policy",
      content: (policyholder) => {
        if (policyholder.viewable) {
          return (
            <Link to={`/policyholderpolicy/${policyholder._id}`}>
              {policyholder.policy.length}
            </Link>
          );
        } else return <span>Pending</span>;
      },
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
