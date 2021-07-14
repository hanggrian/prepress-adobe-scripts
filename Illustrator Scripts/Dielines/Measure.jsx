// Measure length of all selected path items.
// TODO: avoid duplicate paths in the same position and length.

#target Illustrator
#include '../.lib/commons.js'

checkHasSelection()

var items = selection.filterItem(function(it) { return it.typename === 'PathItem' || it.typename === 'CompoundPathItem' })
check(items.isNotEmpty(), 'No paths found in selection')

var hasFilledLine = false
var count = 0, registrationCount = 0
var distance = 0, registrationDistance = 0

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

alert(buildString(function(it) {
    if (count + registrationCount + distance + registrationDistance === 0) {
        it.appendLine('No dielines found in selection.')
        if (hasFilledLine) {
            it.appendLine('Lines with color fill are ignored.')
        }
    } else {
        it.append((count + registrationCount) + ' lines measuring at ' + formatUnits(distance + registrationDistance, unitName, 2))
        if (distance > 0 && registrationDistance > 0) {
            it.appendLine(', containing:')
            it.appendLine('• ' + count + ' lines at ' + formatUnits(distance, unitName, 2))
            it.appendLine('• ' + registrationCount + ' registration lines at ' + formatUnits(registrationDistance, unitName, 2))
        } else {
            it.appendLine('.')
        }
    }
}).trim(), 'Measure Dielines')

function increment(item) {
    if (item.filled) {
        hasFilledLine = true
        return // dielines usually aren't filled
    }
    if (isColorEqual(item.strokeColor, getRegistrationColor())) {
        registrationCount++
        registrationDistance += item.length
    } else {
        count++
        distance += item.length
    }
}