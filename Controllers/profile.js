const getProfile = () => {
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
};

module.exports = {
  getProfile,
};
