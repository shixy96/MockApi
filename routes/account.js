module.exports = app => ({
  "get /queryBalance": ctx => {
    ctx.body = app.model.account.queryBalance;
  }
});
