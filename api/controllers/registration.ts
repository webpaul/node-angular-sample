import { Request, Response, Express } from 'express'
import { Global } from '../config/global'

var global = Global.instance()

export class Registration {
  public async getItems (limit: number, res: Response, req: Request): Promise<void> {
    return global.find(global.REGISTRATION_DATA, limit, res, req)
  }

  public async getItem (id: string, res: Response, req: Request): Promise<void> {
    return global.findOne(global.REGISTRATION_DATA, id, res, req)
  }

  public async addItem(req: Request, res: Response): Promise<void> {
    var newItem = req.body

    var requiredFields = ['last_name', 'first_name', 'email', 'phone']

    for (var i = 0; i < requiredFields.length; i++) {
      if (!newItem[requiredFields[i]]) {
        global.handleError(res, 'Invalid input', 'Must provide ' + requiredFields[i], 400)
        return
      }
    }

    if (!global.checkAPIKey(newItem.API_KEY, res)) return
    delete newItem.API_KEY

    try {
      newItem.createTime = new Date()

      await global.insertOne(global.REGISTRATION_DATA, newItem)
      res.status(201).json(newItem)
    } catch (err) {
      global.handleError(res, err, 'Failed to create new item')
    }
  }

  public set(app: Express): void {
    var that = this;
    app.get('/api/registration/:id', function (req, res) {
      var id = req.params.id
      that.getItem(id, res, req)
    })

    app.get('/api/registration/all', function (req, res) {
      that.getItems(global.DEFAULT_LIMIT, res, req)
    })

    app.get('/api/registration', function (req, res) {
      var limit = parseInt(req.query.limit)
      if (!limit) limit = 30
      that.getItems(limit, res, req)
    })

    app.post('/api/registration', that.addItem)
  }
}