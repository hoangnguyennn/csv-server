import fs from 'fs'
import path from 'path'

const EXTENSION = '.csv'

export interface ModelAndPath {
  model: string
  path: string
}

const getModelsAndPaths = (dirName: string): ModelAndPath[] => {
  return fs
    .readdirSync(dirName)
    .filter(file => path.extname(file) === EXTENSION)
    .map(file => {
      return {
        model: path.basename(file, EXTENSION),
        path: path.join(dirName, file)
      }
    })
}

export default getModelsAndPaths
