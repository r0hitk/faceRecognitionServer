const handleImage = (req,res,knex) => {
  const { id } = req.body;
  // let intId = Number(id);
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
};

module.exports={
    handleImage
}
