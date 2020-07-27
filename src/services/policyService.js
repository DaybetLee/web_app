import http from "../services/httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/policy";

export function getPolicies() {
  return http.get(apiEndpoint);
}

export function getPolicy(id) {
  return http.get(apiEndpoint + "/" + id);
}

export function savePolicy(policy) {
  if (policy._id) {
    const body = { ...policy };
    delete body._id;
    return http.put(apiEndpoint + "/" + policy._id, body);
  }
  return http.post(apiEndpoint, policy);
}
