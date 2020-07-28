import http from "../services/httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/agent";

export function getAgents() {
  return http.get(apiEndpoint);
}

export function getAgent(id) {
  return http.get(apiEndpoint + "/" + id);
}

export function getCompanyAgent(id) {
  return http.get(apiEndpoint + "/param?cid=" + id);
}

export function saveAgent(agent) {
  if (agent._id) {
    const body = { ...agent };
    delete body._id;
    return http.put(apiEndpoint + "/" + agent._id, body);
  }
  return http.post(apiEndpoint, agent);
}
