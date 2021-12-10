const request = require("../utils/request");

module.exports = {
  catalog: {
    search: (query, headers) => {
      // do something else
      return request.get("/catalog/search", { query, headers });
    }
  }
};
