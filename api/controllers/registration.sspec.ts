import { Registration } from './registration'
import { TestSetup } from '../test/setup'
import { ObjectID } from 'mongodb'
import { Global } from '../config/global'

const test = new TestSetup().init()
const expect = test.expect
const sinon = test.sandbox

const controller = new Registration()
var httpMocks = require('node-mocks-http')

process.env.API_KEY = 'abc'
process.env.NO_ERROR_OUTPUT = 'true'
var global: Global = Global.instance()

describe('registration controller', function () {
  it('should get all data', async () => {
    var stub = sinon.stub(global, 'collection').withArgs(global.REGISTRATION_DATA)
    stub.returns(test.fakeFind([{ first_name: 'bob' }]))
    
    var res = httpMocks.createResponse()
    var req = httpMocks.createRequest({
      headers: {
        API_KEY: process.env.API_KEY
      }
    })

    await controller.getItems(10, res, req)

    var data = JSON.parse(res._getData())
    expect(data.error).to.be.undefined
    expect(data.length).to.equal(1)
  })

  it('should get by id', async () => {

    var stub = sinon.stub(global, 'collection').withArgs(global.REGISTRATION_DATA)
    var id = '5a679fa38084044c20cdbe69'
    stub.returns(test.fakeFind([
      { _id: new ObjectID(id), first_name: 'bob' }
    ]))

    var res = httpMocks.createResponse()
    var req = httpMocks.createRequest({
      headers: {
        API_KEY: process.env.API_KEY
      }
    })

    await controller.getItem(id, res, req)

    var data = JSON.parse(res._getData())

    expect(data.first_name).to.equal('bob')
  })

  it('handles find errors', async () => {
    var stub = sinon.stub(global, 'collection').withArgs(global.REGISTRATION_DATA)
    stub.returns(test.fakeFind(new Error('Oh no!')))

    var res = httpMocks.createResponse()
    var req = httpMocks.createRequest({
      headers: {
        API_KEY: process.env.API_KEY
      }
    })

    await controller.getItems(10, res, req)

    var data = JSON.parse(res._getData())

    expect(data.error).to.equal('Error finding registration_data data')
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

  /*it('should add a new registration', async () => {
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

    sinon.stub(global.registrations, 'insertOne').throws(new Error('Insert error'))

    await controller.addItem(req, res)
    var data = JSON.parse(res._getData())

    expect(global.registrations.insertOne).to.have.callCount(1)

    expect(data.error).to.equal('Failed to create new item')
  })
  */
})
