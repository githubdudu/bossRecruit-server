/*
使用 mongoose 操作 mongodb 的测试文件
1. 连接数据库
1.1. 引入 mongoose
1.2. 连接指定数据库(URL 只有数据库是变化的)
1.3. 获取连接对象
1.4. 绑定连接完成的监听(用来提示连接成功)
2. 得到对应特定集合的 Model
2.1. 字义 Schema(描述文档结构)
2.2. 定义 Model(与集合对应, 可以操作集合)
3. 通过 Model 或其实例对集合数据进行 CRUD 操作
3.1. 通过 Model 实例的 save()添加数据
3.2. 通过 Model 的 find()/findOne()查询多个或一个数据
3.3. 通过 Model 的 findByIdAndUpdate()更新某个数据
3.4. 通过 Model 的 remove()删除匹配的数据
*/

// 1. 连接数据库
// 1.1. 引入 mongoose
const md5 = require("blueimp-md5");
const mongoose = require("mongoose");

// 1.2. 连接指定数据库(URL 只有数据库是变化的)
mongoose.connect("mongodb://localhost:27017/gzhipin_test");

// 1.3. 获取连接对象
const conn = mongoose.connection;

// 1.4. 绑定连接完成的监听(用来提示连接成功)
conn.on("connected", function () {
  console.log("DB connection succeed");
});

// 2. 得到对应特定集合的 Model
// 2.1. 字义 Schema(描述文档结构)
const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  userPW: { type: String, required: true },
  isUserBoss: { type: Boolean, required: true },
});

// 2.2. 定义 Model(与集合对应, 可以操作集合)
const UserModel = mongoose.model("user", userSchema);

// 3. 通过 Model 或其实例对集合数据进行 CRUD 操作
// 3.1. 通过 Model 实例的 save()添加数据
function testSave() {
  const user = {
    username: "xfdudu2",
    userPW: md5("1234"),
    isUserBoss: false,
  };

  const userModel = new UserModel(user);

  userModel.save(function (err, user) {
    console.log("save", err, user);
  });
}


// 3.2. 通过 Model 的 find()/findOne()查询多个或一个数据
function testFind() {
  UserModel.find(function (err, users) {
    console.log("find()", err, users);
  });

  UserModel.findOne({ _id: "607d330df359793dc4ed5c96" }, function (err, user) {
    console.log("findOne()", err, user);
  });
}

// 3.3. 通过 Model 的 findByIdAndUpdate()更新某个数据
function testUpdate() {
  UserModel.findByIdAndUpdate(
    { _id: "607d330df359793dc4ed5c96" },
    { username: "yyy" },
    function (err, user) {
      console.log("testUpdate()", err, user);
    }
  );
}
// testUpdate()

// 3.4. 通过 Model 的 remove()删除匹配的数据
function testDelete() {
  UserModel.remove({ _id: "607d330df359793dc4ed5c96" }, function (err, result) {
    console.log("remove()", err, result);
  });
}

testDelete();