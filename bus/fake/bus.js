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
  console.log('FakeBus.listen')
};

FakeBus.prototype.unlisten = function unlisten (queueName, options) {
  console.log('FakeBus.unlisten')
};

FakeBus.prototype.destroyListener = function removeListener (queueName, options) {
  console.log('FakeBus.destroyListener')
};

FakeBus.prototype.setOptions = function (queueName, options) {
  console.log('FakeBus.setOptions')
};

FakeBus.prototype.send = function send (queueName, message, options, cb) {
  console.log('FakeBus.send')
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
  console.log('FakeBus.close')
};

module.exports.Bus = FakeBus;
