import React, { Component } from "react";
import _ from "lodash";

import NavBar from "./common/navbar.jsx";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import PoliciesTable from "./policiesTable";

import { paginate } from "./utils/paginate";

import { getPolicies } from "../services/policyService";
import { getCompanies } from "../services/companyService";

class Policyholder extends Component {
  state = {
    policies: [],
    company: [],
    currentPage: 1,
    pageSize: 4,
    sortColumn: { path: "title", order: "asc" },
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

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      policies: allPolicy,
      sortColumn,
      selectedCompany,
    } = this.state;

    const filtered =
      selectedCompany && selectedCompany._id
        ? allPolicy.filter((p) => p.company._id === selectedCompany._id)
        : allPolicy;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const policies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: policies };
  };
  render() {
    const { pageSize, currentPage, sortColumn } = this.state;
    const { totalCount, data: policies } = this.getPagedData();

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
            <PoliciesTable
              policies={policies}
              sortColumn={sortColumn}
              onDelete={this.handleDelete}
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

// inforce: true,
// _id: "5f09aa112882ec58b02e9171",
// name: "policy1",
// policyholder: "5f09a9cc2882ec58b02e9171",
// company: "5f09a9972882ec58b02e916e",
// date: "2020-07-11T12:01:21.122Z",
// __v: 0,
