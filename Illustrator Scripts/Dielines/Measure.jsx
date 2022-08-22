// Measure length of all selected path items.
// TODO: avoid duplicate paths in the same position and length.

#target Illustrator
#include "../.lib/commons.js"

checkHasSelection()

var items = Collections.filterItem(selection, function(it) { return it.typename === "PathItem" || it.typename === "CompoundPathItem" })
check(Collections.isNotEmpty(items), "No paths found in selection")

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
  message += "No dielines found in selection."
} else {
  message += "%d lines measuring at %d.".format(count, formatUnits(distance, unitName, 2))
}
if (filledCount > 0) {
  message += "\n%d lines with colored fill are ignored.".format(filledCount)
}
if (registrationCount > 0) {
  message += "\n%d lines with registration stroke are ignored.".format(registrationCount)
}
alert(message, "Measure Dielines")

function increment(item) {
  if (item.filled) {
    filledCount++
    return // dielines usually aren"t filled
  }
  if (isColorEqual(item.strokeColor, getRegistrationColor())) {
    registrationCount++
    return // dielines" color usually aren"t registration
  }
  count++
  distance += item.length
}
