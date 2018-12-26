const fs = require("fs");
const path = require("path");
const getData = async (ctx, next) => {
  let data = {
    xAxis: [],
    series: [],
  };

  try {
    const file = fs.readFileSync(path.resolve(__dirname, "../data.json"), "utf8");
    data = JSON.parse(file);
  } catch (error) {
    console.log(error);
  }

  ctx.body = {
    data,
  };
  ctx.type = "json";
};

module.exports = {
  "GET /getData": getData,
};
