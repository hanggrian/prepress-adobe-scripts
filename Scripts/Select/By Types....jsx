/**
 * Select all items with multiple allowed types.
 * When there are active selection, will only select items within those selection.
 */

#target Illustrator
#include '../.lib/commons-select.js'
#include '../.lib/ui.js'

var BOUNDS = [0, 0, 115, 15]

init('Select by Types')

root.imports = root.addVPanel('Imports')
root.imports1 = root.imports.addHGroup()
var placedCheck = root.imports1.add('checkbox', BOUNDS, 'Linked file')
var nonNativeCheck = root.imports1.add('checkbox', BOUNDS, 'Non-native art')
root.imports2 = root.imports.addHGroup()
var rasterCheck = root.imports2.add('checkbox', BOUNDS, 'Image')
var pluginCheck = root.imports2.add('checkbox', BOUNDS, 'Plugin')

root.paths = root.addVPanel('Paths')
root.paths1 = root.paths.addHGroup()
var pathCheck = root.paths1.add('checkbox', BOUNDS, 'Path')
var compoundPathCheck = root.paths1.add('checkbox', BOUNDS, 'Compound path')

root.types = root.addVPanel('Types')
root.types1 = root.types.addHGroup()
var textFrameCheck = root.types1.add('checkbox', BOUNDS, 'Text frame')
var legacyTextCheck = root.types1.add('checkbox', BOUNDS, 'Legacy text')

root.others = root.addVPanel('Others')
root.others.alignChildren = 'fill'
root.others1 = root.others.addHGroup()
var symbolCheck = root.others1.add('checkbox', BOUNDS, 'Symbol')
var meshCheck = root.others1.add('checkbox', BOUNDS, 'Mesh')
root.others2 = root.others.addHGroup()
var graphCheck = root.others2.add('checkbox', BOUNDS, 'Graph')

addAction('Cancel')
addAction('OK', function() {
    if (compoundPathCheck.value) allowSelectionType(SELECT_COMPOUND_PATH)
    if (graphCheck.value) allowSelectionType(SELECT_GRAPH)
    if (legacyTextCheck.value) allowSelectionType(SELECT_LEGACY_TEXT)
    if (meshCheck.value) allowSelectionType(SELECT_MESH)
    if (nonNativeCheck.value) allowSelectionType(SELECT_NON_NATIVE)
    if (pathCheck.value) allowSelectionType(SELECT_PATH)
    if (placedCheck.value) allowSelectionType(SELECT_PLACED)
    if (pluginCheck.value) allowSelectionType(SELECT_PLUGIN)
    if (rasterCheck.value) allowSelectionType(SELECT_RASTER)
    if (symbolCheck.value) allowSelectionType(SELECT_SYMBOL)
    if (textFrameCheck.value) allowSelectionType(SELECT_TEXT_FRAME)
    selectAll()
})
show()