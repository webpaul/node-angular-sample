'use strict'

var global = require('../config/global')

var getItems = async function (limit, res, req) {
  return global.find('registrations', limit, res, req)
}

var addItem = async function (req, res) {
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

    await global.registrations.insertOne(newItem)
    res.status(201).json(newItem)
  } catch (err) {
    global.handleError(res, err, 'Failed to create new item')
  }
}

module.exports = {
  set: function (app) {
    app.get('/api/registration', function (req, res) {
      var limit = parseInt(req.query.limit)
      if (!limit) limit = 30
      getItems(limit, res, req)
    })

    app.get('/api/registration/all', function (req, res) {
      getItems(null, res, req)
    })

    app.post('/api/registration', addItem)
  },
  getItems: getItems,
  addItem: addItem
}
