// Measure length of all selected path items.
// TODO: avoid duplicate paths in the same position and length.

#target Illustrator
#include '../.lib/commons.js'

checkHasSelection()

var items = selection.filterItem(function(it) { return it.typename === 'PathItem' || it.typename === 'CompoundPathItem' })
check(items.isNotEmpty(), 'No paths found in selection')

var count = 0
var distance = 0
var filledCount = 0, registrationCount = 0

items.forEachItem(function(it) {
    switch (it.typename) {
        case 'PathItem':
            increment(it)
            break;
        case 'CompoundPathItem':
            for (var i = 0; i < it.pathItems.length; i++) {
                increment(it.pathItems[i])
            }
            break;
    }
})

var message = ''
if (count + distance === 0) {
    message += 'No dielines found in selection.'
} else {
    message += '{0} lines measuring at {1}.'.format(count, formatUnits(distance, unitName, 2))
}
if (filledCount > 0) {
    message += '\n{0} lines with colored fill are ignored.'.format(filledCount)
}
if (registrationCount > 0) {
    message += '\n{0} lines with registration stroke are ignored.'.format(registrationCount)
}
alert(message, 'Measure Dielines')

function increment(item) {
    if (item.filled) {
        filledCount++
        return // dielines usually aren't filled
    }
    if (isColorEqual(item.strokeColor, getRegistrationColor())) {
        registrationCount++
        return // dielines' color usually aren't registration
    }
    count++
    distance += item.length
}