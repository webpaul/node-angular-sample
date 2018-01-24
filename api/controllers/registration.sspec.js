'use strict'

const test = require('../test/setup.js').init()
const expect = test.expect
const sinon = test.sinon

const controller = require('./registration')
var httpMocks = require('node-mocks-http')

process.env.API_KEY = 'abc'
process.env.NO_ERROR_OUTPUT = true

describe('registration controller', function () {
  it('should get all data', async () => {
    const global = require('../config/global')

    test.fakeFind(global, 'registrations', [
      { first_name: 'bob' }
    ])

    var res = httpMocks.createResponse()
    var req = httpMocks.createRequest({
      headers: {
        API_KEY: process.env.API_KEY
      }
    })

    await controller.getItems(null, res, req)

    var data = JSON.parse(res._getData())

    expect(data.length).to.equal(1)
  })

  it('handles find errors', async () => {
    const global = require('../config/global')

    test.fakeFind(global, 'registrations', new Error('Oh no!'))

    var res = httpMocks.createResponse()
    var req = httpMocks.createRequest({
      headers: {
        API_KEY: process.env.API_KEY
      }
    })

    await controller.getItems(null, res, req)

    var data = JSON.parse(res._getData())

    expect(data.error).to.equal('Error finding registrations data')
  })

  it('should enforce required fields for new registrations', async () => {
    var res = httpMocks.createResponse()

    var req = httpMocks.createRequest({
      body: {
        API_KEY: process.env.API_KEY,
        first_name: 'Bob'
      }
    })

    await controller.addItem(req, res)
    var data = JSON.parse(res._getData())
    expect(data.error).to.equal('Must provide last_name')
  })

  it('should add a new registration', async () => {
    const global = require('../config/global')

    var res = httpMocks.createResponse()

    var req = httpMocks.createRequest({
      body: {
        API_KEY: process.env.API_KEY,
        'second_last_name': '',
        'last_name': 'Jones',
        'first_name': 'Bob',
        'email': 'me@me.com',
        'phone': '2145551212',
        'comment': 'This is really great, thanks!'
      }
    })

    global.registrations = {
      insertOne: sinon.spy()
    }

    await controller.addItem(req, res)
    var data = JSON.parse(res._getData())

    expect(global.registrations.insertOne).to.have.callCount(1)

    expect(data).to.deep.equal({
      second_last_name: '',
      last_name: 'Jones',
      first_name: 'Bob',
      email: 'me@me.com',
      phone: '2145551212',
      comment: 'This is really great, thanks!',
      createTime: data.createTime
    })
  })

  it('should handle add registration error', async () => {
    const global = require('../config/global')

    var res = httpMocks.createResponse()

    var req = httpMocks.createRequest({
      body: {
        API_KEY: process.env.API_KEY,
        'second_last_name': '',
        'last_name': 'Jones',
        'first_name': 'Bob',
        'email': 'me@me.com',
        'phone': '2145551212',
        'comment': 'This is really great, thanks!'
      }
    })

    global.registrations = {
      insertOne: function () {}
    }

    test.sandbox.stub(global.registrations, 'insertOne').throws(new Error('Insert error'))

    await controller.addItem(req, res)
    var data = JSON.parse(res._getData())

    expect(global.registrations.insertOne).to.have.callCount(1)

    expect(data.error).to.equal('Failed to create new item')
  })
})
