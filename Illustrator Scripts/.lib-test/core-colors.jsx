#target Illustrator
#include '../../.stdlib-test/testing.js'
#include '../.lib/core.js'

check(COLOR_CYAN.cyan == 100)
check(COLOR_MAGENTA.magenta == 100)
check(COLOR_YELLOW.yellow == 100)
check(COLOR_BLACK.black == 100)

check(isColorEqual(parseColor('Cyan'), COLOR_CYAN))
check(isColorEqual(parseColor('Magenta'), COLOR_MAGENTA))
check(isColorEqual(parseColor('Yellow'), COLOR_YELLOW))
check(isColorEqual(parseColor('Black'), COLOR_BLACK))