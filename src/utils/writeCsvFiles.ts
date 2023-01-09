import { createObjectCsvWriter as createCsvWriter } from 'csv-writer'
import { Item } from '~/server'

interface ICsvHeader {
  id: string
  title: string
}

const writeCsvFile = (path: string, header: ICsvHeader[], data: Item[]) => {
  const csvWriter = createCsvWriter({ path, header })
  return csvWriter.writeRecords(data)
}

export default writeCsvFile
