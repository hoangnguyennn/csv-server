const fs = require("fs");
const csv = require("csv-parser");

module.exports = (path) =>
  new Promise((resolve) => {
    const result = [];
    fs.createReadStream(path)
      .pipe(csv())
      .on("data", (row) => result.push(row))
      .on("end", () => resolve(result));
  });
