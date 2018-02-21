import { Global } from '../config/global'

import 'mocha';  
import * as chai from 'chai';  
import { expect } from 'chai';  
import * as sinon from 'sinon'; 
import { SinonSandbox } from 'sinon'
import * as sinonChai from 'sinon-chai'; 

export class TestSetup {
  public init() {

    var result: any = {
      chai: chai,
      sandbox: null
    }

    result.chai.use(sinonChai)
    result.expect = expect

    result.expectError = async function (asyncFunction: any, message: string) {
      try {
        await asyncFunction()
      } catch (ex) {
        result.expect(ex.message).to.equal(message)
      }
    }

    result.fakeFind = function (data: any) {
      return { 
        find: function() { 
          return { 
            toArray: function() { 
              if (data instanceof Error) throw data

              return data
            } 
          } 
        } 
      }
    }

    result.sandbox = sinon.sandbox.create()

    afterEach(function () {
      result.sandbox.restore()
    })

    return result
  }
}
