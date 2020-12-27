const express = require("express");
const bodyParser = require("body-parser");
const got = require("got");

require("dotenv").config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.send("Stack Finance is best !");
});

app.get("/users", async (req, res) => {
  let url, requestDetails;
  if (req.body.id === undefined) {
    url = "https://www.zohoapis.in/crm/v2/users";
  } else {
    url = `https://www.zohoapis.in/crm/v2/users/${req.body.id}`;
  }

  let headers = {
    Authorization: `Zoho-oauthtoken ${process.env.ACCESS_TOKEN}`,
  };

  let parameters = {
    type: "AllUsers",
    page: 1,
    per_page: 10,
  };

  if (req.body.id === undefined) {
    requestDetails = {
      method: "GET",
      headers: headers,
      searchParams: parameters,
      throwHttpErrors: false,
    };
  } else {
    requestDetails = {
      method: "GET",
      headers: headers,
      throwHttpErrors: false,
    };
  }

  let response = await got(url, requestDetails);

  if (response != null) {
    res.send(response.body);
  } else {
    res.send("NO RESPONSE");
  }
});

app.post("/users", async (req, res) => {
  let url = "https://www.zohoapis.in/crm/v2/users";

  let headers = {
    Authorization: `Zoho-oauthtoken ${process.env.ACCESS_TOKEN}`,
  };

  let requestBody = {};
  let userArray = [];

  let userObject = {
    role: req.body.role_id,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    profile: req.body.profile_id,
    email: req.body.email,
  };

  userArray.push(userObject);
  requestBody["users"] = userArray;

  let requestDetails = {
    method: "POST",
    headers: headers,
    body: JSON.stringify(requestBody),
    encoding: "utf8",
    throwHttpErrors: false,
  };

  let response = await got(url, requestDetails);

  if (response != null) {
    res.send(response.body);
  } else {
    res.send("Response empty !");
  }
});

app.get("/roles", async (req, res) => {
  let url = "https://www.zohoapis.in/crm/v2/settings/roles";

  let headers = {
    Authorization: `Zoho-oauthtoken ${process.env.ACCESS_TOKEN}`,
  };

  let requestDetails = {
    method: "GET",
    headers: headers,
    throwHttpErrors: false,
  };

  let response = await got(url, requestDetails);

  if (response != null) {
    res.send(response.body);
  } else {
    res.send("Response empty");
  }
});

app.get("/profiles", async (req, res) => {
  let url = "https://www.zohoapis.in/crm/v2/settings/profiles";

  let headers = {
    Authorization: `Zoho-oauthtoken ${process.env.ACCESS_TOKEN}`,
  };

  let requestDetails = {
    method: "GET",
    headers: headers,
    throwHttpErrors: false,
  };

  let response = await got(url, requestDetails);

  if (response != null) {
    res.send(response.body);
  } else {
    res.send("Response empty");
  }
});

app.listen(process.env.PORT || "5000", function () {
  console.log("Server is up and running !");
});
