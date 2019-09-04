# mock-api

Based on [koa](https://github.com/koajs/koa).
Reference [egg](https://github.com/eggjs/egg-core)

## Start

cd http-api
npm install
npm run mock

## Directory structure

```
├── package.json
├── index.js
├── mock-api.js
├── mock-loader.js
├── utils
│   ├── fileReader.js
│   ├── is.js
│   └── loader.js
├── routes                     // 路由定制
│   ├── account.js
|   └── purchase.js
├── service                    // 转发, 数据处理
|   └── apiService.js
├── model                      // 假数据json模型
│   ├── account
│   |   └── queryBalance.json
│   └── purchase
│       └── history
│           └── v6.3.json

```

## Usage

Put your json file in the folder corresponding to the url under the **model** folder.

For example, _account/queryBalance_

And you can use it in the route `routes/account`.

```js
// routes/account.js
// method 1
app => ({
  // ->  localhost:3000/mock/account/queryBalance
  "get /queryBalance": ctx => {
    console.log(ctx.request.query)
    ctx.body = app.model.account.queryBalance;
  }
});

// routes/purchase.js
// method 2
app => ({
  // ->  localhost:3000/mock/purchase/history
  "get /history": app.model.purchase.history["v6.3"]
});
```

Each method corresponds to a get request, the corresponding paths are *"localhost:3000/mock/account/queryBalance"* and *"localhost:3000/mock/purchase/history"*

One-to-one correspondence between multi-level directories and **app.model**
