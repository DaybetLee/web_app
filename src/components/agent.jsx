import React, { Component } from "react";

import { getPolicyholders } from "../services/policyholderService";
import NavBar from "./common/navbar.jsx";
import Pagination from "../components/common/pagination";
import { paginate } from "./utils/paginate";
import PolicyholdersTable from "./common/policyholdersTable";

class Agent extends Component {
  state = {
    policyholders: [],
    currentPage: 1,
    pageSize: 4,
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

  render() {
    const { length: count } = this.state.policyholders;
    const {
      pageSize,
      currentPage,
      policyholders: allpolicyholder,
    } = this.state;
    const policyholders = paginate(allpolicyholder, currentPage, pageSize);

    return (
      <React.Fragment>
        <NavBar />
        <div className="row">
          {/* <div className="col-3"></div> */}
          <div className="col">
            <PolicyholdersTable
              policyholders={policyholders}
              onView={this.handleView}
            />
            <Pagination
              itemsCount={count}
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

export default Agent;

// policy: [],
// _id: "5f09a9e22882ec58b02e9179",
// name: "policyholder9",
// email: "policyholder9@example.com",
// mobile: 12345678,
// nric: "s1234567a",
// agent: "5f09a9af2882ec58b02e9170",
// __v: 0,
