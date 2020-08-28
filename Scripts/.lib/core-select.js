#include 'core.js'

const SELECT_COMPOUND_PATH = 'CompoundPathItem'
const SELECT_GRAPH = 'GraphItem'
const SELECT_LEGACY_TEXT = 'LegacyTextItem'
const SELECT_MESH = 'MeshItem'
const SELECT_NON_NATIVE = 'NonNativeItem'
const SELECT_PATH = 'PathItem'
const SELECT_PLACED = 'PlacedItem'
const SELECT_PLUGIN = 'PluginItem'
const SELECT_RASTER = 'RasterItem'
const SELECT_SYMBOL = 'SymbolItem'
const SELECT_TEXT_FRAME = 'TextFrame'

var _selectedItems = []

/**
 * Select all items that match selected configuration.
 * 
 * @param {Array} allowedTypes - combination of item types that will be selected.
 * @param {Function} callable - custom item checker that should return true if the item parameter should be selected
 * @return {void}
 */
function selectItems(allowedTypes, callable) {
    if (selection == null || selection.length == 0) {
        _addItems(document.pageItems, allowedTypes, callable)
    } else {
        for (var i = 0; i < selection.length; i++) {
            _determineItem(selection[i], allowedTypes, callable)
        }
    }

    selection = _selectedItems
}

function _determineItem(item, allowedTypes, callable) {
    if (item.typename == 'GroupItem') {
        _addItems(item.pageItems, allowedTypes, callable)
        for (var i = 0; i < item.groupItems.length; i++) {
            _determineItem(item.groupItems[i], allowedTypes, callable)
        }
    } else {
        _addItem(item, allowedTypes, callable)
    }
}

function _addItems(items, allowedTypes, callable) {
    for (var i = 0; i < items.length; i++) {
        _addItem(items[i], allowedTypes, callable)
    }
}

function _addItem(item, allowedTypes, callable) {
    for (var i = 0; i < allowedTypes.length; i++) { 
        if (item.typename == allowedTypes[i] && callable(item)) {
            _selectedItems.push(item)
        }
    }
}