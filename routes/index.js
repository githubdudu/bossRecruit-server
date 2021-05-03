var express = require("express");
var router = express.Router();

const md5 = require("blueimp-md5");
const { UserModel, ChatModel } = require("../db/models");
const findFilter = { userPW: 0, __v: 0 }; // used to filter the object returned by like: findOne()

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

/* 
router for UserModel 
*/

//register
router.post("/register", function (req, res, next) {
  let { username, userPW, userType } = req.body;
  userPW = md5(userPW);

  UserModel.findOne({ username }, findFilter, function (err, user) {
    if (user) {
      let msg = {
        code: 1,
        msg: "username exists",
      };
      res.send(msg);
    } else {
      new UserModel({ username, userPW, userType }).save(function (
        error,
        user
      ) {
        let msg = {
          code: 0,
          data: {
            username,
            userType,
            _id: user._id,
          },
        };
        res.cookie("userid", user._id, { maxAge: 1000 * 60 * 60 * 24 * 7 });
        res.send(msg);
      });
    }
  });
});

// login
router.post("/login", function (req, res, next) {
  let { username, userPW } = req.body;
  userPW = md5(userPW);

  UserModel.findOne({ username, userPW }, findFilter, function (err, user) {
    if (!user) {
      let msg = {
        code: 1,
        msg: "Error Login: wrong username or password",
      };
      res.send(msg);
      console.log("login:", msg);
    } else {
      let msg = {
        code: 0,
        data: user,
      };
      res.cookie("userid", user._id, { maxAge: 1000 * 60 * 60 * 24 * 7 });
      res.send(msg);
      console.log("login:", msg);
    }
  });
});

// updateUserInfo
//: dealing with both bossinfo and candiinfo
router.post("/updateUserInfo", function (req, res, next) {
  // check cookies first
  const userid = req.cookies.userid;
  if (!userid) {
    return res.send({ code: 1, msg: "Error UpdateUserInfo, no cookie, Please Log In" });
  }

  UserModel.findByIdAndUpdate(
    { _id: userid },
    req.body,
    { new: true, fields: findFilter },
    function (err, user) {
      // old-data vs new-data
      if (!user) {
        // "username doesn't exist",
        // delete cookies
        res.clearCookie("userid");
        res.send({ code: 1, msg: "Error UpdateUserInfo, when finding user By Id, Please Log In" });
      } else {
        let msg = {
          code: 0,
          user,
        };
        res.send(msg);
      }
    }
  );
});

// getUserData
router.get("/user", function (req, res, next) {
  // check cookies first
  const userid = req.cookies.userid;
  if (!userid) {
    return res.send({ code: 1, msg: "Error Get User, no cookie, Please Log In" });
  }

  UserModel.findById({ _id: userid }, findFilter, function (err, user) {
    if (!user) {
      // "username doesn't exist",
      // delete cookies
      res.clearCookie("userid");
      res.send({ code: 1, msg: "Error Get User, find By Id, Please Log In" });
    } else {
      let msg = {
        code: 0,
        data: user,
      };
      // console.log("req.body:", req.body);
      // console.log("get /user:", msg);
      res.send(msg);
    }
  });
});

router.get("/userlist", function (req, res, next) {
  // check cookies first
  const userid = req.cookies.userid;
  if (!userid) {
    return res.send({ code: 1, msg: "Error Get UserList, no cookie, Please Log In" });
  }
  // console.log("req.query:",req.query,"userType", req.query.userType);
  UserModel.find(
    { userType: req.query.userType },
    findFilter,
    function (err, user) {
      if (!user) {
        // "username doesn't exist",
        // delete cookies
        res.clearCookie("userid");
        res.send({ code: 1, msg: "Error Get UserList, when finding, Please Log In" });
      } else {
        // console.log(user);
        let msg = {
          code: 0,
          data: user,
        };
        res.send(msg);
      }
    }
  );
});

/* 
router for ChatModel 
*/

// 获取消息列表
router.get("/msglist", (req, res) => {
  const userid = req.cookies.userid;
  const users = {};

  UserModel.find(function (err, userDocs) {
    userDocs.forEach(function (doc) {
      users[doc._id] = { username: doc.username, headPhoto: doc.headPhoto };
    });
  });
  // 查询 userid 相关的所有聊天信息
  // 参数 1: 查询条件
  // 参数 2: 过滤条件
  // 参数 3: 回调函数
  ChatModel.find(
    { $or: [{ from: userid }, { to: userid }] },
    findFilter,
    function (err2, chatMsgs) {
      res.send({ code: 0, data: { users, chatMsgs } });
    }
  );
});

// 修改消息已读
router.post("/readmsg", (req, res) => {
  const from = req.body.from;
  const to = req.cookies.userid;
  //   更新数据库中的 chat 数据
  // 参数 1: 查询条件
  // 参数 2: 更新为指定的数据对象
  // 参数 3: 是否 1 次更新多条, 默认只更新一条
  // 参数 4: 更新完成的回调函数
  ChatModel.updateMany(
    { from, to, isRead: false },
    { isRead: true },
    { multi: true },
    function (err, doc) {
      console.log("/readmsg", doc,{from,to});
      if (doc.nModeified===0) {
        res.send({ code: 1, msg: "Nothing changed, nothing read" });
      } else {
        res.send({ code: 0, data: doc.nModeified });
      }
    }
  );
  // res.send(from);
});

module.exports = router;
