const writeCsvFile = require('../utils/writeCsvFile')
const getPath = require('../utils/getPath')

function MyDB(initialData, source) {
  this.initialData = initialData
  this.source = source
  this.currentData = initialData
  this.currentModel = null
}

MyDB.isMatch = function (item, filter) {
  let isEqual = true
  for (const key in filter) {
    if (item[key] !== filter[key]) {
      isEqual = false
      break
    }
  }

  return isEqual
}

MyDB.prototype.get = function (model) {
  this.currentModel = model
  this.currentData = this.initialData[model]
  return this
}

MyDB.prototype.find = function (filter = {}) {
  this.currentData = this.currentData.filter(item => {
    return MyDB.isMatch(item, filter)
  })

  return this
}

MyDB.prototype.findOne = function (filter = {}) {
  this.currentData = this.currentData.find(item => {
    return MyDB.isMatch(item, filter)
  })

  return this
}

MyDB.prototype.deleteOne = function (filter = {}) {
  const currentModelData = this.initialData[this.currentModel]
  if (!currentModelData) {
    return false
  }

  const index = currentModelData.findIndex(item => {
    return MyDB.isMatch(item, filter)
  })

  if (index === -1) {
    return false
  }

  const item = this.initialData[this.currentModel][0]
  this.initialData[this.currentModel] = [
    ...currentModelData.slice(0, index),
    ...currentModelData.slice(index + 1)
  ]

  const titles = Object.keys(item)
  const header = titles.map(title => ({ id: title, title }))
  const path = getPath(this.source, this.currentModel)
  return writeCsvFile(path, header, this.initialData[this.currentModel])
}

MyDB.prototype.value = function () {
  const result = this.currentData
  this.currentData = this.initialData
  this.currentModel = null
  return result
}

module.exports = MyDB
