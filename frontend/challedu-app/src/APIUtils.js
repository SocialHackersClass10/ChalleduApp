
// this is our server and port address
// the base of all AJAX requests
const API_URL = "http://localhost:4321/";

export default class APIUtils {
  static async get(url, access_token) {
    return await issueAJAXRequest("GET", url, {}, access_token);
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

async function issueAJAXRequest(method, endpoint, body = {}, access_token = "") {
  const params = { method, headers: {} };
  if (access_token) {
    params.headers['Authorization'] = `Bearer ${access_token}`;
  }

  if (Object.keys(body).length > 0) {
    params.headers["Content-Type"] = "application/json; charset=utf-8";
    params.body = JSON.stringify(body);
  }
  const res = await fetch(API_URL + endpoint, params);
  const json = await res.json()
  if (!res.ok || res.status < 200 || res.status > 299) {
    const errorMessage = `HTTP ${res.status} - ${res.statusText} - ${JSON.stringify(json)}`;
    console.log(errorMessage);
    throw new Error(errorMessage);
  }
  return json;
}

