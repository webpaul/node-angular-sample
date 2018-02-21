import express = require('express');
import { Request, Response, NextFunction } from 'express'
import * as bodyParser from 'body-parser'
import { Global } from './global'
import { Registration } from '../controllers/registration'

var app = express();

app.set('port', (process.env.PORT || 8080))

app.use(bodyParser.json())

app.use(function (req: Request, res: Response, next: NextFunction) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

var global = Global.instance()
var registration = new Registration()

console.log('Initializing')
global.initialize(function (err: Error) {
  if (err) throw err

  registration.set(app)

  app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'))
  })
})
