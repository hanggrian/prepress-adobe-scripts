/**
 * Select all items with multiple allowed types.
 * When there are active selection, will only select items within those selection.
 */

#target Illustrator
#include '../.lib/sui/dialog.js'
#include '../.lib/preconditions.js'
#include '../.lib/select.js'

const BOUNDS = [0, 0, 115, 15]

checkActiveDocument()

var document = app.activeDocument
var selection = document.selection

var dialog = Dialog('Select by types')

dialog.imports = dialog.root.addVPanel('Imports')
dialog.imports1 = dialog.imports.addHGroup()
var placedCheck = dialog.imports1.add('checkbox', BOUNDS, 'Linked file')
var nonNativeCheck = dialog.imports1.add('checkbox', BOUNDS, 'Non-native art')
dialog.imports2 = dialog.imports.addHGroup()
var rasterCheck = dialog.imports2.add('checkbox', BOUNDS, 'Image')
var pluginCheck = dialog.imports2.add('checkbox', BOUNDS, 'Plugin')

dialog.paths = dialog.root.addVPanel('Paths')
dialog.paths1 = dialog.paths.addHGroup()
var pathCheck = dialog.paths1.add('checkbox', BOUNDS, 'Path')
var compoundPathCheck = dialog.paths1.add('checkbox', BOUNDS, 'Compound path')

dialog.types = dialog.root.addVPanel('Types')
dialog.types1 = dialog.types.addHGroup()
var textFrameCheck = dialog.types1.add('checkbox', BOUNDS, 'Text frame')
var legacyTextCheck = dialog.types1.add('checkbox', BOUNDS, 'Legacy text')

dialog.others = dialog.root.addVPanel('Others')
dialog.others.alignChildren = 'fill'
dialog.others1 = dialog.others.addHGroup()
var symbolCheck = dialog.others1.add('checkbox', BOUNDS, 'Symbol')
var meshCheck = dialog.others1.add('checkbox', BOUNDS, 'Mesh')
dialog.others2 = dialog.others.addHGroup()
var graphCheck = dialog.others2.add('checkbox', BOUNDS, 'Graph')

dialog.addAction('Cancel')
dialog.addAction('OK', function() {
    var allowedTypes = []
    if (compoundPathCheck.value) allowedTypes.push(SELECT_COMPOUND_PATH)
    else if (graphCheck.value) allowedTypes.push(SELECT_GRAPH)
    else if (legacyTextCheck.value) allowedTypes.push(SELECT_LEGACY_TEXT)
    else if (meshCheck.value) allowedTypes.push(SELECT_MESH)
    else if (nonNativeCheck.value) allowedTypes.push(SELECT_NON_NATIVE)
    else if (pathCheck.value) allowedTypes.push(SELECT_PATH)
    else if (placedCheck.value) allowedTypes.push(SELECT_PLACED)
    else if (pluginCheck.value) allowedTypes.push(SELECT_PLUGIN)
    else if (rasterCheck.value) allowedTypes.push(SELECT_RASTER)
    else if (symbolCheck.value) allowedTypes.push(SELECT_SYMBOL)
    else if (textFrameCheck.value) allowedTypes.push(SELECT_TEXT_FRAME)
    selectItems(allowedTypes, function(_) { return true })
})
dialog.show()