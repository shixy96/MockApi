# mock-api

Based on [koa](https://github.com/koajs/koa).
Reference [egg](https://github.com/eggjs/egg-core)

## Directory structure

```
├── package.json
├── index.js
├── mock-api.js
├── mock-loader.js
├── routes
|   └── account.js
├── model
│   └── account
│       └── queryBalance.json
├── utils
│   ├── fileReader.js
│   ├── is.js
│   └── loader.js
```

## Usage

Put your json file in the folder corresponding to the url under the **model** folder.

For example, *account/queryBalance*

And you can use it in the route `routes/account`.

```js
// account.js
app => ({
  "get /queryBalance": ctx => {
    ctx.body = app.model.account.queryBalance;
  }
})
```
It declares a get method, the corresponding path is *account/queryBalance*

One-to-one correspondence between multi-level directories and **app.model**

