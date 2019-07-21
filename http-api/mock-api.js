const Koa = require("koa");
const { initRouter, initModel } = require("./mock-loader");

class mock {
  constructor(conf) {
    this.app = new Koa(conf);

    this.model = initModel();
    this.router = initRouter(this);
    this.app.use(this.router.routes());
  }
  start() {
    this.app.listen(3000, () => {
      console.log("mock api start at 3000");
    });
  }
}

module.exports = mock;
