#include 'core.js'

var SELECT_COMPOUND_PATH = 'CompoundPathItem'
var SELECT_GRAPH = 'GraphItem'
var SELECT_LEGACY_TEXT = 'LegacyTextItem'
var SELECT_MESH = 'MeshItem'
var SELECT_NON_NATIVE = 'NonNativeItem'
var SELECT_PATH = 'PathItem'
var SELECT_PLACED = 'PlacedItem'
var SELECT_PLUGIN = 'PluginItem'
var SELECT_RASTER = 'RasterItem'
var SELECT_SYMBOL = 'SymbolItem'
var SELECT_TEXT_FRAME = 'TextFrame'

var allowedSelectionTypes = []
var queuedSelection = []

/**
 * Configure allowed types for later selection.
 * @param {String} type - any of item above.
 * @return {void}
 */
function allowSelectionType(type) {
    allowedSelectionTypes.push(type)
}

/**
 * Select all items that match selected configuration.
 * @param {Function} callable - nullable custom item checker that should return true if the item parameter should be selected
 * @return {void}
 */
function selectAll(callable) {
    if (selection == null || selection.length == 0) {
        queueAllToSelection(document.pageItems, callable)
    } else {
        for (var i = 0; i < selection.length; i++) {
            determineSelection(selection[i], callable)
        }
    }
    selection = queuedSelection
}

function determineSelection(item, callable) {
    if (item.typename == 'GroupItem') {
        queueAllToSelection(item.pageItems, callable)
        for (var i = 0; i < item.groupItems.length; i++) {
            determineSelection(item.groupItems[i], callable)
        }
    } else {
        queueToSelection(item, callable)
    }
}

function queueAllToSelection(items, callable) {
    for (var i = 0; i < items.length; i++) {
        queueToSelection(items[i], callable)
    }
}

function queueToSelection(item, callable) {
    for (var i = 0; i < allowedSelectionTypes.length; i++) { 
        if (item.typename == allowedSelectionTypes[i]) {
            if (callable === undefined) {
                callable = function() { return true }
            }
            if (callable(item)) {
                queuedSelection.push(item)
            }
        }
    }
}