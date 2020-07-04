const router = require("express").Router();

module.exports = (subject, db) => {
  router.get("/", (req, res) => {
    return res.json(db.get(subject).value());
  });

  router.get("/:id", (req, res) => {
    const { id } = req.params;
    const itemIndex = db
      .get(subject)
      .value()
      .map((item) => item.id)
      .indexOf(id);
    const result = itemIndex === -1 ? {} : db.data[subject][itemIndex];

    return res.json(result);
  });

  return router;
};
