import fs from 'fs'
import csv from 'csv-parser'

import { ModelAndPath } from './getModelsAndPaths'
import { Item } from '~/server'

const readCsvFile = (path: string): Promise<Item[]> => {
  return new Promise(resolve => {
    const results: Item[] = []

    fs.createReadStream(path)
      .pipe(csv())
      .on('data', data => results.push(data))
      .on('end', () => {
        resolve(results)
      })
  })
}

const readCsvFiles = async (modelsAndPaths: ModelAndPath[]) => {
  const promises = modelsAndPaths.map(({ path }) => readCsvFile(path))
  const data = await Promise.all(promises)

  return modelsAndPaths.map((modelAndPath, index) => ({
    model: modelAndPath.model,
    data: data[index]
  }))
}

export default readCsvFiles
