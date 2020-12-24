#target Illustrator
#include '../.lib/commons.js'

check(COLOR_CYAN.cyan == 100)
check(COLOR_MAGENTA.magenta == 100)
check(COLOR_YELLOW.yellow == 100)
check(COLOR_BLACK.black == 100)

check(isColorEqual(parseColor('Cyan'), COLOR_CYAN))
check(isColorEqual(parseColor('Magenta'), COLOR_MAGENTA))
check(isColorEqual(parseColor('Yellow'), COLOR_YELLOW))
check(isColorEqual(parseColor('Black'), COLOR_BLACK))

// https://illustrator-scripting-guide.readthedocs.io/scripting/measurementUnits/
check(parseUnit('1 cm', 3) == 28.346)
check(parseUnit('1 inch') == 72)
check(parseUnit('1 mm', 6) == 2.834646)
check(parseUnit('1 pica') == 12)