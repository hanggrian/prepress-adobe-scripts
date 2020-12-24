#include '../.rootlib/core.js'

check('Hello World'.startsWith('Hello'))
check('Hello World'.endsWith('World'))
check('Hello World'.substringBefore(' ') == 'Hello')
check('Hello World'.substringAfter(' ') == 'World')

check(isNumeric(123))
check(isNumeric(123.02))
check(!isNumeric('Hello World'))