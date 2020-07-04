const path = require("path");
const writeToFile = require("./writeToFile");

module.exports = (dir, object) => {
  const resultPromise = Object.keys(object).map((key) =>
    writeToFile(path.join(dir, key + ".csv"), object[key])
  );

  return Promise.all(resultPromise);
};
