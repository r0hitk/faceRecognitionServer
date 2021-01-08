const handleSignIn = (req, res, knex, bcrypt) => {
  knex
    .select("email", "hash")
    .from("login")
    .where("email", "=", req.body.email)
    .then((data) => {
      bcrypt.compare(req.body.password, data[0].hash, (err, result) => {
        if (result) {
          knex
            .select("*")
            .from("users")
            .where("email", "=", req.body.email)
            .then((data) => {
              res.status(200).json(data[0]);
            });
        } else {
          res.status(400).json("Wrong credentials!");
        }
      });
    })
    .catch((err) => {
      res.status(400).json("Unable to login");
    });
};

module.exports = {
  handleSignIn,
};
