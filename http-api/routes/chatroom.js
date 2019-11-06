const mock = require("../app/mock-api");

module.exports = (app = new mock()) => ({
  "get /getMessage": app.model.chatroom.message
});
