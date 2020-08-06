import React, { Component } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import OverallPoliciesTable from "./overallPoliciesTable";
import SearchBox from "../common/searchBox";
import Pagination from "../common/pagination";
import { extractPolicies } from "../utils/extractPolicies";
import { paginate } from "../utils/paginate";
import { getPolicyByIC } from "../../services/policyholderService";
import { getPolicy } from "../../services/policyService";
import { toHTML } from "./../utils/toHTML";
import { saveReference } from "../../services/referenceService";
import { sendClaimant, sendCompany } from "../../services/nodemailerService";
import { removeDupByCompany } from "./../utils/removeDuplicate";
import { getCompanyByName } from "../../services/companyService";

class OverallPolicy extends Component {
  state = {
    policies: [],
    policyholder: {},
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    selectedCompany: null,
    testEmail: "",
    sortColumn: { path: "title", order: "asc" },
  };

  async componentDidMount() {
    try {
      const { data: policiesArray } = await getPolicyByIC(
        this.props.match.params.id
      );
      const temp = extractPolicies(policiesArray);
      const policies = [];
      for (let i = 0; i < temp.length; i++) {
        const { data: policy } = await getPolicy(temp[i]._id);
        policies.push(policy);
      }

      const { email, mobile, name, nric } = policies[0].policyholder;
      const policyholder = { email, mobile, name, nric };

      this.setState({ policies, policyholder });
    } catch (ex) {}
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleLinkRequest = async (policies, policyholder, email) => {
    try {
      const temp = [];
      for (let i = 0; i < policies.length; i++) {
        const { name, date, amount, inforce, company } = policies[i];
        const modify_date = date.slice(0, 10);
        const company_name = company.name;
        const policy = { name, modify_date, amount, inforce, company_name };
        temp.push(policy);
      }
      const output = toHTML(policyholder, temp);
      const { data: id } = await saveReference(output);

      const link = "http://localhost:10443/v1/api/reference/" + id;

      await sendClaimant(policyholder.name, email, link);

      const commpanies = removeDupByCompany(temp);
      for (let i = 0; i < commpanies.length; i++) {
        const { data: company } = await getCompanyByName(
          commpanies[i].company_name
        );

        await sendCompany(
          policyholder.name,
          company[0].name,
          company[0].email,
          policyholder.nric
        );
      }

      this.props.history.push("/allPolicyholder");
    } catch (err) {}
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      policies: allPolicy,
      sortColumn,
      searchQuery,
    } = this.state;

    let filtered = allPolicy;

    if (searchQuery)
      filtered = allPolicy.filter((p) =>
        p.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );

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
    const {
      pageSize,
      currentPage,
      sortColumn,
      searchQuery,
      policyholder,
    } = this.state;
    const { totalCount, data: policies } = this.getPagedData();

    const email = React.createRef();
    console.log(policyholder);

    return (
      <React.Fragment>
        <div className="row">
          <div className="col">
            <h2>{policyholder.name}</h2>
            <p>
              {policyholder.nric}
              <br />
              {policyholder.mobile}
              <br />
              {policyholder.email}
            </p>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-7">
            <SearchBox value={searchQuery} onChange={this.handleSearch} />
          </div>
          <div className="input-group col-5 align-items-center">
            <input
              ref={email}
              type="text"
              className="form-control"
              placeholder="Requestor Email"
              aria-label="Requestor Email"
              aria-describedby="basic-addon2"
            />
            <div className="input-group-append">
              <button
                type="submit"
                onClick={() =>
                  this.handleLinkRequest(
                    this.state.policies,
                    policyholder,
                    email.current.value
                  )
                }
                className="btn btn-success pull-right"
              >
                Send Link
              </button>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <OverallPoliciesTable
              policies={policies}
              sortColumn={sortColumn}
              onSort={this.handleSort}
            />
            <Link
              to="/allPolicyholder"
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

export default OverallPolicy;
