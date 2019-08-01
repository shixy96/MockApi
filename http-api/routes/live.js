module.exports = app => ({
  "get /status": app.model.live.status
});
