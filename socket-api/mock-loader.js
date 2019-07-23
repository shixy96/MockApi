const router = require("koa-router")();
const static = require("koa-static");
const path = require("path");

const staticPath = "./client";

function initRouter(app) {
  app.use(static(path.join(__dirname, staticPath)));
  router.get("/", async ctx => {
    ctx.response.redirect("/client.html");
  });
  app.use(router.routes());
}

module.exports = { initRouter };
