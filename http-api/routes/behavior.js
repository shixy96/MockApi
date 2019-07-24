module.exports = app => ({
  "post /uploadStudyRecord": app.model.behavior.uploadStudyRecord,

  "get /statistics": app.model.behavior.statistics
});
