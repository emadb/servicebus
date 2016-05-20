var rabbitmq = require('./rabbitmq/bus');

module.exports.bus = function bus (options, implOpts, transportType = rabbitmq) {
  return new transportType.Bus(options, implOpts)
};

var namedBuses = {};

module.exports.namedBus = function namedBus(name, options, implOpts) {
  var bus = namedBuses[name];
  if ( ! bus) {
    bus = namedBuses[name] = new rabbitmq.Bus(options, implOpts);
  }
  return bus;
};