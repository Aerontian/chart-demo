module.exports = {
  port: 8080, // web服务器的端口地址，如果被占用可尝试修改
  api: "http://127.0.0.1:8080/mock", // 修改为真实接口地址， 这是模拟接口
  interval: 10, // 请求接口的间隔秒数， 每间隔一段时间向data.josn 写入一条数据
};
