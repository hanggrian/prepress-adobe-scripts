/**
 * Select all items with multiple allowed types.
 * When there are active selection, will only select items within those selection.
 */

#target Illustrator
#include '../.lib/core-select.js'
#include '../.lib/ui.js'

const BOUNDS = [0, 0, 115, 15]

init('Select by types')

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
show()