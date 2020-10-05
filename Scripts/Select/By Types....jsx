/**
 * Select all items with multiple allowed types.
 * When there are active selection, will only select items within those selection.
 */

#target Illustrator
#include '../.lib/commons-select.js'
#include '../.lib/ui.js'

var BOUNDS = [0, 0, 115, 15]

createDialog('Select by Types')

var imports = dialog.main.addVPanel('Imports')
imports.row1 = imports.addHGroup()
imports.placedCheck = imports.row1.add('checkbox', BOUNDS, 'Linked file')
imports.nonNativeCheck = imports.row1.add('checkbox', BOUNDS, 'Non-native art')
imports.row2 = imports.addHGroup()
imports.rasterCheck = imports.row2.add('checkbox', BOUNDS, 'Image')
imports.pluginCheck = imports.row2.add('checkbox', BOUNDS, 'Plugin')

var paths = dialog.main.addVPanel('Paths')
paths.row1 = paths.addHGroup()
paths.pathCheck = paths.row1.add('checkbox', BOUNDS, 'Path')
paths.compoundPathCheck = paths.row1.add('checkbox', BOUNDS, 'Compound path')

var types = dialog.main.addVPanel('Types')
types.row1 = types.addHGroup()
types.textFrameCheck = types.row1.add('checkbox', BOUNDS, 'Text frame')
types.legacyTextCheck = types.row1.add('checkbox', BOUNDS, 'Legacy text')

var others = dialog.main.addVPanel('Others')
others.alignChildren = 'fill'
others.row1 = others.addHGroup()
others.symbolCheck = others.row1.add('checkbox', BOUNDS, 'Symbol')
others.meshCheck = others.row1.add('checkbox', BOUNDS, 'Mesh')
others.row2 = others.addHGroup()
others.graphCheck = others.row2.add('checkbox', BOUNDS, 'Graph')

setNegativeAction('Cancel')
setPositiveAction('OK', function() {
    if (paths.compoundPathCheck.value) allowSelectionType(SELECT_COMPOUND_PATH)
    if (others.graphCheck.value) allowSelectionType(SELECT_GRAPH)
    if (types.legacyTextCheck.value) allowSelectionType(SELECT_LEGACY_TEXT)
    if (others.meshCheck.value) allowSelectionType(SELECT_MESH)
    if (imports.nonNativeCheck.value) allowSelectionType(SELECT_NON_NATIVE)
    if (paths.pathCheck.value) allowSelectionType(SELECT_PATH)
    if (imports.placedCheck.value) allowSelectionType(SELECT_PLACED)
    if (imports.pluginCheck.value) allowSelectionType(SELECT_PLUGIN)
    if (imports.rasterCheck.value) allowSelectionType(SELECT_RASTER)
    if (others.symbolCheck.value) allowSelectionType(SELECT_SYMBOL)
    if (types.textFrameCheck.value) allowSelectionType(SELECT_TEXT_FRAME)
    selectAll()
})
show()