const path = require('path');

const getPath = (dirname, model) => {
  return path.join(dirname, model + '.csv');
};

module.exports = getPath;
