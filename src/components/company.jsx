import React, { Component } from "react";

import { getAgents } from "../services/agentService.js";
import NavBar from "./common/navbar.jsx";
import Pagination from "../components/common/pagination";
import { paginate } from "./utils/paginate";
import AgentsTable from "./common/agentsTable";

class Company extends Component {
  state = {
    agents: [],
    currentPage: 1,
    pageSize: 4,
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

  render() {
    const { length: count } = this.state.agents;
    const { pageSize, currentPage, agents: allAgent } = this.state;
    const agents = paginate(allAgent, currentPage, pageSize);

    return (
      <React.Fragment>
        <NavBar />
        <div className="row">
          {/* <div className="col-3"></div> */}
          <div className="col">
            <AgentsTable
              agents={agents}
              onDelete={this.handleDelete}
              onUpdate={this.handleUpdate}
            />
            <Pagination
              itemsCount={count}
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

export default Company;
