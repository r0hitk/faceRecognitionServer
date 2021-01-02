const express = require("express");
const app = express();
const cors = require('cors');
const bcrypt = require("bcrypt");
const saltRounds = 10;
 
app.use(cors());
app.use(express.json());

const database = {
  users: [
    {
      id: 123,
      name: "Rohit",
      email: "rohit@gmail.com",
      password: "cookies",
      entries: 0,
      joined: new Date(),
    },
    {
      id: 143,
      name: "Ankit",
      email: "ankit@gmail.com",
      password: "bananas",
      entries: 0,
      joined: new Date(),
    },
  ],
  login: [
    {
      id: 123,
      hash: "",
      email: "rohit@gmail.com",
    },
  ],
};

app.get("/", (req, res) => {
  res.send(database.users);
});

app.post("/signin", (req, res) => {
  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    res.send("success!");
  } else {
    res.status(404).json("error!");
  }
});

app.post("/register", (req, res) => {
  const { email, name, password } = req.body;

  bcrypt.hash(password, saltRounds, (err,hash)=>{
    console.log(hash);
  });

  database.users.push({
    id: 153,
    name: name,
    email: email,
    password: password,
    entries: 0,
    joined: new Date(),
  });

  res.json(database.users[database.users.length - 1]);
});

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  let intId = Number(id);
  let found = false;
  database.users.forEach((user) => {
    if (user.id === intId) {
      found = true;
      return res.json(user);
    }
  });
  if (!found) {
    res.status(404).json("no such user!");
  }
});

app.put("/image", (req, res) => {
  const { id } = req.body;
  let intId = Number(id);
  let found = false;
  database.users.forEach((user) => {
    if (user.id === intId) {
      found = true;
      user.entries++;
      return res.json(user.entries);
    }
  });
  if (!found) {
    res.status(404).json("no such user!");
  }
});

app.listen(3000, () => {
  console.log("Server at 3000 is running.");
});
