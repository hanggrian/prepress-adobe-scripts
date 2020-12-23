#include '../.rootlib/core.js'

check('Hello World'.startsWith('Hello'))
check('Hello World'.endsWith('World'))
check('Hello World'.substringBefore(' ') == 'Hello')
check('Hello World'.substringAfter(' ') == 'World')