const readFile = require("./readFile");

module.exports = async ({ fileList, subjects }) => {
  const dataPromise = fileList.map((file) => readFile(file));
  const dataList = await Promise.all(dataPromise);
  const result = {};

  // parse data to object with 'subject' as key
  subjects.map((subject, index) => {
    result[subject] = dataList[index];
  });

  return result;
};
