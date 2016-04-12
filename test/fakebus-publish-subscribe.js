var noop = function () {};
var log = require('debug')('servicebus:test')
var busFactory = require('../bus');
var should = require('should');
var sinon = require('sinon');
var bus;
var fakeTransport = require('../bus/fake/bus')

describe('servicebus', function(){

  describe('#publish & #subscribe', function(){
    beforeEach(function(){
      console.log('fake', fakeTransport)
      bus = busFactory.bus({},{}, fakeTransport)
    })

    it('should cause message to be received by subscribe', function (done){
      bus.subscribe('my.event.11', function (event) {
        done();
      });
      setTimeout(function () {
        bus.publish('my.event.11', { my: 'event' });
      }, 100);
    });
	});
});
