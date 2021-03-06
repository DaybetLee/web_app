import React, { Component } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import PolicyApprovalTable from "./policyApprovalTable";
import SearchBox from "../common/searchBox";
import Pagination from "../common/pagination";
import { extractPolicies } from "../utils/extractPolicies";
import { paginate } from "../utils/paginate";
import { policyToApprove } from "../utils/policyToApprove";
import {
  getPolicyHPolicy,
  approveAgent,
} from "../../services/policyholderService";
import { getCompany } from "../../services/companyService";
import { sendReject } from "../../services/nodemailerService";
import auth from "../../services/authService";

class PolicyApproval extends Component {
  state = {
    policies: [],
    policyholder: {},
    policiesArray: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    selectedCompany: null,
    sortColumn: { path: "title", order: "asc" },
  };

  async componentDidMount() {
    try {
      const policyholder = auth.getCurrentUser();

      const { data: policiesArray } = await getPolicyHPolicy(
        policyholder.email
      );

      const policies = extractPolicies(policyToApprove(policiesArray));

      this.setState({ policies, policyholder, policiesArray });
    } catch (ex) {}
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleSearch = (query) => {
    this.setState({
      searchQuery: query,
      selectedCompany: null,
      currentPage: 1,
    });
  };

  handleApproval = async (policyholderId) => {
    await approveAgent(policyholderId);
    this.props.history.push("/policy/");
  };

  handleReason = async (reason) => {
    try {
      const { policiesArray, policies, policyholder } = this.state;
      const { data: company } = await getCompany(policies[0].company);
      await sendReject(
        policyholder.name,
        company.name,
        company.email,
        policiesArray[0].nric,
        reason.current.value
      );

      this.props.history.push("/policy");
    } catch (ex) {}
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
    return (
      <React.Fragment>
        <div className="row">
          <div className="col">
            <h2>Approval Request</h2>
            <p style={{ marginBottom: 0 }}>
              It seem your policy manager has been changed, click 'Accept' to
              allow the new agent to manage your profile or "Reject" with
              reason.
            </p>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col">
            <SearchBox value={searchQuery} onChange={this.handleSearch} />
            <PolicyApprovalTable
              policies={policies}
              sortColumn={sortColumn}
              onApproval={this.handleApproval}
              onReason={this.handleReason}
              onSort={this.handleSort}
            />
            <Link
              to="/policy"
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

export default PolicyApproval;
