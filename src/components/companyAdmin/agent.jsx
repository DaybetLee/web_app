import React, { Component } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";

import Pagination from "../common/pagination";
import AgentsTable from "./agentsTable";
import SearchBox from "../common/searchBox";

import { paginate } from "../utils/paginate";

import { getAgents } from "../../services/agentService.js";

class Agent extends Component {
  state = {
    agents: [],
    currentPage: 1,
    pageSize: 4,
    sortColumn: { path: "title", order: "asc" },
    searchQuery: "",
  };

  componentDidMount() {
    this.setState({ agents: getAgents() });
  }

  handleUpdate = (agent) => {
    console.log(agent);
  };

  handleDelete = (agent) => {
    console.log(agent.name);
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
              className="btn btn-primary pull-right"
              style={{ marginBottom: 20 }}
            >
              Add
            </Link>
            <SearchBox value={searchQuery} onChange={this.handleSearch} />
            <AgentsTable
              agents={agents}
              sortColumn={sortColumn}
              onDelete={this.handleDelete}
              onUpdate={this.handleUpdate}
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
