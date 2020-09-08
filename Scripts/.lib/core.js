check(app.documents.length > 0, 'No active document')

var document = app.activeDocument
var selection = document.selection

function check(requirement, errorMessage) {
    if (!requirement) {
        if (errorMessage !== undefined) {
            throw errorMessage
        } else {
            throw 'Failed requirement'
        }
    }
}

function checkEvenArtboards() {
    check(document.artboards.length % 2 == 0, 'Odd number of pages')
}

function checkHasSelection() {
    check(selection != null && selection.length > 0, 'No selection')
}

function checkSingleSelection() {
    checkHasSelection(selection)
    check(selection.length == 1, 'Multiple selection is not supported')
}

function checkMultipleSelection() {
    checkHasSelection(selection)
    check(selection.length > 1, 'Single selection is not supported')
}

function checkTypename(item, typename) {
    check(item.typename == typename, 'Selected item is not a ' + typename)
}

function getClippingPath(item) {
    if (item instanceof GroupItem && item.clipped) {
        return item.pathItems[0]
    }
    return item
}