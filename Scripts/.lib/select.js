#include 'strings.js'

const SELECT_COMPOUND_PATH = 'CompoundPath'
const SELECT_GRAPH = 'Graph'
const SELECT_LEGACY_TEXT = 'LegacyText'
const SELECT_MESH = 'Mesh'
const SELECT_NON_NATIVE = 'NonNative'
const SELECT_PATH = 'Path'
const SELECT_PLACED = 'Placed'
const SELECT_PLUGIN = 'Plugin'
const SELECT_RASTER = 'Raster'
const SELECT_SYMBOL = 'Symbol'
const SELECT_TEXT_FRAME = 'TextFrame'

var _selectedItems = []

function selectItems(allowedTypes) {
    if (selection == null || selection.length == 0) {
        _addItems(document.pageItems, allowedTypes)
    } else {
        for (var i = 0; i < selection.length; i++) {
            _determineItem(selection[i], allowedTypes)
        }
    }

    selection = _selectedItems
}

function _determineItem(item, allowedTypes) {
    if (startsWith(item.typename, 'Group')  && !endsWith(item.typename, 's')) {
        _addItems(item.pageItems, allowedTypes)
        for (var i = 0; i < item.groupItems.length; i++) {
            _determineItem(item.groupItems[i], allowedTypes)
        }
    } else {
        _addItem(item, allowedTypes)
    }
}

function _addItems(items, allowedTypes) {
    for (var i = 0; i < items.length; i++) {
        _addItem(items[i], allowedTypes)
    }
}

function _addItem(item, allowedTypes) {
    for (var i = 0; i < allowedTypes.length; i++) {
        if (startsWith(item.typename, allowedTypes[i]) && !endsWith(item.typename, 's')) {
            _selectedItems.push(item)
        }
    }
}