const express = require("express");
const app = express();
const port = 5000;
const mysql = require("mysql");
const dbconfig = require("./config/database.js");
const connection = mysql.createConnection(dbconfig);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);

app.get("/api/lights", (req, res) => {
  console.log("come in /api/light");
  var queryString = "SELECT * FROM 방범등가로등";

  connection.query(queryString, function (err, rows, field) {
    console.log(rows);
    if (err) throw err;
    res.json(rows);
  });
});

app.get("/api/cctvs", function (req, res) {
  console.log("come in /api/cctv");
  var queryString = "SELECT * FROM CCTV";
  connection.query(queryString, function (err, rows, field) {
    // console.log(rows)
    if (err) throw err;
    res.json(rows);
  });
});

app.get("/api/polices", function (req, res) {
  console.log("come in /api/polices");
  var queryString = "SELECT * FROM 치안시설";
  connection.query(queryString, function (err, rows, field) {
    // console.log(rows)
    if (err) throw err;
    res.json(rows);
  });
});

app.get("/api/bells", function (req, res) {
  console.log("come in /api/bells");
  var queryString = "SELECT * FROM 안전비상벨";
  connection.query(queryString, function (err, rows, field) {
    // console.log(rows)
    if (err) throw err;
    res.json(rows);
  });
});

app.get("/api/findRank/:pol", function (req, res) {
  console.log("come in /api/findRank");
  var pol = req.params.pol;
  // res.json("{result: databse 연결안함;}");
  var queryString = `SELECT * FROM 치안등급 WHERE 지구대="${pol}"`;
  connection.query(queryString, function (err, rows, field) {
    console.log(rows);
    if (err) throw err;
    res.json(rows);
  });
});

app.get("/api/info/:latlng", function (req, res) {
  console.log("come in /api/info");
  var latlng = req.params.latlng.split(",");
  var lat = parseFloat(latlng[0]);
  var lng = parseFloat(latlng[1]);

  var blat = lat - 0.0018,
    ulat = lat + 0.0018,
    blng = lng - 0.00225,
    ulng = lng + 0.00225;

  var query_cctv = `SELECT sum(카메라대수) as cnt FROM cctv WHERE (lat BETWEEN ${blat} AND ${ulat}) AND (lng BETWEEN ${blng} AND ${ulng})`;
  var query_light = `SELECT sum(num) as cnt FROM 방범등가로등 WHERE (lat BETWEEN ${blat} AND ${ulat}) AND (lng BETWEEN ${blng} AND ${ulng})`;
  var query_bell = `SELECT count(*) as cnt FROM 안전비상벨 WHERE (lat BETWEEN ${blat} AND ${ulat}) AND (lng BETWEEN ${blng} AND ${ulng})`;
  var data = {
    cctv: 0,
    light: 0,
    bell: 0,
  };
  // console.log(data)
  connection.query(query_cctv, function (err, rows, field) {
    console.log(rows);
    if (err) throw err;
    data.cctv = rows[0].cnt;
  });
  connection.query(query_light, function (err, rows, field) {
    console.log(rows);
    if (err) throw err;
    data.light = rows[0].cnt;
  });
  connection.query(query_bell, function (err, rows, field) {
    console.log(rows);
    if (err) throw err;
    data.bell = rows[0].cnt;
  });
  setTimeout(() => {
    console.log(data);
    res.json(data);
  }, 1000);
});
