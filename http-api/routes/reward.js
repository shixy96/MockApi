const mock = require("../app/mock-api");

module.exports = (app = new mock()) => ({
  "get /mine": app.model.reward.mine,

  "get /checkin": app.model.reward.checkin,

  "get /scheduleSearch": app.model.reward.scheduleSearch
});
