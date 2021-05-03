var express = require("express");

var app = express();

app.get("/csdn", function (req, res) {
  var name = req.query.name;
  res.send(name);
});

app.get("/csdn/:id", function (req, res) {
  var id = req.params.id;
  res.send(id);
});

app.listen(3000, "0.0.0.0");
