const Koa = require("koa");
const compress = require("koa-compress");
const bodyParser = require("koa-bodyparser");
const controller = require("./customMiddleware/controller");
const logger = require("./customMiddleware/logger");
const interval = require("./customMiddleware/interval");
const serve = require("koa-static");
const path = require("path");
const cors = require("./customMiddleware/cors");
const options = require("./customMiddleware/options");

const root = path.resolve(__dirname, "static");

const app = new Koa();

const port = 80;

app.use(compress());
app.use(logger);
app.use(cors);
app.use(
  serve(root, {
    maxage: 0,
  }),
);
app.use(
  bodyParser({
    formLimit: "10mb",
  }),
);
app.use(controller());
app.use(options);
interval();

app.listen(port);
console.log(`app started ad port ${port}...`);
