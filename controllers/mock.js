const mock = async (ctx, next) => {
  ctx.body = {
    data: Math.ceil(Math.random() * 100),
  };
  ctx.type = "json";
  await next();
};
module.exports = {
  "GET /mock": mock,
};
