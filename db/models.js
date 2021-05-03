/* 
 包含多个操作数据库集合的model模块
 使用 mongoose 操作 mongodb 的测试文件
1. 连接数据库
1.1. 引入 mongoose
1.2. 连接指定数据库(URL 只有数据库是变化的)
1.3. 获取连接对象
1.4. 绑定连接完成的监听(用来提示连接成功)
2. 得到对应特定集合的 Model
2.1. 字义 Schema(描述文档结构)
2.2. 定义 Model(与集合对应, 可以操作集合)
*/

// 1. 连接数据库
// 1.1. 引入 mongoose

const mongoose = require("mongoose");

// 1.2. 连接指定数据库(URL 只有数据库是变化的)
mongoose.connect("mongodb://localhost:27017/bossRecruit");

// 1.3. 获取连接对象
const conn = mongoose.connection;

// 1.4. 绑定连接完成的监听(用来提示连接成功)
conn.on("connected", function () {
  console.log("DB connection succeed");
});

// 2. 得到对应特定集合的 Model
// 2.1. 字义 Schema(描述文档结构)
// base on API doc
const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  userPW: { type: String, required: true },
  userType: { type: String, required: true },

  headPhoto: { type: String },
  position: { type: String },
  description: { type: String },
  company: { type: String },
  salary: { type: String },
});

// 2.2. 定义 Model(与集合对应, 可以操作集合)
const UserModel = mongoose.model("user", userSchema);



// 2.3 定义 chatSchema
const chatSchema = mongoose.Schema({
  from: {type:String, required: true},
  to: {type:String, required: true},
  chat_id: {type:String, required: true},
  content: {type:String, required: true},
  isRead: {type:Boolean, default: false},
  created_time: {type:Number}
})
// 2.4 定义 chat Model
const ChatModel=mongoose.model("Chat",chatSchema);

// export
exports.UserModel = UserModel;
exports.ChatModel = ChatModel;
// module.exports = UserModel, is another way