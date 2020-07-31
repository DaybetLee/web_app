import React, { Component } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import AgentsTable from "./agentsTable";
import SearchBox from "../common/searchBox";
import Pagination from "../common/pagination";
import { paginate } from "../utils/paginate";
import { getCompanyAgent } from "../../services/agentService.js";
import auth from "../../services/authService";

class Agent extends Component {
  state = {
    agents: [],
    currentPage: 1,
    pageSize: 4,
    sortColumn: { path: "title", order: "asc" },
    searchQuery: "",
  };

  async componentDidMount() {
    try {
      const company = auth.getCurrentUser();
      const { data: agents } = await getCompanyAgent(company._id);
      this.setState({ agents });
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
      agents: allAgent,
      sortColumn,
      searchQuery,
    } = this.state;
    let filtered = allAgent;
    if (searchQuery)
      filtered = allAgent.filter((a) =>
        a.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const agents = paginate(sorted, currentPage, pageSize);
    return { totalCount: allAgent.length, data: agents };
  };

  render() {
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;
    const { totalCount, data: agents } = this.getPagedData();

    return (
      <React.Fragment>
        <div className="row">
          <div className="col">
            <Link
              to="/agent/new"
              className="btn btn-success pull-right"
              style={{ marginBottom: 20 }}
            >
              Add
            </Link>
            <SearchBox value={searchQuery} onChange={this.handleSearch} />
            <AgentsTable
              agents={agents}
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

export default Agent;
