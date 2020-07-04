const fs = require("fs");
const path = require("path");

module.exports = (dirName) => {
  const fileList = [];
  const subjects = [];
  fs.readdirSync(dirName).forEach((file) => {
    if (path.extname(file) === ".csv") {
      fileList.push(path.join(dirName, file));
      subjects.push(path.basename(file, ".csv"));
    }
  });

  return { fileList, subjects };
};
