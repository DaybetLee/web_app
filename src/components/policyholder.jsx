import React, { Component } from "react";

import { getPolicies } from "../services/policyService";
import { getCompanies } from "../services/companyService";
import NavBar from "./common/navbar.jsx";
import Pagination from "../components/common/pagination";
import { paginate } from "./utils/paginate";
import PoliciesTable from "./policiesTable";
import ListGroup from "./common/listGroup";

class Policyholder extends Component {
  state = {
    policies: [],
    company: [],
    currentPage: 1,
    pageSize: 4,
  };

  componentDidMount() {
    const company = [{ _id: "", name: "All Company" }, ...getCompanies()];

    this.setState({ policies: getPolicies(), company });
  }

  handleDelete = (policy) => {
    console.log(policy);
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleCompanySelect = (company) => {
    this.setState({ selectedCompany: company, currentPage: 1 });
  };

  render() {
    const {
      pageSize,
      currentPage,
      policies: allPolicy,
      selectedCompany,
    } = this.state;

    const filtered =
      selectedCompany && selectedCompany._id
        ? allPolicy.filter((p) => p.company._id === selectedCompany._id)
        : allPolicy;

    const policies = paginate(filtered, currentPage, pageSize);

    return (
      <React.Fragment>
        <NavBar />
        <div className="row">
          <div className="col-3">
            <ListGroup
              items={this.state.company}
              selectedItem={this.state.selectedCompany}
              onItemSelect={this.handleCompanySelect}
            />
          </div>
          <div className="col">
            <PoliciesTable policies={policies} onDelete={this.handleDelete} />
            <Pagination
              itemsCount={filtered.length}
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

// inforce: true,
// _id: "5f09aa112882ec58b02e9171",
// name: "policy1",
// policyholder: "5f09a9cc2882ec58b02e9171",
// company: "5f09a9972882ec58b02e916e",
// date: "2020-07-11T12:01:21.122Z",
// __v: 0,
