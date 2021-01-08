const handleRegister = (req, res, knex, bcrypt) => {
  const { email, name, password } = req.body;
  const saltRounds = 10;

  if (email.length && name.length && password.length) {
    bcrypt.hash(password, saltRounds, (err, hash) => {
      knex
        .transaction((trx) => {
          console.log(hash);
          trx
            .insert({
              hash: hash,
              email: email,
            })
            .into("login")
            .returning("email")
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
        })
        .catch((err) => res.status(400).json(err));
    });
  } else {
    throw new Error("error");
  }
};

module.exports = {
  handleRegister,
};
