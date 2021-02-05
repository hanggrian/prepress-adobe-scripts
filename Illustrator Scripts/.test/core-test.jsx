#target Illustrator
#include '../.lib/core.js'

check(COLOR_CYAN.cyan == 100)
check(COLOR_MAGENTA.magenta == 100)
check(COLOR_YELLOW.yellow == 100)
check(COLOR_BLACK.black == 100)

check(isColorEqual(parseColor('Cyan'), COLOR_CYAN))
check(isColorEqual(parseColor('Magenta'), COLOR_MAGENTA))
check(isColorEqual(parseColor('Yellow'), COLOR_YELLOW))
check(isColorEqual(parseColor('Black'), COLOR_BLACK))

// https://illustrator-scripting-guide.readthedocs.io/scripting/measurementUnits/
check(Math.round(parseUnit('1 cm')) == 28)
check(parseUnit('1 inch') == 72)
check(Math.round(parseUnit('1 mm')) == 3)
check(parseUnit('1 pica') == 12)