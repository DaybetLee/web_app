import React, { Component } from "react";
import _ from "lodash";
import PoliciesTable from "./policiesTable";
import SearchBox from "../common/searchBox";
import Pagination from "../common/pagination";
import ListGroup from "../common/listGroup";
import { extractPolicies } from "../utils/extractPolicies";
import { paginate } from "../utils/paginate";
import { getCompanies } from "../../services/companyService";
import { getPolicyHPolicy } from "../../services/policyholderService";
import auth from "../../services/authService";

class Policy extends Component {
  state = {
    policies: [],
    company: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    selectedCompany: null,
    sortColumn: { path: "title", order: "asc" },
  };

  async componentDidMount() {
    try {
      const { data } = await getCompanies();
      const company = [{ _id: "", name: "All Company" }, ...data];

      const policyholder = auth.getCurrentUser();

      const { data: obj } = await getPolicyHPolicy(policyholder.email);
      const policies = extractPolicies(obj);

      this.setState({ policies, company });
    } catch (ex) {}
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleCompanySelect = (company) => {
    this.setState({
      selectedCompany: company,
      searchQuery: "",
      currentPage: 1,
    });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      policies: allPolicy,
      sortColumn,
      selectedCompany,
      searchQuery,
    } = this.state;

    let filtered = allPolicy;

    if (searchQuery)
      filtered = allPolicy.filter((p) =>
        p.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedCompany && selectedCompany._id)
      filtered = allPolicy.filter((p) => p.company === selectedCompany._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const policies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: policies };
  };

  handleSearch = (query) => {
    this.setState({
      searchQuery: query,
      selectedCompany: null,
      currentPage: 1,
    });
  };

  render() {
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;
    const { totalCount, data: policies } = this.getPagedData();

    return (
      <React.Fragment>
        <div className="row">
          <div className="col-3">
            <ListGroup
              items={this.state.company}
              selectedItem={this.state.selectedCompany}
              onItemSelect={this.handleCompanySelect}
            />
          </div>
          <div className="col">
            <SearchBox value={searchQuery} onChange={this.handleSearch} />
            <PoliciesTable
              policies={policies}
              sortColumn={sortColumn}
              onDelete={this.handleDelete}
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

export default Policy;
