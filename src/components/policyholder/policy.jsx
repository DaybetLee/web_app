import React, { Component } from "react";
import _ from "lodash";

import Pagination from "../common/pagination";
import ListGroup from "../common/listGroup";
import PoliciesTable from "./policiesTable";

import { paginate } from "../utils/paginate";

import { getPolicies } from "../../services/policyService";
import { getCompanies } from "../../services/companyService";

import SearchBox from "./../common/searchBox";

class Policy extends Component {
  state = {
    policies: [],
    company: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    selectedCompany: null,
    sortColumn: { path: "title", order: "asc" },
  };

  async componentDidMount() {
    const { data } = await getCompanies();
    const company = [{ _id: "", name: "All Company" }, ...data];

    const { data: policies } = await getPolicies();
    this.setState({ policies, company });
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleCompanySelect = (company) => {
    this.setState({
      selectedCompany: company,
      searchQuery: "",
      currentPage: 1,
    });
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
      searchQuery,
    } = this.state;

    let filtered = allPolicy;

    if (searchQuery)
      filtered = allPolicy.filter((p) =>
        p.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedCompany && selectedCompany._id)
      filtered = allPolicy.filter((p) => p.company._id === selectedCompany._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const policies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: policies };
  };

  handleSearch = (query) => {
    this.setState({
      searchQuery: query,
      selectedCompany: null,
      currentPage: 1,
    });
  };

  render() {
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;
    const { totalCount, data: policies } = this.getPagedData();

    return (
      <React.Fragment>
        <div className="row">
          <div className="col-3">
            <ListGroup
              items={this.state.company}
              selectedItem={this.state.selectedCompany}
              onItemSelect={this.handleCompanySelect}
            />
          </div>
          <div className="col">
            <SearchBox value={searchQuery} onChange={this.handleSearch} />
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

export default Policy;
