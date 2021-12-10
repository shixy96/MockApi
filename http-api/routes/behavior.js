const mock = require("../app/mock-api");

module.exports = (app = new mock()) => ({
  "post /uploadStudyRecord": app.model.behavior.uploadStudyRecord,

  "get /statistics": app.model.behavior.statistics
});
