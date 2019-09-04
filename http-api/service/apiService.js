const request = require("../utils/request");
const config = require("../config/config");

const prev = config.apiPath[process.env.NODE_ENV] + config.version;
const host = config.proxyPath[process.env.NODE_ENV];

module.exports = {
  catalog: {
    search: (query, headers) => {
      headers.host = host
      return request.get(bindQuery("/catalog/search", query), headers)
    }
  }
};

function bindQuery(api, query) {
  let queryStr = "";
  if (typeof query === "object") {
    Object.keys(query).forEach(item => {
      queryStr += "&" + item + "=" + query[item];
    });
  } else if (typeof query === "string") {
    queryStr = query;
  }
  api = "/" + api.replace(/^\//, "");
  queryStr = "?" + queryStr.replace(/^[&?]/, "");
  return prev + api + queryStr;
}
