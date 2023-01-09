import { Request, Response } from 'express'
import Model, { Item } from '../db/model'

const getController = <T extends Item>(model: Model<T>) => {
  const controller = {
    getList(req: Request, res: Response) {
      const list = model.find()

      return res.json(list).end()
    },
    getItem(req: Request, res: Response) {
      const id = req.params.id
      const item = model.findOne(id)

      return res.json(item).end()
    },
    async createItem(req: Request, res: Response) {
      const item = req.body
      const itemCreated = await model.create(item)

      return res.json({ message: 'created', item: itemCreated }).end()
    },
    async updateItem(req: Request, res: Response) {
      const id = req.params.id
      const item = req.body
      const itemUpdated = await model.update(id, item)

      return res.json({ message: 'updated', item: itemUpdated }).end()
    },
    deleteItem(req: Request, res: Response) {
      const id = req.params.id
      const item = model.delete(id)

      return res.json({ message: 'deleted' }).end()
    }
  }

  return controller
}

export default getController
