#target Photoshop
#include '../.lib/commons.js'

// https://illustrator-scripting-guide.readthedocs.io/scripting/measurementUnits/
check(parseUnit('1 cm', 3) == 28.346)
check(parseUnit('1 inch') == 72)
check(parseUnit('1 mm', 6) == 2.834646)
check(parseUnit('1 pica') == 12)