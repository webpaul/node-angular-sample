
process.env.MONGODB_DBNAME = process.env.MONGODB_DBNAME || 'test'
process.env.MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/' + process.env.MONGODB_DBNAME
process.env.API_KEY = process.env.API_KEY || 'lksdjlkj45j4h5k4j5h345kjhskjdhfskdjf'
process.env.IS_LOCAL = process.env.MONGODB_URI.indexOf('localhost') > 0 ? 'true' : ''

import { ObjectID, MongoClient, Db, MongoError, Collection } from 'mongodb'
import { Request, Response } from 'express'

export class Global {

  private database?: Db;
  public REGISTRATION_DATA = 'registration_data'
  public DEFAULT_LIMIT = 1000

  private static _instance: Global

  public static instance() {
    if(!Global._instance) Global._instance = new Global()
    
    return Global._instance;
  }

  private constructor() {}

  public async initialize(next?: Function): Promise<void> {
    console.log('Connecting to ' + process.env.MONGODB_URI)

    try {
      if(!process.env.MONGODB_URI) throw Error('process.env.MONGODB_URI is undefined')
      if(!process.env.MONGODB_DBNAME) throw Error('process.env.MONGODB_DBNAME is undefined')

      var client = await MongoClient.connect(process.env.MONGODB_URI)
      this.database = client.db(process.env.MONGODB_DBNAME)

      console.log('Database connection to ' + process.env.MONGODB_DBNAME + ' ready')

      if (next) next()
    } catch(err) {
        console.log(err)
        if(next) next(err)
    }
  }

  public async findOne (name: string, id: string, res: Response, req: Request) : Promise<void> {
    if (!this.checkAPIKey(req, res)) return

    try {
      var cursor = this.collection(name).find({ _id: new ObjectID(id) })
      var results = await cursor.toArray()
      var item = null
      if (results && results.length > 0) item = results[0]

      res.status(200).json(item)
    } catch (err) {
      this.handleError(res, err, 'Error finding ' + name + ' data')
    }
  }

  private collection(name: string): Collection<any> {
    if(!this.database) throw Error('undefined database')

    return this.database.collection(name);
  }

  public insertOne(name: string, data: any) {
    this.collection(name).insertOne(data)
  }

  public async find (name: string, limit: number, res: Response, req: Request) : Promise<void> {
    if (!this.checkAPIKey(req, res)) return

    var query = {'sort': [['createTime', 'desc']], limit: this.DEFAULT_LIMIT}
    if (limit) query.limit = limit

    try {
      var col = this.collection(name)
      var cursor = col.find({}, query)
      var docs = await cursor.toArray()
      res.status(200).json(docs)
    } catch (err) {
      this.handleError(res, err, 'Error finding ' + name + ' data')
    }
  }

  public checkAPIKey (req : Request, res: Response): boolean {
    if (process.env.IS_LOCAL) {
      return true
    }

    var val = req && req.header ? req.header('API_KEY') : req
    if (val !== process.env.API_KEY) {
      this.handleError(res, undefined, 'Invalid API_KEY: ' + val, 400)
      return false
    }

    return true
  }

  public handleError (res : Response, err: any, message: string, code: number = 500): void {
    if (!process.env.NO_ERROR_OUTPUT) { console.log('ERROR: ' + (err.stack ? err.stack : err || message)) }

    if (res) { res.status(code).json({'error': message}) }
  }

}
