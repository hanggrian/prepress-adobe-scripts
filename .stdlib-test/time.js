require('../.stdlib/time.js')
var assert = require('./assert.js')

var toISOString = function() {
  var date = new Date('2021-07-30')
  assert.assertEquals('2021-07-30', date.toISOString())
}()