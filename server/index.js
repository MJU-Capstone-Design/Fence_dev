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


app.get("/api/users", function (req, res) {
  var queryString = "SELECT * FROM users";

  connection.query(queryString, function (err, rows, field) {
    if (err) throw err;
    res.json(rows);
  });
});
