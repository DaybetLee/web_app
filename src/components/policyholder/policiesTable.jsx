import React, { Component } from "react";

import Table from "../common/table";
import Inforce from "../common/inforce";

class PoliciesTable extends Component {
  columns = [
    { path: "name", label: "Name" },
    { path: "date", label: "Date" },
    {
      path: "inforce",
      label: "Inforce",
      content: (policy) => <Inforce true={policy.inforce} />,
    },
    // {
    //   key: "View",
    //   content: (policy) => (
    //     <button
    //       onClick={() => this.props.onDelete(policy)}
    //       className="btn btn-primary btn-sm"
    //     >
    //       View
    //     </button>
    //   ),
    // },
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
