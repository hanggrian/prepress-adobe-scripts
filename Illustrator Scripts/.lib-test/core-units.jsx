#target Illustrator
#include '../../.stdlib-test/testing.js'
#include '../.lib/core.js'

// https://illustrator-scripting-guide.readthedocs.io/scripting/measurementUnits/
check(Math.round(parseUnit('1 cm')) == 28)
check(parseUnit('1 inch') == 72)
check(Math.round(parseUnit('1 mm')) == 3)
check(parseUnit('1 pica') == 12)