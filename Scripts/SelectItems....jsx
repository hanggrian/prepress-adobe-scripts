#target Illustrator
#include '.lib/preconditions.jsx'

checkActiveDocument()

var document = app.activeDocument
var selection = document.selection
var items = []

var dialog = new Window('dialog', 'Select all')
dialog.alignChildren = 'right'

var bounds = [0, 0, 115, 21]

dialog.imports = dialog.add('panel', undefined, 'Imports')
dialog.imports.add('group')
dialog.imports1 = dialog.imports.add('group')
dialog.imports1.orientation = 'row'
var placedCheck = dialog.imports1.add('checkbox', bounds, 'Linked file')
var nonNativeCheck = dialog.imports1.add('checkbox', bounds, 'Non-native art')
dialog.imports2 = dialog.imports.add('group')
dialog.imports2.orientation = 'row'
var rasterCheck = dialog.imports2.add('checkbox', bounds, 'Image')
var pluginCheck = dialog.imports2.add('checkbox', bounds, 'Plugin')

dialog.paths = dialog.add('panel', undefined, 'Paths')
dialog.paths.add('group')
dialog.paths1 = dialog.paths.add('group')
dialog.paths1.orientation = 'row'
var pathCheck = dialog.paths1.add('checkbox', bounds, 'Path')
var compoundPathCheck = dialog.paths1.add('checkbox', bounds, 'Compound path')

dialog.types = dialog.add('panel', undefined, 'Types')
dialog.types.add('group')
dialog.types1 = dialog.types.add('group')
dialog.types1.orientation = 'row'
var textFrameCheck = dialog.types1.add('checkbox', bounds, 'Text frame')
var legacyTextCheck = dialog.types1.add('checkbox', bounds, 'Legacy text')

dialog.others = dialog.add('panel', undefined, 'Others')
dialog.others.alignChildren = 'fill'
dialog.others.add('group')
dialog.others1 = dialog.others.add('group')
dialog.others1.orientation = 'row'
var symbolCheck = dialog.others1.add('checkbox', bounds, 'Symbol')
var meshCheck = dialog.others1.add('checkbox', bounds, 'Mesh')
dialog.others2 = dialog.others.add('group')
dialog.others2.orientation = 'row'
var graphCheck = dialog.others2.add('checkbox', bounds, 'Graph')

var recursiveCheck = dialog.add('checkbox', undefined, 'Select recursively')
recursiveCheck.value = true

dialog.buttons = dialog.add('group')
dialog.buttons.alignment = 'right'
dialog.buttons.add('button', undefined, 'Cancel')
dialog.buttons.add('button', undefined, 'OK').onClick = function() {
    dialog.close()

    switch (selection.length) {
        case 0:
            addItems(document.pageItems)
            break;
        default:
            for (var i = 0; i < selection.length; i++) {
                determineItem(selection[i])
            }
            break;
    }
    
    selection = items
}

dialog.show()

function determineItem(element) {
    if (recursiveCheck.value && (element.typename == 'GroupItem' || element.typename == 'Group')) {
        addItems(element.pageItems)
        for (var i = 0; i < element.groupItems.length; i++) {
            determineItem(element.groupItems[i])
        }
    } else {
        addItem(element)
    }
}

function addItems(elements) {
    for (var i = 0; i < elements.length; i++) {
        addItem(elements[i])
    }
}

function addItem(element) {
    if (compoundPathCheck.value && (element.typename == 'CompoundPathItem' || element.typename == 'CompoundPath')) {
        items.push(element)
    } else if (graphCheck.value && (element.typename == 'GraphItem' || element.typename == 'Graph')) {
        items.push(element)
    } else if (legacyTextCheck.value && (element.typename == 'LegacyTextItem' || element.typename == 'LegacyText')) {
        items.push(element)
    } else if (meshCheck.value && (element.typename == 'MeshItem' || element.typename == 'Mesh')) {
        items.push(element)
    } else if (nonNativeCheck.value && (element.typename == 'NonNativeItem' || element.typename == 'NonNative')) {
        items.push(element)
    } else if (pathCheck.value && (element.typename == 'PathItem' || element.typename == 'Path')) {
        items.push(element)
    } else if (placedCheck.value && (element.typename == 'PlacedItem' || element.typename == 'Placed')) {
        items.push(element)
    } else if (pluginCheck.value && (element.typename == 'PluginItem' || element.typename == 'Plugin')) {
        items.push(element)
    } else if (rasterCheck.value && (element.typename == 'RasterItem' || element.typename == 'Raster')) {
        items.push(element)
    } else if (symbolCheck.value && (element.typename == 'SymbolItem' || element.typename == 'Symbol')) {
        items.push(element)
    } else if (textFrameCheck.value && (element.typename == 'TextFrameItem' || element.typename == 'TextFrame')) {
        items.push(element)
    }
}