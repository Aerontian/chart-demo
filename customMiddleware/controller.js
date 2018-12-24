const fs = require("fs");
const path = require("path");
const router = require("koa-router")();

function addMapping(router, mapping) {
  for (let url in mapping) {
    if (url.startsWith("GET ")) {
      let path = url.substring(4);
      router.get(path, mapping[url]);
      console.log(`register URL mapping: GET ${path}`);
    } else if (url.startsWith("POST ")) {
      let path = url.substring(5);
      router.post(path, mapping[url]);
      console.log(`register URL mapping: POST ${path}`);
    } else if (url.startsWith("PUT ")) {
      let path = url.substring(4);
      router.put(path, mapping[url]);
      console.log(`register URL mapping: PUT ${path}`);
    } else if (url.startsWith("DELETE ")) {
      let path = url.substring(7);
      router.put(path, mapping[url]);
      console.log(`register URL mapping: DELETE ${path}`);
    } else {
      console.log(`invalid URL: ${url}`);
    }
  }
}

function addControllers(router, dir) {
  let c_dir = path.resolve(__dirname, `../${dir}`);
  let files = fs.readdirSync(c_dir);
  let js_files = files.filter(f => {
    return f.endsWith(".js");
  });

  for (let f of js_files) {
    console.log(`process controller: ${f}...`);
    let mapping = require(`${c_dir}/${f}`);
    addMapping(router, mapping);
  }
}

module.exports = dir => {
  let controllers_dir = dir || "controllers";
  addControllers(router, controllers_dir);
  return router.routes();
};
