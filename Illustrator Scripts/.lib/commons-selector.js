// When nothing is selected, this library will select all items with requested types.
// When there are selection, it will instead filter the selection to only match requested types.

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

var _allowedSelectionTypes = []
var _queuedSelection = []

/**
 * Configure allowed types for later selection.
 * @param {String} type any of item above.
 */
function allowSelectionType(type) {
    _allowedSelectionTypes.push(type)
}

/**
 * Select all items that match selected configuration.
 * @param {Function} callable nullable custom item checker that should return true if the item parameter should be selected.
 */
function selectAll(callable) {
    if (selection == null || selection.length == 0) {
        _queueAllToSelection(document.pageItems, callable)
    } else {
        selection.forEach(function(it) {
            _determineSelection(it, callable)
        })
    }
    selection = _queuedSelection
}

/** Recursively search groups. */
function _determineSelection(item, callable) {
    if (item.typename == 'GroupItem') {
        _queueAllToSelection(item.pageItems, callable)
        for (var i = 0; i < item.groupItems.length; i++) {
            _determineSelection(item.groupItems[i], callable)
        }
    } else {
        _queueToSelection(item, callable)
    }
}

/** `PageItems` doesn't have a function `get`, therefore must be manually iterated. */
function _queueAllToSelection(items, callable) {
    for (var i = 0; i < items.length; i++) {
        _queueToSelection(items[i], callable)
    }
}

/** Only queue if item types are allowed. */
function _queueToSelection(item, callable) {
    if (_allowedSelectionTypes.contains(item.typename)) {
        if (callable === undefined) {
            callable = function() { return true }
        }
        if (callable(item)) {
            _queuedSelection.push(item)
        }
    }
}