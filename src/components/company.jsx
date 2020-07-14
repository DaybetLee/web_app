import React, { Component } from "react";

import { getAgents } from "../services/agentService.js";
import NavBar from "./common/navbar.jsx";
import Pagination from "../components/common/pagination";
import { paginate } from "./utils/paginate";

class Company extends Component {
  state = {
    agents: getAgents(),
    currentPage: 1,
    pageSize: 4,
  };

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
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
            </tr>
          </thead>
          <tbody>
            {agents.map((agents) => (
              <tr key={agents._id}>
                <td>{agents.name}</td>
                <td>{agents.email}</td>
                <td>{agents.mobile}</td>
                <td>
                  <button
                    onClick={() => this.handleUpdate(agents)}
                    className="btn btn-primary btn-sm m-2"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => this.handleDelete(agents)}
                    className="btn btn-danger btn-sm"
                  >
                    Resign
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          itemsCount={count}
          pageSize={pageSize}
          onPageChange={this.handlePageChange}
          currentPage={currentPage}
        />
      </React.Fragment>
    );
  }
}

export default Company;
