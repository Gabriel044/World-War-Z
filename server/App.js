const express = require("express");
const path = require("path");
var cors = require("cors");
const fs = require("fs");
var bodyParser = require("body-parser");
const app = express();

try {
  const data = fs.readFileSync("./Database/users.json", "utf8");
  // parse JSON string to JSON object
  var users = JSON.parse(data);
} catch (err) {
  console.log(`Error reading file from disk: ${err}`);
}

try {
  const data = fs.readFileSync("./Database/blogs.json", "utf8");
  // parse JSON string to JSON object
  var blogs = JSON.parse(data);
} catch (err) {
  console.log(`Error reading file from disk: ${err}`);
}

try {
  const data = fs.readFileSync("./Database/bunkers.json", "utf8");
  // parse JSON string to JSON object
  var bunkers = JSON.parse(data);
} catch (err) {
  console.log(`Error reading file from disk: ${err}`);
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.listen(5000);

app.use(express.static(path.join(__dirname, "../world-war-z", "/build")));

app.post("/authAPI/login", (req, res) => {
  const user = req.body;
  res.setHeader("Content-Type", "application/json");
  if (users[user.username] && users[user.username].password == user.password) {
    res.status(200).json({ message: users[user.username].bunker });
  } else {
    res.status(400).json({ message: "Invalid credentials!" });
  }
});

app.post("/authAPI/register", (req, res) => {
  const user = req.body;
  const keys = Object.keys(user);
  var dateObj = new Date();
  var month = dateObj.getUTCMonth() + 1; //months from 1-12
  var day = dateObj.getUTCDate();
  var year = dateObj.getUTCFullYear();
  user[joinDate] = day + "/" + month + "/" + year;
  res.setHeader("Content-Type", "application/json");
  users[keys[0]] = user[keys[0]];
  fs.writeFile(
    "./Database/users.json",
    JSON.stringify(users),
    "utf8",
    (err) => {
      if (err) {
        console.log(`Error writing file: ${err}`);
        res
          .status(400)
          .send({ message: "Unable to register, try again later!" });
      } else {
        res.status(200).send({ message: "Registration Successful!" });
      }
    }
  );
});

app.get("/users/:userId", (req, res) => {
  userId = req.params.userId;
  res.setHeader("Content-Type", "application/json");
  res.status(200).send({ user: users[userId] });
});

app.get("/bunkers", (req, res) => {
  res.setHeader("Content-Type", "application/json");
   try {
    const bunkers = fs.readFileSync("./Database/bunkers.json", "utf8");
    // parse JSON string to JSON object
    res.status(200).json({ bunker: bunkers });
  } catch (err) {
    console.log(`Error reading file from disk: ${err}`);
  }
});

app.get("/bunkers/:bunkerId", (req, res) => {
  bunkerId = req.params.bunkerId;
  res.setHeader("Content-Type", "application/json");
  res.status(200).send({ bunker: bunkers[bunkerId] });
});

app.get("/blogs", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  try {
    const blogs = fs.readFileSync("./Database/blogs.json", "utf8");
    // parse JSON string to JSON object
    res.status(200).json({ blogs: blogs });
  } catch (err) {
    console.log(`Error reading file from disk: ${err}`);
  }
});

app.post("/blogs", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  blogs.push(req.body);
  fs.writeFile(
    "./Database/blogs.json",
    JSON.stringify(blogs),
    "utf8",
    (err) => {
      if (err) {
        console.log(`Error writing file: ${err}`);
        res
          .status(400)
          .send({ message: "Unable to register, try again later!" });
      } else {
        res.status(200).send({ message: "Registration Successful!" });
      }
    }
  );
});

app.post("/bunkers", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  //bunkers.push(req.body);
  bunkers[req.body.name] = req.body;
  fs.writeFile(
    "./Database/bunkers.json",
    JSON.stringify(bunkers),
    "utf8",
    (err) => {
      if (err) {
        console.log(`Error writing file: ${err}`);
        res
          .status(400)
          .send({ message: "Unable to register, try again later!" });
      } else {
        res.status(200).send({ message: "Registration Successful!" });
      }
    }
  );
});
