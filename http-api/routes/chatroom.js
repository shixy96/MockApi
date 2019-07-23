module.exports = app => ({
  "get /history/queryMsg": app.model.chatroom.history.queryMsg
});
