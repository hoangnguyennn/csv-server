import { Router } from 'express'
import getController from './getController'
import Model from '../db/model'

const setupRoute = (model: Model<any>) => {
  const router = Router()
  const controller = getController(model)

  router.get('/', controller.getList)
  router.get('/:id', controller.getItem)
  router.post('/', controller.createItem)
  router.put('/:id', controller.updateItem)
  router.delete('/:id', controller.deleteItem)

  return router
}

export default setupRoute
