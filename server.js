const mongoose = require('mongoose');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const config = require('./server/db/dbconfig');

const app = express();
const port = process.env.PORT || 3000;

const user = require('./server/router/user');
const truck = require('./server/router/truck');
const order = require('./server/router/order');

// url请求解析
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

const db = mongoose.connect(config.mongodb);
// Use native promises
mongoose.Promise = global.Promise
// const db = mongoose.connection;

db.connection.on('open', () => {
  console.log("------数据库连接成功！------");
})
db.connection.on('error', function(error) {
  console.error('Error in MongoDb connection: ' + error);
  mongoose.disconnect();
});
// db.on('close', () => {
//   console.log('数据库断开，重新连接数据库');
//   mongoose.connect(config.mongodb, {server:{auto_reconnect:true}});
// });

// // 数据库连接
// db.connection.on("error", function(error) {
//   console.log("数据库连接失败：" + error);
// });
// db.connection.on("open", function() {
//   console.log("------数据库连接成功！------");
// });


// session
app.use(session({
  secret: 'usersession',
  key: 'usersession',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 60 * 1000 * 60 // 设置返回的cookie时效为30秒，测试用
  }
  // store: new MongoStore({
  //   url: "mongodb://localhost:27017/usersession"
  // })
}));

app.use('/api', user);
app.use('/api', truck);
app.use('/api', order);

// 对session判断的中间件
// app.use((req, res) => {
//   console.log('req.session:===', req.session);
// });

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
