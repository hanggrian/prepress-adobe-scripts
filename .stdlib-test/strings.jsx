#target Illustrator
#include 'testing.js'

assertTrue('Hello World'.startsWith('Hello'))
assertFalse('Hello World'.startsWith('World'))

assertFalse('Hello World'.endsWith('Hello'))
assertTrue('Hello World'.endsWith('World'))

assertEquals('Hello World'.substringBefore('o'), 'Hell')

assertEquals('Hello World'.substringAfter('o'), ' World')

assertEquals('Hello World'.substringBeforeLast('o'), 'Hello W')

assertEquals('Hello World'.substringAfterLast('o'), 'rld')