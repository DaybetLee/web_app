import React, { Component } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";

import Pagination from "../common/pagination";
import PoliciesholderPolicyTable from "./policholderPolicyTable";

import { paginate } from "../utils/paginate";

import { getPolicies } from "../../services/policyService";

class PolicyholderPolicy extends Component {
  state = {
    policies: [],
    company: [],
    currentPage: 1,
    pageSize: 4,
    sortColumn: { path: "title", order: "asc" },
  };

  componentDidMount() {
    this.setState({ policies: getPolicies() });
  }

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
        <div className="row">
          <div className="col">
            <Link
              to="/policyholderpolicy2/new"
              className="btn btn-primary pull-right"
              style={{ marginBottom: 20 }}
            >
              Add
            </Link>
            <PoliciesholderPolicyTable
              policies={policies}
              sortColumn={sortColumn}
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

export default PolicyholderPolicy;
