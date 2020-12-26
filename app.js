const express = require("express");
const bodyParser = require("body-parser");

require("dotenv").config();

const app = express();
app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.send("Stack Finance is best !");
});

app.listen(process.env.PORT || "5000", function () {
  console.log("Server is up and running !");
});
