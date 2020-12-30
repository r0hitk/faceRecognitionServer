const express = require("express");

const app = express();
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
  database.users.push({
    id: 153,
    name: name,
    email: email,
    password: password,
    entries: 0,
    joined: new Date(),
  });

  res.json(database.users[database.users.length-1]);
});

app.listen(3000, () => {
  console.log("Server at 3000 is running.");
});
