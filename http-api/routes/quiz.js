module.exports = app => ({
  "get /search": app.model.quiz.search,

  "get /detail": app.model.quiz.detail
});
