const express = require("express");
const app = express();
const port = 5000;
const mysql = require("mysql");
const dbconfig = require("./config/database.js");
const connection = mysql.createConnection(dbconfig);

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);

app.get("/api/lights", (req, res) => {
  console.log("come in /api/light")
  var queryString = "SELECT * FROM 방범등가로등 limit 100";

  connection.query(queryString, function (err, rows, field) {
    // console.log(rows)
    if (err) throw err;
    res.json(rows);
  });
})

app.get("/api/cctvs", function (req, res) {
  console.log("come in /api/cctv")
  var queryString = "SELECT * FROM CCTV limit 100";
  connection.query(queryString, function (err, rows, field) {
    // console.log(rows)
    if (err) throw err;
    res.json(rows);
  });
});

app.get("/api/polices", function (req, res) {
  console.log("come in /api/polices")
  var queryString = "SELECT * FROM 치안시설 limit 100";
  connection.query(queryString, function (err, rows, field) {
    // console.log(rows)
    if (err) throw err;
    res.json(rows);
  });
});

app.get("/api/bells", function (req, res) {
  console.log("come in /api/bells")
  var queryString = "SELECT * FROM 안전비상벨 limit 100";
  connection.query(queryString, function (err, rows, field) {
    // console.log(rows)
    if (err) throw err;
    res.json(rows);
  });
});

app.get("/api/info/:latlng", function (req, res) {
  console.log("come in /api/info")
  var latlng = req.params.latlng
  // lat, lng 분리 코드 필요

  var query_bell = "SELECT * FROM 안전비상벨 limit 100";
  var query_light = "SELECT * FROM 안전비상벨 limit 100";
  var query_cctv = "SELECT * FROM 안전비상벨 limit 100";
  var data = {
    bell: 0,
    light: 0,
    cctv: 0
  }
  connection.query(query_bell, function (err, rows, field) {
    if (err) throw err;
    console.log(rows)
    // data.bell = rows.~~~?
  });
  connection.query(query_light, function (err, rows, field) {
    if (err) throw err;
    // data.bell = rows.~~~?
  });
  connection.query(query_cctv, function (err, rows, field) {
    if (err) throw err;
    // data.bell = rows.~~~?
  });
  res.json(cmt)
});

