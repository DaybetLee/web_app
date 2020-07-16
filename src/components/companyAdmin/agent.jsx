import React, { Component } from "react";
import _ from "lodash";

import Pagination from "../common/pagination";
import AgentsTable from "./agentsTable";

import { paginate } from "../utils/paginate";

import { getAgents } from "../../services/agentService.js";

class Agent extends Component {
  state = {
    agents: [],
    currentPage: 1,
    pageSize: 4,
    sortColumn: { path: "title", order: "asc" },
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

  getPagedData = () => {
    const { pageSize, currentPage, agents: allAgent, sortColumn } = this.state;
    const sorted = _.orderBy(allAgent, [sortColumn.path], [sortColumn.order]);
    const agents = paginate(sorted, currentPage, pageSize);
    return { totalCount: allAgent.length, data: agents };
  };

  render() {
    const { pageSize, currentPage, sortColumn } = this.state;
    const { totalCount, data: agents } = this.getPagedData();

    return (
      <React.Fragment>
        <div className="row">
          <div className="col">
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
