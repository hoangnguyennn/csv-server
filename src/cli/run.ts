import fs from 'fs'
import path from 'path'
import { Model, setupRoute, setupServer } from '~/server'
import home from '~/template/home'
import getModelsAndPaths from '~/utils/getModelsAndPaths'
import readCsvFiles from '~/utils/readCsvFiles'

export default (argv: any) => {
  const source = argv._[0]

  if (!fs.existsSync(source)) {
    console.log(`Error: ${source} doesn't exists`)
    process.exit(1)
  }

  if (!fs.lstatSync(source).isDirectory()) {
    console.log(`Error: ${source} is not a directory`)
    process.exit(2)
  }

  const { port } = argv
  const start = async () => {
    const app = setupServer()
    const modelsAndPaths = getModelsAndPaths(source)
    const modelsAndData = await readCsvFiles(modelsAndPaths)

    app.get('/', (req, res) =>
      res.send(
        home(
          modelsAndData.map(model => model.model),
          port
        )
      )
    )

    modelsAndData.forEach(({ model, data }) => {
      const modelPath = path.resolve(path.join(source, model + '.csv'))
      const modelInstance = new Model(data, modelPath)
      app.use(`/${model}`, setupRoute(modelInstance))
    })

    app.listen(port, () => {
      console.log(`started server on 0.0.0.0:${port}`)
      console.log(`url: http://localhost:${port}`)
    })
  }

  start()
}
