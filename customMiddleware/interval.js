const fs = require("fs");
const path = require("path");
const axios = require("axios").default;
const request = require("request");
const dir = path.resolve(__dirname, "../data.json");

const initData = {
  xAxis: [],
  series: [],
};

const addZero = val => {
  return String(val).length == 1 ? `0${val}` : `${val}`;
};

const getTime = () => {
  let date = new Date(Date.now());
  return `${addZero(date.getHours())}:${addZero(date.getMinutes())}:${addZero(date.getSeconds())}`;
};

const shouldClearData = () => {
  let date = new Date(Date.now());
  return date.getSeconds() == 0 && date.getMinutes() == 0 && date.getHours() == 0;
};

module.exports = () => {
  /* generate file */
  if (!fs.existsSync(dir)) {
    fs.writeFileSync(dir, JSON.stringify(initData), "utf8");
  }

  let file = fs.readFileSync(dir, "utf8");
  let rawData = JSON.parse(file);

  /* reset data at 00:00:00 */
  if (shouldClearData()) {
    rawData = JSON.parse(JSON.stringify(initData));
  }

  /* keep requesting data */
  setInterval(() => {
    request("http://127.0.0.1/mock", (err, resp) => {
      if (!err) {
        let data = JSON.parse(resp.body).data;
        if (data) {
          rawData.xAxis.push(getTime());
          rawData.series.push(data);
          fs.writeFileSync(dir, JSON.stringify(rawData), "utf8");
        }
      }
    });
  }, 5000);
};
