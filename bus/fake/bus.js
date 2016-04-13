var Bus = require('../bus'),
    util = require('util'),
    log = require('debug')('servicebus');

var subscribers = {};


function FakeBus (options) {
  var self = this;

  options = options || {};
  
  Bus.call(this);
}

util.inherits(FakeBus, Bus);

FakeBus.prototype.listen = function listen (queueName, options, callback) {
  throw 'FakeBus.listen not implemented'
};

FakeBus.prototype.unlisten = function unlisten (queueName, options) {
  throw 'FakeBus.unlisten not implemented'
};

FakeBus.prototype.destroyListener = function removeListener (queueName, options) {
  throw 'FakeBus.destroyListener not implemented'
};

FakeBus.prototype.setOptions = function (queueName, options) {
  throw 'FakeBus.setOptions not implemented'
};

FakeBus.prototype.send = function send (queueName, message, options, cb) {
  throw 'FakeBus.send  not implemented'
};

FakeBus.prototype.subscribe = function subscribe (queueName, options, callback) {
  if (!subscribers[queueName]) {
    subscribers[queueName] = [];
  }
  var callbackFunction = options;
  if (typeof callback == 'function') {
    callbackFunction = callback;
  }

  subscribers[queueName].push({ sub: callbackFunction });
};

FakeBus.prototype.publish = function publish (queueName, message, options, cb) {
  if (subscribers[queueName]) {
    subscribers[queueName].forEach(function(s){
      s.sub(message)
    });
  }
};

FakeBus.prototype.close = function close () {
  throw 'FakeBus.close not implemented'
};

module.exports.Bus = FakeBus;
