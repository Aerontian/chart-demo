const Koa = require("koa");
const compress = require("koa-compress");
const bodyParser = require("koa-bodyparser");
const controller = require("./customMiddleware/controller");
const logger = require("./customMiddleware/logger");
const serve = require("koa-static");
const path = require("path");
const cors = require("./customMiddleware/cors");
const options = require("./customMiddleware/options");

const root = path.resolve(__dirname, "static");

const app = new Koa();

app.use(compress());
app.use(logger);
app.use(cors);
app.use(
  serve(root, {
    maxage: 1000 * 60 * 60 * 24 * 7,
  }),
);
app.use(
  bodyParser({
    formLimit: "10mb",
  }),
);
app.use(controller());
app.use(options);

app.listen(80);
console.log("app started ad port 80...");
