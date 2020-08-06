import React, { Component } from "react";
import Table from "../common/table";
import TickCrossSym from "../common/tickCrossSym";

class OverallPoliciesTable extends Component {
  columns = [
    { path: "name", label: "Name" },
    {
      path: "company",
      label: "Company",
      content: (policy) => {
        return policy.company.name;
      },
    },
    {
      path: "date",
      label: "Date",
      content: (policy) => {
        const date = policy.date;
        return date.slice(0, 10);
      },
    },

    { path: "amount", label: "Amount" },
    {
      path: "inforce",
      label: "Inforce",
      content: (policy) => <TickCrossSym true={policy.inforce} />,
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

export default OverallPoliciesTable;
