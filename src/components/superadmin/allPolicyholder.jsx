import _ from "lodash";
import React, { Component } from "react";
import AllPolicyholderTable from "./allPolicyholderTable";
import { paginate } from "../utils/paginate";
import Pagination from "../common/pagination";
import SearchBox from "../common/searchBox";
import auth from "../../services/authService";
import { getPolicyholders } from "../../services/policyholderService";
import { removeDupByNric } from "./../utils/removeDuplicate";

class AllPolicyholder extends Component {
  state = {
    policyholders: [],
    superAdmin: {},
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    sortColumn: { path: "title", order: "asc" },
  };

  async componentDidMount() {
    try {
      const superAdmin = auth.getCurrentUser();
      const { data: arr } = await getPolicyholders();

      const policyholders = removeDupByNric(arr);

      this.setState({ policyholders, superAdmin });
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
      superAdmin,
    } = this.state;
    const { totalCount, data: policyholders } = this.getPagedData();

    return (
      <React.Fragment>
        <div className="row">
          <div className="col">
            <h2>Welcome, {superAdmin.name}</h2>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col">
            <SearchBox value={searchQuery} onChange={this.handleSearch} />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <AllPolicyholderTable
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

export default AllPolicyholder;
