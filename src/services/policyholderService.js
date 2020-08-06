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

export function getPolicyByIC(nric) {
  return http.get(apiEndpoint + "/param?nric=" + nric);
}

export function changeAgent(policyholder, agentId) {
  const body = { agentId: agentId, viewable: false };
  return http.put(
    apiEndpoint + "/" + policyholder._id + "?changeAgent=true",
    body
  );
}

export function approveAgent(policyholderId) {
  const body = { viewable: true };
  return http.put(apiEndpoint + "/" + policyholderId + "?approve=true", body);
}

export function savePolicyholder(policyholder) {
  if (policyholder._id) {
    const body = { ...policyholder };
    delete body._id;
    return http.put(apiEndpoint + "/" + policyholder._id, body);
  }
  return http.post(apiEndpoint, policyholder);
}
