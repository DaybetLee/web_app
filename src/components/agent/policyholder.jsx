import React, { Component } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";

import Pagination from "../common/pagination";
import PolicyholdersTable from "./policyholdersTable";

import { paginate } from "../utils/paginate";

import { getPolicyholders } from "../../services/policyholderService";

import SearchBox from "./../common/searchBox";

class Policyholder extends Component {
  state = {
    policyholders: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    sortColumn: { path: "title", order: "asc" },
  };

  async componentDidMount() {
    const { data: policyholders } = await getPolicyholders();
    this.setState({ policyholders });
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

  handleSearch = (query) => {
    this.setState({ searchQuery: query, currentPage: 1 });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      policyholders: allpolicyholder,
      sortColumn,
      searchQuery,
    } = this.state;

    let filtered = allpolicyholder;
    if (searchQuery)
      filtered = allpolicyholder.filter((p) =>
        p.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const policyholders = paginate(sorted, currentPage, pageSize);
    return { totalCount: allpolicyholder.length, data: policyholders };
  };

  render() {
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;
    const { totalCount, data: policyholders } = this.getPagedData();

    return (
      <React.Fragment>
        <div className="row">
          <div className="col">
            <Link
              to="/policyholder/new"
              className="btn btn-success pull-right"
              style={{ marginBottom: 20 }}
            >
              Add
            </Link>
            <SearchBox value={searchQuery} onChange={this.handleSearch} />
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
