const createCsvWriter = require("csv-writer").createObjectCsvWriter;

module.exports = (path, data) => {
  const titles = Object.keys(data[0]);
  const csvWriter = createCsvWriter({
    path,
    header: titles.map((title) => ({ id: title, title })),
  });

  return csvWriter.writeRecords(data);
};
