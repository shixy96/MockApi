const Koa = require("koa");
const { initRouter } = require("./mock-loader");

const connection = require("./server");
const WebSocketServer = require("ws").Server;

class mock {
  constructor(conf) {
    this.app = new Koa(conf);
    initRouter(this.app);

    const wss = new WebSocketServer({ port: 3000, path: "/v1/socketHandler" });
    wss.on("connection", connection);
  }
  start() {
    this.app.listen(3010, () => {
      console.log("client start at 3010");
      console.log("server start at 3000");
    });
  }
}

module.exports = mock;
