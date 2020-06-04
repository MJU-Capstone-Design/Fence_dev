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

// app.get("/persons", function (req, res) {
//   connection.query("SELECT * from Persons", function (err, rows) {
//     if (err) throw err;

//     console.log("The solution is: ", rows);
//     res.send(rows);
//   });
// });

app.get("/users", function (req, res) {
  var queryString = "SELECT * FROM users";

  connection.query(queryString, function (err, rows, field) {
    if (err) throw err;

    res.json(rows);
  });
});
