# chart-demo

## 安装

### 安装 git

```shell
  sudo apt install git
```

### 安装 nodejs

```shell
  sudo apt install nodejs
```

### 安装 npm

```shell
  sudo apt install npm
```

### 克隆本项目

```shell
  git clone https://github.com/skiming3362/chart-demo.git
```

### 进入项目目录安装依赖

```shell
  cd chart-demo
  npm install
```

## 修改配置

打开 config.js, 修改请求数据的地址为真实地址

```javascript
module.exports = {
  port: 8080, // web服务器的端口地址，如果被占用可尝试修改
  api: "http://127.0.0.1:8080/mock", // 修改为真实接口地址， 这是模拟接口
  interval: 10, // 请求接口的间隔秒数， 每间隔一段时间向data.josn 写入一条数据
};
```

在 static/index.html 里面可以修改图表的标题等配置

## 运行

```shell
  node app.js
```

运行成功后在浏览器打开 localhost:8080

## 注意事项

1. app 请求的数据全部存储在当前目录 data.json 中，每天 00：00 清除数据，也可以手动删除它
