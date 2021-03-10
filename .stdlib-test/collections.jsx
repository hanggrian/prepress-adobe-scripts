#target Illustrator
#include 'testing.js'

assertEquals([0, 1, 2].first(), 0)

assertEquals([0, 1, 2].last(), 2)

assertEquals([0, 1, 2].lastIndex(), 2)

assertFalse([0, 1, 2].isEmpty())

assertTrue([0, 1, 2].isNotEmpty())

assertTrue([0, 1, 2].contains(0))
assertFalse([0, 1, 2].contains(3))

assertEquals([0, 1, 1, 2, 2, 2].distinct().length, 3)