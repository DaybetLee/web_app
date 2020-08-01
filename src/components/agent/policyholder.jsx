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
    agent: {},
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    sortColumn: { path: "title", order: "asc" },
  };

  async componentDidMount() {
    try {
      const agent = auth.getCurrentUser();
      const { data: policyholders } = await getAgentPolicyH(agent._id);
      this.setState({ policyholders, agent });
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
    const {
      pageSize,
      currentPage,
      sortColumn,
      searchQuery,
      agent,
    } = this.state;
    const { totalCount, data: policyholders } = this.getPagedData();

    return (
      <React.Fragment>
        <div className="row">
          <div className="col">
            <h2>Welcome, Agent {agent.name}</h2>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-7">
            <SearchBox value={searchQuery} onChange={this.handleSearch} />
          </div>
          <div className="col-5">
            <Link
              to="/policyholder/new"
              className="btn btn-success pull-right"
              style={{ marginTop: 20 }}
            >
              Add Policyholder
            </Link>
          </div>
        </div>
        <div className="row">
          <div className="col">
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
