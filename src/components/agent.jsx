import React, { Component } from "react";

import { getPolicyholders } from "../services/policyholderService";
import NavBar from "./common/navbar.jsx";
import Pagination from "../components/common/pagination";
import { paginate } from "./utils/paginate";

class Agent extends Component {
  state = {
    policyholders: getPolicyholders(),
    currentPage: 1,
    pageSize: 4,
  };

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
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>NRIC</th>
            </tr>
          </thead>
          <tbody>
            {policyholders.map((policyholder) => (
              <tr key={policyholder._id}>
                <td>{policyholder.name}</td>
                <td>{policyholder.email}</td>
                <td>{policyholder.mobile}</td>
                <td>{policyholder.nric}</td>
                <td>
                  <button
                    onClick={() => this.handleView(policyholder)}
                    className="btn btn-primary btn-sm"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          itemsCount={count}
          pageSize={pageSize}
          onPageChange={this.handlePageChange}
          currentPage={currentPage}
        />
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
