// Measure length of all selected path items.
// TODO: avoid duplicate paths in the same position and length.

#target Illustrator
#include "../.lib/commons.js"

checkHasSelection()

var items = Collections.filterItem(selection, function(it) {
  return it.typename === "PathItem" || it.typename === "CompoundPathItem"
})
check(Collections.isNotEmpty(items), getString(R.string.error_notypes_document, R.plurals.path.plural))

var count = 0
var distance = 0
var filledCount = 0, registrationCount = 0

Collections.forEachItem(items, function(item) {
  switch (item.typename) {
    case "PathItem":
      increment(item)
      break;
    case "CompoundPathItem":
      Collections.forEach(item.pathItems, function(it) {
        increment(it)
      })
      break;
  }
})

var message = ""
if (count + distance === 0) {
  message += getString(R.string.message_measuredielines1)
} else {
  message += getString(R.string.message_measuredielines2, count, formatUnits(distance, unitName, 2))
}
if (filledCount > 0) {
  message += getString(R.string.message_measuredielines3, filledCount)
}
if (registrationCount > 0) {
  message += getString(R.string.message_measuredielines4, registrationCount)
}
alert(message, getString(R.string.measure_dielines))

function increment(item) {
  if (item.filled) {
    filledCount++
    return // dielines usually aren"t filled
  }
  if (isColorEqual(item.strokeColor, Color2.REGISTRATION.getValue())) {
    registrationCount++
    return // dielines" color usually aren"t registration
  }
  count++
  distance += item.length
}
