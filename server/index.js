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
  var queryString = "SELECT * FROM stlamp limit 50";

  connection.query(queryString, function (err, rows, field) {
    if (err) throw err;
    // console.log(rows)
    res.json(rows);
  });
})

app.get("/api/cctvs", function (req, res) {
  console.log("come in /api/cctv")
  // var queryString = "SELECT * FROM CCTV limit 50";
  var queryString = "SELECT * FROM CCTV limit 50";
  connection.query(queryString, function (err, rows, field) {
    if (err) throw err;
    // console.log(rows)
    res.json(rows);
  });
});

app.get("/api/polices", function (req, res) {
  console.log("come in /api/polices")
  var queryString = "SELECT * FROM polst limit 50";
  connection.query(queryString, function (err, rows, field) {
    if (err) throw err;
    // console.log(rows)
    res.json(rows);
  });
});

app.get("/api/bells", function (req, res) {
  console.log("come in /api/bells")
  var queryString = "SELECT * FROM embell limit 50";
  connection.query(queryString, function (err, rows, field) {
    if (err) throw err;
    // console.log(rows)
    res.json(rows);
  });
});

app.get("/api/grades", function (req, res) {
  console.log("come in /api/grades")
  var queryString = "SELECT * FROM grade limit 50";
  connection.query(queryString, function (err, rows, field) {
    if (err) throw err;
    // console.log(rows)
    res.json(rows);
  });
});

