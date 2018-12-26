const fs = require("fs");
const path = require("path");
const axios = require("axios").default;
const dir = path.resolve(__dirname, "../data.json");
module.exports = async () => {
  /* generate file */
  if (!fs.existsSync(dir)) {
    fs.writeFileSync(
      dir,
      JSON.stringify({
        xAxis: [],
        series: [],
      }),
      "utf8",
    );
  }

  const addZero = val => {
    return String(val).length == 1 ? `0${val}` : `${val}`;
  };

  const getTime = () => {
    let date = new Date(Date.now());
    return `${addZero(date.getHours())}:${addZero(date.getMinutes())}:${addZero(date.getSeconds())}`;
  };

  let file = fs.readFileSync(dir, "utf8");
  let rawData = JSON.parse(file);
  /* interval request data */
  setInterval(async () => {
    let resp = {
      data: {},
    };
    try {
      resp = await axios.get("http://192.168.1.123:5000");
    } catch (error) {
      console.log(error);
    }

    // let resp = await axios.get("/mock");
    let data = resp.data.data;
    if (data) {
      rawData.xAxis.push(getTime());
      rawData.series.push(data);
      fs.writeFileSync(dir, JSON.stringify(rawData), "utf8");
    }
  }, 5000);
};
