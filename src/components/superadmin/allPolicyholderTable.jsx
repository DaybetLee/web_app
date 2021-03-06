import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "../common/table";

class AllPolicyholderTable extends Component {
  columns = [
    {
      path: "name",
      label: "Name",
      content: (policyholder) => (
        <Link to={`/overallpolicy/${policyholder.nric}`}>
          {policyholder.name}
        </Link>
      ),
    },
    { path: "email", label: "Email" },
    { path: "mobile", label: "Mobile" },
    { path: "nric", label: "NRIC" },
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

export default AllPolicyholderTable;
