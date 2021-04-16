#target Illustrator
#include '../../.stdlib-test/testing.js'
#include '../.lib/core.js'

// https://illustrator-scripting-guide.readthedocs.io/scripting/measurementUnits/
var test; (test = function() {
    assertEquals(28, Math.round(parseUnits('1 cm')))
    assertEquals(72, parseUnits('1 inch'))
    assertEquals(3, Math.round(parseUnits('1 mm')))
    assertEquals(12, parseUnits('1 pica'))
})()