import _ from "lodash";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import PolicyholdersTable from "./policyholdersTable";
import { paginate } from "../utils/paginate";
import Pagination from "../common/pagination";
import SearchBox from "../common/searchBox";
import auth from "../../services/authService";
import { getAgentPolicyH } from "../../services/policyholderService";

class Policyholder extends Component {
  state = {
    policyholders: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    sortColumn: { path: "title", order: "asc" },
  };

  async componentDidMount() {
    try {
      const agent = auth.getCurrentUser();
      const { data: policyholders } = await getAgentPolicyH(agent._id);
      this.setState({ policyholders });
    } catch (ex) {}
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
