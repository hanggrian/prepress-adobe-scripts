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
    var queue = []
    _forEachItem(selection == null || selection.length == 0 ? document.pageItems : selection, function(item) {
        if (_allowedSelectionTypes.contains(item.typename)) {
            if (callable === undefined) {
                callable = function() { return true }
            }
            if (callable(item)) {
                queue.push(item)
            }
        }
    })
    selection = queue
}