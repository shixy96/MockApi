const mock = require("../app/mock-api");

module.exports = (app = new mock()) => ({
  "get /queryBalance": ctx => {
    ctx.body = app.model.account.queryBalance;
  },
  "post /deleteUser": ctx => {
    ctx.body = app.model.common.noneDataResult;
  }
});
