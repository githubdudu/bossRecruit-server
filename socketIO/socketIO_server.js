const { ChatModel } = require("../db/models");

module.exports = function (server) {
  const io = require("socket.io")(
    server,
    { cors: true }
    //   cors:{
    //     origin: "http://localhost:3000",
    //     methods: ["GET", "POST"]
    //   }
  );

  io.on("connection", function (socket) {
    console.log("用户 connected!");
    socket.on("sendMsg", function ({ from, to, content }) {
      console.log("服务器 received");
      // 处理数据
      // 准备数据
      const chat_id = [from, to].sort().join("_");
      const created_time = Date.now();
      new ChatModel({ from, to, content, chat_id, created_time }).save(
        (err, chatMsg) => {
          // 向 client 发送信息
          socket.emit("receiveMsg", chatMsg);
          socket.broadcast.emit("receiveMsg", chatMsg);
        }
      );
    });
  });
};
