'use strict'

module.exports = {
  init: function () {
    var chai = require('chai')
    var sinon = require('sinon')

    var result = {
      sinon: sinon,
      chai: chai,
      sandbox: null
    }

    var sinonChai = require('sinon-chai')
    result.chai.use(sinonChai)

    result.expect = chai.expect

    result.expectError = async function (asyncFunction, message) {
      try {
        await asyncFunction()
      } catch (ex) {
        result.expect(ex.message).to.equal(message)
      }
    }

    result.fakeFind = function (global, name, data) {
      if (!global[name]) global[name] = {}
      global[name].find = function () {
        return {
          toArray: async function () {
            if (data instanceof Error) throw data

            return data
          }
        }
      }
    }

    beforeEach(function () {
      result.sandbox = result.sinon.createSandbox()
    })

    afterEach(function () {
      result.sandbox.restore()
    })

    return result
  }
}
