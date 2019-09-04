const request = require("request");
const config = require("../config/config");

const prev = config.apiPath[process.env.NODE_ENV] + config.version;
const host = config.proxyPath[process.env.NODE_ENV];

const TIME_OUT = 30000;

let baseRequest = request.defaults({
  timeout: TIME_OUT
});

module.exports = {
  get get() {
    return (api, { query = {}, headers = {} }) => {
      let url = bindQuery(api, query);
      headers.host = host;
      return new Promise((resolve, reject) => {
        baseRequest.get({ url, headers }, (error, response, body) => {
          if (error) {
            reject(error);
          }
          resolve(body);
        });
      });
    };
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
