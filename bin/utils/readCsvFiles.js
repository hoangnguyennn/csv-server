const readCsvFile = require('./readCsvFile')
const combine = require('./combine')

const readCsvFiles = async (filesPath, models) => {
  const dataPromises = filesPath.map(filePath => readCsvFile(filePath))
  const dataList = await Promise.all(dataPromises)

  return combine(models, dataList)
}

module.exports = readCsvFiles
