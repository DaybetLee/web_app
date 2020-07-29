import React, { Component } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";

import Pagination from "../common/pagination";
import PoliciesholderPolicyTable from "./policholderPolicyTable";

import { paginate } from "../utils/paginate";

import SearchBox from "../common/searchBox";

import { getPolicyholder } from "../../services/policyholderService";

class PolicyholderPolicy extends Component {
  state = {
    policies: [],
    company: [],
    currentPage: 1,
    pageSize: 4,
    sortColumn: { path: "title", order: "asc" },
    searchQuery: "",
  };

  async componentDidMount() {
    const { data: policyholder } = await getPolicyholder(
      this.props.match.params.id
    );
    const policies = [...policyholder.policy];
    this.setState({ policies });
  }

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
      policies: allPolicy,
      sortColumn,
      searchQuery,
    } = this.state;

    let filtered = allPolicy;

    if (searchQuery)
      filtered = allPolicy.filter((p) =>
        p.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const policies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: policies };
  };

  render() {
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;
    const { totalCount, data: policies } = this.getPagedData();
    const link = this.props.match.params.id;
    return (
      <React.Fragment>
        <div className="row">
          <div className="col">
            <Link
              to={"/policyholderpolicy2/" + link}
              className="btn btn-success pull-right"
              style={{ marginBottom: 20 }}
            >
              Add
            </Link>
            <SearchBox value={searchQuery} onChange={this.handleSearch} />
            <PoliciesholderPolicyTable
              policies={policies}
              sortColumn={sortColumn}
              onSort={this.handleSort}
            />
            <Link
              to="/policyholder"
              className="btn btn-primary pull-right"
              style={{ marginBottom: 20 }}
            >
              Back
            </Link>
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

export default PolicyholderPolicy;
