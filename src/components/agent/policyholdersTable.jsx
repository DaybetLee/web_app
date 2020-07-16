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
    // {
    //   key: "update",
    //   content: (policyholder) => (
    //     <button
    //       onClick={() => this.props.onView(policyholder)}
    //       className="btn btn-primary btn-sm"
    //     >
    //       View
    //     </button>
    //   ),
    // },
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
