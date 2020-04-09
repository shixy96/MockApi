const mock = require("../app/mock-api");

module.exports = (app = new mock()) => ({
  "get /getMessage": app.model.chatroom.message,

  "get /interaction/detail": app.model.interaction.detail,

  "get /interaction/getPresenceDetail": app.model.interaction.getPresenceDetail,
  
  "post /interaction/submit": app.model.interaction.submit
});
