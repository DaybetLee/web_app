import React, { Component } from "react";
import Table from "../common/table";
import TickCrossSym from "../common/tickCrossSym";

class PoliciesTable extends Component {
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

export default PoliciesTable;
