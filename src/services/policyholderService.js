import http from "../services/httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/policyholder";

export function getPolicyholders() {
  return http.get(apiEndpoint);
}

export function getPolicyholder(id) {
  return http.get(apiEndpoint + "/" + id);
}

export function getAgentPolicyH(id) {
  return http.get(apiEndpoint + "/param?aid=" + id);
}

export function getPolicyHPolicy(email) {
  return http.get(apiEndpoint + "/param?email=" + email);
}

export function savePolicyholder(policyholder) {
  if (policyholder._id) {
    const body = { ...policyholder };
    delete body._id;
    return http.put(apiEndpoint + "/" + policyholder._id, body);
  }
  return http.post(apiEndpoint, policyholder);
}
