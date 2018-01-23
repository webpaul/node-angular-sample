'use strict'

var app = require('express')()
app.set('port', (process.env.PORT || 8080))

var bodyParser = require('body-parser')
app.use(bodyParser.json())

var global = require('./global')
console.log('Initializing')
global.initialize(function (err) {
  if (err) throw err

  require('../controllers/registration').set(app)

  app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'))
  })
})
