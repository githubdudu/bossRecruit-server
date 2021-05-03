// module.exports = function (server) {
//   const io = require("socket.io")(
//     server,
//     { cors: true }
//     //   cors:{
//     //     origin: "http://localhost:3000",
//     //     methods: ["GET", "POST"]
//     //   }
//   );

//   io.on("connection", function (socket) {
//     console.log("one user connected!");
//     socket.on("sendMsg", function (data) {
//       console.log("server received");
//       //   io.emit("receiveMsg", data.name + "_" + data.date);
//     });
//   });
// };
