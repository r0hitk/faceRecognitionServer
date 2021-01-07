const express = require("express");
const app = express();
const cors = require("cors");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const knex = require("knex")({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "faceapp",
    database: "postgres",
  },
});

/*
knex
  .select("*")
  .from("users")
  .then((data) => {
    console.log(data);
  });
*/

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
  console.log(req.body);
  if (
    req.body.email === database.users[database.users.length - 1].email &&
    req.body.password === database.users[database.users.length - 1].password
  ) {
    res.json(database.users[database.users.length - 1]);
  } else {
    res.status(400).json("error!");
  }
});

app.post("/register", (req, res) => {
  const { email, name, password } = req.body;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    knex
      .transaction((trx) => {
        if (email.length && name.length && password.length) {
          console.log(hash);
          trx.insert({
              hash: hash,
              email: email,
            }).into("login").returning("email")
            .then((loginEmail) => {
              console.log(loginEmail);
              return trx("users")
                .returning("*")
                .insert({
                  name: name,
                  email: loginEmail[0],
                  joined: new Date(),
                })
                .then((user) => {
                  res.json(user[0]);
                });
            })
            .then(trx.commit)
            .catch(trx.rollback);
        } else {
          throw new Error("error");
        }
      })
      .catch((err) => res.status(400).json(err));
  });
});

//can be implemented in future. check with postman for now
app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  // let intId = Number(id);
  knex
    .select("*")
    .from("users")
    .where({ id: id })
    .then((user) => {
      if (user.length) {
        res.json(user[0]);
      } else {
        res.status(404).json("User not found!");
      }
    })
    .catch((err) => res.status(400).json("error occurred"));
});

//gets a user id and updates the entry for that user.
app.put("/image", (req, res) => {
  const { id } = req.body;
  let intId = Number(id);
  knex("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((count) => {
      if (count.length) {
        res.json(count[0]);
      } else {
        res.status(404).json("Unable to get count");
      }
    })
    .catch((err) => res.status(400).json("error!"));
});

app.listen(5000, () => {
  console.log("Server at 5000 is running.");
});
