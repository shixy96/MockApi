const mock = require("../app/mock-api");

module.exports = (app = new mock()) => ({
  "get /getPage": app.model.dc.page
});
