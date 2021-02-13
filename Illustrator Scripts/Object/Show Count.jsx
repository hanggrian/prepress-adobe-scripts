// Sum up all items recursively.

#include '../.lib/commons.js'

checkHasSelection()

var innerCount = 0
selection.forEachItem(function() { innerCount++ })

var message = 'There are ' + selection.length + ' items.'
if (selection.length != innerCount) {
    message += '\n' + innerCount + ' items across all groups.'
}
alert(message, 'Show Count')