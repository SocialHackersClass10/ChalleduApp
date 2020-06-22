// this is our server and port address
// the base of all AJAX requests
const API_URL = "http://localhost:4321/";

export default class APIUtils {
  static async get(url) {
    return await issueAJAXRequest("GET", url);
  }
  static async delete(url) {
    return await issueAJAXRequest("DELETE", url);
  }
  static async post(url, content) {
    return await issueAJAXRequest("POST", url, content);
  }
  static async put(url, content) {
    return await issueAJAXRequest("PUT", url, content);
  }
}

async function issueAJAXRequest(method, endpoint, body = {}) {
  const params = { method };
  if (Object.keys(body).length > 0) {
    params.headers = { "Content-Type": "application/json; charset=utf-8" };
    params.body = JSON.stringify(body);
  }
  const result = await fetch(API_URL + endpoint, params);
  if (!res.ok || res.status < 200 || res.status > 299) {
    const errorMessage = `HTTP ${res.status} - ${res.statusText}`;
    console.log(errorMessage);
    throw new Error(errorMessage);
  }
  return await result.json();
}