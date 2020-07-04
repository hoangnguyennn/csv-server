const express = require("express");
const router = require("./router");

const create = () => {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  return app;
};

module.exports = {
  create: create,
  route: (subject, db) => router(subject, db),
};
