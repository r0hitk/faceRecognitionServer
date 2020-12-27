const express = require("express");

const app = express();
app.use(express.json());
const database = [
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
];

app.get("/", (req, res) => {
  res.send("Hello from the backend!");
});
("");
app.post("/signin", (req, res) => {
  if (
    req.body.email === database[0].email &&
    req.body.password === database[0].password
  ) {
    res.send("success!");
  } else {
    res.status(404).json("error!");
  }
});

app.listen(3000, () => {
  console.log("Server at 3000 is running.");
});
