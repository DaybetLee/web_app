import React, { Component } from "react";

import { getPolicies } from "../services/policyService";
import NavBar from "./common/navbar.jsx";
import Pagination from "../components/common/pagination";
import { paginate } from "./utils/paginate";

class Policyholder extends Component {
  state = {
    policies: getPolicies(),
    currentPage: 1,
    pageSize: 4,
  };

  handleDelete = (policy) => {
    console.log(policy);
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  render() {
    const { length: count } = this.state.policies;
    const { pageSize, currentPage, policies: allPolicy } = this.state;
    const policies = paginate(allPolicy, currentPage, pageSize);

    return (
      <React.Fragment>
        <NavBar />
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Start Date</th>
              <th>inforce</th>
            </tr>
          </thead>
          <tbody>
            {policies.map((policy) => (
              <tr key={policy._id}>
                <td>{policy.name}</td>
                <td>{policy.date}</td>
                <td>{policy.inforce}</td>
                <td>
                  <button
                    onClick={() => this.handleDelete(policy)}
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

export default Policyholder;

// inforce: true,
// _id: "5f09aa112882ec58b02e9171",
// name: "policy1",
// policyholder: "5f09a9cc2882ec58b02e9171",
// company: "5f09a9972882ec58b02e916e",
// date: "2020-07-11T12:01:21.122Z",
// __v: 0,
