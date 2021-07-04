const { Router } = require('express');

const route = (db, model) => {
  const router = Router();

  router.get('/', (req, res) => {
    const data = db.get(model).find().value();
    return res.json(data);
  });

  router.get('/:id', (req, res) => {
    const { id } = req.params;
    const data = db.get(model).findOne({ id }).value();
    if (data) {
      return res.json(data);
    }

    return res.status(404).json({ message: 'Not found' });
  });

  return router;
};

module.exports = route;
