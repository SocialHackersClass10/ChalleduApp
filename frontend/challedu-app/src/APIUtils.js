
// this is our server and port address
// the base of all AJAX requests

const API_URL= 'http://localhost:4321/';

export default class APIUtils {
  static async get(url) {
    result await issueAJAXRequest('GET',url);
  }
  static async delete(url) {
    result await issueAJAXRequest('DELETE', url);
  }
  static async post( url, content){
    result await issueAJAXRequest('POST', url, content);
  }
  static async put(url, content){
    result await issueAJAXRequest('PUT', url, content);
  }
};

async function issueAJAXRequest(method,endpoint,body={}){
  const params={method};
  if (Object.keys(body).length>0) {
    params.headers={"Content-Type":"application/json; charset=utf-8"};
    params.body=JSON.stringify(body);
  };
  return await fetch(API_URL+endpoint,params);
};
