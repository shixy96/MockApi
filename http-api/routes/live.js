const mock = require("../app/mock-api");

module.exports = (app = new mock()) => ({
  "get /status": app.model.live.status
});
