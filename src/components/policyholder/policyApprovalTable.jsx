import React, { Component } from "react";
import Table from "../common/table";
import TickCrossSym from "../common/tickCrossSym";

class PoliciesApprovalTable extends Component {
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
    {
      key: "approval",
      content: (policy) => (
        <button
          onClick={() => this.props.onApproval(policy.policyholder)}
          className="btn btn-success btn-sm"
        >
          Accept
        </button>
      ),
    },
    {
      key: "reject",
      content: () => {
        const reason = React.createRef();
        return (
          <React.Fragment>
            <div className="input-group mb-3">
              <input
                ref={reason}
                type="text"
                className="form-control"
                placeholder="Rejection Reason"
                aria-label="Rejection Reason"
                aria-describedby="basic-addon2"
              />
              <div className="input-group-append">
                <button
                  onClick={() => this.props.onReason(reason)}
                  className="btn btn-danger"
                  type="button"
                >
                  Reject
                </button>
              </div>
            </div>
          </React.Fragment>
        );
      },
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

export default PoliciesApprovalTable;
