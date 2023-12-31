const fs = require("fs");
const { loadDirection } = require("../utils/loader");
const Router = require("koa-router");

function initRouter(app) {
  const router = new Router();
  loadDirection("routes", (properties, routes) => {
    const fileName = properties.slice(-1);
    const prefix = fileName === "index" ? "" : `/mock/${fileName}`;

    routes = typeof routes === "function" ? routes(app) : routes;

    Object.keys(routes).forEach(key => {
      const [method, path] = key.split(" ");
      console.log(
        `正在映射地址： ${method.toLocaleUpperCase()} ${prefix}${path}`
      );
      let middleware =
        typeof routes[key] === "function"
          ? routes[key]
          : ctx => {
              ctx.body = routes[key];
            };
      router[method](prefix + path, middleware);
    });
  });
  return router;
}

function initModel() {
  const models = {};
  loadDirection("model", (_properties, model) => {
    const properties = _properties.slice(1);
    properties.reduce((target, property, index) => {
      let obj;
      if (index === properties.length - 1) {
        obj = model;
      } else {
        obj = target[property] || {};
      }
      target[property] = obj;
      return obj;
    }, models);
  });

  fs.writeFileSync(
    "config/model.config.js",
    "module.exports = " + JSON.stringify(models),
    "utf8"
  );

  return require("../config/model.config");
}

module.exports = { initRouter, initModel };
