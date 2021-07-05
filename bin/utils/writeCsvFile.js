const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const writeCsvFile = (path, header, data) => {
  const csvWriter = createCsvWriter({ path, header });
  return csvWriter.writeRecords(data);
};

module.exports = writeCsvFile;
