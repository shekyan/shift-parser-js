var expect = require('expect.js');
var esprima = require('esprima');
var converters = require('shift-spidermonkey-converter');
var ShiftParser = require('../');
var parse = ShiftParser.default;

exports.assertParseFailure = function assertParseFailure(source, message) {
  it(source, function () {
    try {
      parse(source);
    } catch (e) {
      expect(e.description).be(message);
      return;
    }
    throw new Error("Expecting error");
  });
};

exports.assertParseSuccess = function assertParseSuccess(source) {
  it(source, function () {
    parse(source);
  });
};

exports.assertEsprimaEquiv = function assertEsprimaEquiv(source) {
  it(source, function () {
    var tree = parse(source);
    var oracle = converters.toShift(esprima.parse(source));
    expect(tree).eql(oracle);
  });
};
