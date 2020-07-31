import React, { Component } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import ResignTable from "./resignTable";
import SearchBox from "../common/searchBox";
import Pagination from "../common/pagination";
import { paginate } from "../utils/paginate";
import {
  getCompanyAgent,
  getAgent,
  deactivateAgent,
} from "../../services/agentService.js";
import {
  changeAgent,
  getPolicyholder,
} from "./../../services/policyholderService";
import auth from "../../services/authService";

class Resign extends Component {
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

  handleTransfer = async (agent) => {
    const { data: resignee } = await getAgent(this.props.match.params.id);
    const { data: newOwner } = await getAgent(agent._id);
    for (let i = 0; i < resignee.policyholder.length; i++) {
      const { data: policyholder } = await getPolicyholder(
        resignee.policyholder[i]._id
      );
      await changeAgent(policyholder, newOwner._id);
    }
    await deactivateAgent(resignee);
    this.props.history.push("/agent");
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
            <SearchBox value={searchQuery} onChange={this.handleSearch} />
            <ResignTable
              agents={agents}
              sortColumn={sortColumn}
              onTransfer={this.handleTransfer}
              onSort={this.handleSort}
              resigneeId={this.props.match.params.id}
            />
            <Link
              to="/agent"
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

export default Resign;
