'use strict'

var app = require('express')()
app.set('port', (process.env.PORT || 8080))

var bodyParser = require('body-parser')
app.use(bodyParser.json())

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

var global = require('./global')
console.log('Initializing')
global.initialize(function (err) {
  if (err) throw err

  require('../controllers/registration').set(app)

  app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'))
  })
})
