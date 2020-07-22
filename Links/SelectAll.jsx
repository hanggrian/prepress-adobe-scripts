#target Illustrator
#include '../.lib/preconditions.jsx'

checkActiveDocument()

var document = app.activeDocument
var selection = document.selection
var placedItems = []

switch (selection.length) {
    case 0:
        addPlacedItems(document.placedItems)
        break;
    default:
        for (var i = 0; i < selection.length; i++) {
            determineItem(selection[i])
        }
        break;
}

selection = null
for (var i = 0; i < placedItems.length; i++) {
    placedItems[i].selected = true
}

function determineItem(item) {
    switch (item.typename) {
        case 'PlacedItem':
            placedItems.push(item)
            break;
        case 'GroupItem':
            addPlacedItems(item.placedItems)
            for (var i = 0; i < item.groupItems.length; i++) {
                determineItem(item.groupItems[i])
            }
            break;
    }
}

function addPlacedItems(items) {
    for (var i = 0; i < items.length; i++) {
        placedItems.push(items[i])
    }
}