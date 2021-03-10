#target Illustrator
#include '../.stdlib/stdlib.js'

check('Hello World'.startsWith('Hello'))
check('Hello World'.endsWith('World'))
check('Hello World'.substringBefore('o') == 'Hell')
check('Hello World'.substringAfter('o') == ' World')
check('Hello World'.substringBeforeLast('o') == 'Hello W')
check('Hello World'.substringAfterLast('o') == 'rld')

check(isNumeric(123))
check(isNumeric(123.02))
check(!isNumeric('Hello World'))