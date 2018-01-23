'use strict'

var REGISTRATION_DATA = 'registration_data'
process.env.MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/test'
process.env.API_KEY = process.env.API_KEY || 'lksdjlkj45j4h5k4j5h345kjhskjdhfskdjf'
process.env.IS_LOCAL = process.env.MONGODB_URI.indexOf('localhost') > 0

module.exports = {

  initialize: function (next) {
    console.log('Connecting to ' + process.env.MONGODB_URI)
    require('mongodb').MongoClient.connect(process.env.MONGODB_URI, function (err, database) {
      if (err) {
        console.log(err)
        next(err)
      }

      // Save database object from the callback for reuse.
      module.exports.db = database
      module.exports.SINGLE_UPDATE = { upsert: false, multi: false }
      module.exports.REGISTRATION_DATA = REGISTRATION_DATA
      module.exports.registrations = database.collection(REGISTRATION_DATA)

      console.log('Database connection ready')

      if (next) next()
    })
  },

  async find (name, limit, res, req) {
    if (!this.checkAPIKey(req, res)) return

    var query = {'sort': [['createTime', 'desc']]}
    if (limit) query.limit = limit

    try {
      var cursor = this[name].find({}, query)
      var docs = await cursor.toArray()
      res.status(200).json(docs)
    } catch (err) {
      this.handleError(res, err, 'Error finding ' + name + ' data')
    }
  },

  checkAPIKey (req, res) {
    if (process.env.IS_LOCAL) {
      return true
    }

    var val = req && req.header ? req.header('API_KEY') : req
    if (val !== process.env.API_KEY) {
      module.exports.handleError(res, 'Invalid API_KEY: ' + val, 400)
      return false
    }

    return true
  },

  handleError (res, err, message, code) {
    if (!process.env.NO_ERROR_OUTPUT) { console.log('ERROR: ' + (err.stack ? err.stack : err)) }

    if (res) { res.status(code || 500).json({'error': message}) }
  }

}
