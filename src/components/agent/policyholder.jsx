import React, { Component } from "react";
import _ from "lodash";

import Pagination from "../common/pagination";
import PolicyholdersTable from "./policyholdersTable";

import { paginate } from "../utils/paginate";

import { getPolicyholders } from "../../services/policyholderService";

class Policyholder extends Component {
  state = {
    policyholders: [],
    currentPage: 1,
    pageSize: 4,
    sortColumn: { path: "title", order: "asc" },
  };

  componentDidMount() {
    this.setState({ policyholders: getPolicyholders() });
  }

  handleView = (policyholder) => {
    console.log(policyholder);
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      policyholders: allpolicyholder,
      sortColumn,
    } = this.state;
    const sorted = _.orderBy(
      allpolicyholder,
      [sortColumn.path],
      [sortColumn.order]
    );
    const policyholders = paginate(sorted, currentPage, pageSize);
    return { totalCount: allpolicyholder.length, data: policyholders };
  };

  render() {
    const { pageSize, currentPage, sortColumn } = this.state;
    const { totalCount, data: policyholders } = this.getPagedData();

    return (
      <React.Fragment>
        <div className="row">
          {/* <div className="col-3"></div> */}
          <div className="col">
            <PolicyholdersTable
              policyholders={policyholders}
              sortColumn={sortColumn}
              onView={this.handleView}
              onSort={this.handleSort}
            />
            <Pagination
              itemsCount={totalCount}
              pageSize={pageSize}
              onPageChange={this.handlePageChange}
              currentPage={currentPage}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Policyholder;

// policy: [],
// _id: "5f09a9e22882ec58b02e9179",
// name: "policyholder9",
// email: "policyholder9@example.com",
// mobile: 12345678,
// nric: "s1234567a",
// agent: "5f09a9af2882ec58b02e9170",
// __v: 0,
