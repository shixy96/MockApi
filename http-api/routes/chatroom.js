module.exports = app => ({
  "get /getMessage": app.model.chatroom.message
});
