import http from "../services/httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/company";

export function getCompanies() {
  return http.get(apiEndpoint);
}

export function getCompany(id) {
  return http.get(apiEndpoint + "/" + id);
}

export function saveCompany(company) {
  if (company._id) {
    const body = { ...company };
    delete body._id;
    return http.put(apiEndpoint + "/" + company._id, body);
  }
  return http.post(apiEndpoint, company);
}
