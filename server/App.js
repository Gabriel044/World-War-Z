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

  console.log(users);
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
  if (users[user.username] && users[user.username].password == user.password) {
    res.status(200).json({ message: users[user.username].bunker });
  } else {
    res.status(400).json({ message: "Invalid credentials!" });
  }
});

app.post("/authAPI/register", (req, res) => {
  const user = req.body;
  const keys = Object.keys(user);
  users[keys[0]] = user[keys[0]];

  fs.writeFile(
    "./Database/users.json",
    JSON.stringify(users),
    "utf8",
    (err) => {
      if (err) {
        console.log(`Error writing file: ${err}`);
        res.status(400).send("Unable to register, try again later!");
      } else {
        res.status(200).send("Registration Successful!");
      }
    }
  );
});
