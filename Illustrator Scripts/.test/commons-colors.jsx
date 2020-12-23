#target Illustrator
#include '../.lib/commons.js'

check(COLOR_CYAN.cyan == 100)
check(COLOR_CYAN.magenta == 0)
check(COLOR_CYAN.yellow == 0)
check(COLOR_CYAN.black == 0)

check(COLOR_MAGENTA.cyan == 0)
check(COLOR_MAGENTA.magenta == 100)
check(COLOR_MAGENTA.yellow == 0)
check(COLOR_MAGENTA.black == 0)

check(COLOR_YELLOW.cyan == 0)
check(COLOR_YELLOW.magenta == 0)
check(COLOR_YELLOW.yellow == 100)
check(COLOR_YELLOW.black == 0)

check(COLOR_BLACK.cyan == 0)
check(COLOR_BLACK.magenta == 0)
check(COLOR_BLACK.yellow == 0)
check(COLOR_BLACK.black == 100)

check(parseColor('Cyan').equalTo(COLOR_CYAN))
check(parseColor('Magenta').equalTo(COLOR_MAGENTA))
check(parseColor('Yellow').equalTo(COLOR_YELLOW))
check(parseColor('Black').equalTo(COLOR_BLACK))