const express = require("express");
const bodyParser = require("body-parser");
const got = require("got");

require("dotenv").config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//HOME ROUTE
app.get("/", function (req, res) {
  res.send("Stack Finance is best !");
});

//GET ALL USERS / GET USER BY USER ID

// @ BODY PARAMS
// 1. id

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

//ADD A NEW USER
// BODY PARAMS LIST
// 1. role_id (GET LIST OF ROLES ID FROM ROLE ROUTE GIVEN BELOW)
// 2. first_name OF THE USER
// 3. last_name OF THE USER
// 4. profile_id (GET LIST OF PROFILES ID FROM PROFILE ROUTE GIVEN BELOW)
// 5. email OF THE USER
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

// GET LIST OF ALL ROLES (USED IN ADDING NEW USER)
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

// GET LIST OF ALL PROFILES (USED IN ADDING NEW USER)
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

//GET ALL RECORDS IN A GIVEN MODULE
// BODY PARAMS
// 1. module_name (example - "Leads", "Accounts")
app.get("/records", async (req, res) => {
  let url;

  if (req.body.id === undefined) {
    url = `https://www.zohoapis.in/crm/v2/${req.body.module_name}`;
  } else {
    url = `https://www.zohoapis.in/crm/v2/${req.body.module_name}/${req.body.id}`;
  }

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

//Insert a record to a given module
// Body Params
//1. module_name (required)
//2. company
//3. email
//4. last_name
//5. first_name
//6. lead_status

app.post("/records", async (req, res) => {
  let url = `https://www.zohoapis.in/crm/v2/${req.body.module_name}`;

  let headers = {
    Authorization: `Zoho-oauthtoken ${process.env.ACCESS_TOKEN}`,
  };

  let requestBody = {};
  let recordArray = [];

  let recordObject = {
    Company: req.body.company,
    Email: req.body.email,
    Last_Name: req.body.last_name,
    First_Name: req.body.first_name,
    Lead_Status: req.body.lead_status,
  };

  recordArray.push(recordObject);

  requestBody["data"] = recordArray;

  let trigger = ["approval", "workflow", "blueprint"];
  requestBody["trigger"] = trigger;

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
    res.send("Response empty");
  }
});

//GET ALL NOTES
//GET NOTES BY NOTE ID
//Body Params
//1. notes_id (if you want to search a note by it's ID)
app.get("/notes", async (req, res) => {
  let url;
  if (req.body.notes_id === undefined) {
    url = `https://www.zohoapis.in/crm/v2/Notes`;
  } else {
    url = `https://www.zohoapis.in/crm/v2/Notes/${req.body.notes_id}`;
  }

  let headers = {
    Authorization: `Zoho-oauthtoken ${process.env.ACCESS_TOKEN}`,
  };

  let parameters = {
    fields: "Note_Title,Note_Content",
    page: 1,
    per_page: 30,
  };

  let requestDetails = {
    method: "GET",
    headers: headers,
    searchParams: parameters,
    throwHttpErrors: false,
  };

  let response = await got(url, requestDetails);

  if (response != null) {
    res.send(response.body);
  } else {
    res.send("Empty response");
  }
});

//ADD a new NOTE
//Body PARAMS
//1. note_title
//2. note_content
//3. record_id (get from records API)
//4. modile_name (name of the module , example : "Leads", "Contacted")

app.post("/notes", async (req, res) => {
  let url = "https://www.zohoapis.in/crm/v2/Notes";
  let headers = {
    Authorization: `Zoho-oauthtoken ${process.env.ACCESS_TOKEN}`,
  };

  let requestBody = {};
  let recordArray = [];

  let recordObject = {
    Note_Title: req.body.note_title,
    Note_Content: req.body.note_content,
    Parent_Id: req.body.record_id, //get from records API
    se_module: req.body.module_name,
  };

  recordArray.push(recordObject);

  requestBody["data"] = recordArray;

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
    res.send("Error !");
  }
});

app.listen(process.env.PORT || "5000", function () {
  console.log("Server is up and running !");
});
