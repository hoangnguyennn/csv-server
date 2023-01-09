import crypto from 'crypto'
import writeCsvFile from '~/utils/writeCsvFiles'

export interface Item {
  id: string
  [anotherKey: string]: any
}

export default class Model<T extends Item> {
  constructor(public data: T[], public modelPath: string) {
    this.data = data
    this.modelPath = modelPath
  }

  find() {
    return this.data
  }

  findOne(id: string) {
    return this.data.find(item => item.id === id)
  }

  async create(item: Omit<T, 'id'>) {
    const itemCreate = { ...item, id: crypto.randomUUID() } as T
    this.data.push(itemCreate)
    await this.writeToFile()
    return itemCreate
  }

  async update(id: string, itemUpdate: T) {
    const index = this.data.findIndex(item => item.id === id)
    const item = { ...itemUpdate, id }

    if (index !== -1) {
      this.data[index] = item
    }

    await this.writeToFile()
    return item
  }

  delete(id: string) {
    this.data = this.data.filter(item => item.id !== id)
    return this.writeToFile()
  }

  writeToFile() {
    const headers = Object.keys(this.data[0]).map(title => ({
      id: title,
      title
    }))

    return writeCsvFile(this.modelPath, headers, this.data)
  }
}
