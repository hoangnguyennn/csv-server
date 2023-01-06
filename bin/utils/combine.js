const combine = (models, dataList) => {
  return models.reduce((results, model, index) => {
    results[model] = dataList[index]
    return results
  }, {})
}

module.exports = combine
