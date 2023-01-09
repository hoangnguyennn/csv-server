import express, { json, urlencoded } from 'express'

const setupServer = () => {
  const app = express()

  app.use(json())
  app.use(urlencoded({ extended: true }))

  return app
}

export default setupServer
