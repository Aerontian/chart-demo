// let fs = require('fs');
const fetch = require("node-fetch");
const proxy = (...args) => {
  return fetch.apply(null, args).then(function(res) {
    return res.text();
  });
};
const request = require("request");
const email = async (ctx, next) => {
  if (ctx.method == "GET") {
    ctx.body = await proxy("http://101.201.196.115:8002/fof/v1/email?" + ctx.querystring);
  } else if (ctx.method == "POST") {
    ctx.body = await proxy("http://101.201.196.115:8002/fof/v1/email?" + ctx.querystring, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: ctx.request.rawBody,
    });
  } else if (ctx.method == "PUT") {
    ctx.body = await proxy("http://101.201.196.115:8002/fof/v1/email?" + ctx.querystring, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: ctx.request.rawBody,
    });
  } else if (ctx.method == "DELETE") {
    ctx.body = await proxy("http://101.201.196.115:8002/fof/v1/email?" + ctx.querystring, {
      method: "DELETE",
    });
  }
  ctx.type = "json";
};

module.exports = {
  "GET /email": email,
  "POST /email": email,
  "PUT /email": email,
  "DELETE /email": email,
};
