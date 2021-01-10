const express = require("express");
const cors = require("cors");
const app = express();
const bcrypt = require("bcryptjs");
const register = require("./Controllers/register");
const signIn = require("./Controllers/signIn");
const image = require("./Controllers/image");
const profile = require("./Controllers/profile");

const knex = require("knex")({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "faceapp",
    database: "postgres",
  },
});

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  
  console.log("Server is running.");

  /*  knex
    .select("*")
    .from("users")
    .then((data) => {
      res.status(200).json(data);
    });
    */
});

app.post("/signin", (req, res) => {
  signIn.handleSignIn(req, res, knex, bcrypt);
});

app.post("/register", (req, res) => {
  register.handleRegister(req, res, knex, bcrypt);
});

//can be implemented in future. validate with postman for now
app.get("/profile/:id", (req, res) => {
  profile.getProfile(req, res, knex);
});

//gets a user-id from request.body and updates the entry for that user.
app.put("/image", (req, res) => {
  image.handleImage(req, res, knex);
});

const PORT = process.env.PORT;

app.listen(process.env.PORT, () => {
  console.log(`Server at ${PORT} is running.`);
});
