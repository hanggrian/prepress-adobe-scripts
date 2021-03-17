#target Illustrator
#include '../../.stdlib-test/testing.js'
#include '../.lib/core.js'

// https://illustrator-scripting-guide.readthedocs.io/scripting/measurementUnits/
var parseUnit; (parseUnit = function() {
    assertEquals(28, Math.round(parseUnit('1 cm')))
    assertEquals(72, parseUnit('1 inch'))
    assertEquals(3, Math.round(parseUnit('1 mm')))
    assertEquals(12, parseUnit('1 pica'))
})()