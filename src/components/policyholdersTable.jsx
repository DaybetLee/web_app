import React, { Component } from "react";

import Table from "./common/table";

class PolicyholdersTable extends Component {
  columns = [
    { path: "name", label: "Name" },
    { path: "email", label: "Email" },
    { path: "mobile", label: "Mobile" },
    { path: "nric", label: "NRIC" },
    {
      key: "update",
      content: (policyholder) => (
        <button
          onClick={() => this.props.onView(policyholder)}
          className="btn btn-primary btn-sm"
        >
          View
        </button>
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
