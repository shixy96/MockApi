const mock = require("../app/mock-api");

module.exports = (app = new mock()) => ({
  "get /search": app.model.quiz.search,

  "get /detail": app.model.quiz.detail
});
