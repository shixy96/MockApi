const config = require("../config/config");
const Koa = require("koa");
const { initRouter, initModel } = require("./mock-loader");

class mock {
  constructor(conf) {
    this.server = new Koa(conf);

    this.model = initModel();
    this.router = initRouter(this);
    this.server.use(this.router.routes());
  }
  start() {
    this.server.listen(config.port, () => {
      console.log(`mock api start at ${config.port}`);
    });
  }
}

module.exports = mock;
