const express = require('express');

const create = () => {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  return app;
};

module.exports = create;
