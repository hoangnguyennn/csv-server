const fs = require('fs')
const path = require('path')

const getFilesFromDir = dirName => {
  const filesPath = []
  const models = []
  fs.readdirSync(dirName).forEach(file => {
    if (path.extname(file) === '.csv') {
      filesPath.push(path.join(dirName, file))
      models.push(path.basename(file, '.csv'))
    }
  })

  return { filesPath, models }
}

module.exports = getFilesFromDir
