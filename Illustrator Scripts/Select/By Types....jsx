/**
 * Select all items with multiple allowed types.
 * When there are active selection, will only select items within those selection.
 */

#target Illustrator
#include '../../.rootlib/sui.js'
#include '../.lib/commons-select.js'

createDialog('Select by Types')

var bounds = [0, 0, 115, 15]

dialog.imports = dialog.main.addVPanel('Imports')
dialog.imports.row1 = dialog.imports.addHGroup()
dialog.imports.placedCheck = dialog.imports.row1.addCheckBox(bounds, 'Linked file')
dialog.imports.nonNativeCheck = dialog.imports.row1.addCheckBox(bounds, 'Non-native art')
dialog.imports.row2 = dialog.imports.addHGroup()
dialog.imports.rasterCheck = dialog.imports.row2.addCheckBox(bounds, 'Image')
dialog.imports.pluginCheck = dialog.imports.row2.addCheckBox(bounds, 'Plugin')

dialog.paths = dialog.main.addVPanel('Paths')
dialog.paths.row1 = dialog.paths.addHGroup()
dialog.paths.pathCheck = dialog.paths.row1.addCheckBox(bounds, 'Path')
dialog.paths.compoundPathCheck = dialog.paths.row1.addCheckBox(bounds, 'Compound path')

dialog.types = dialog.main.addVPanel('Types')
dialog.types.row1 = dialog.types.addHGroup()
dialog.types.textFrameCheck = dialog.types.row1.addCheckBox(bounds, 'Text frame')
dialog.types.legacyTextCheck = dialog.types.row1.addCheckBox(bounds, 'Legacy text')

dialog.others = dialog.main.addVPanel('Others')
dialog.others.alignChildren = 'fill'
dialog.others.row1 = dialog.others.addHGroup()
dialog.others.symbolCheck = dialog.others.row1.addCheckBox(bounds, 'Symbol')
dialog.others.meshCheck = dialog.others.row1.addCheckBox(bounds, 'Mesh')
dialog.others.row2 = dialog.others.addHGroup()
dialog.others.graphCheck = dialog.others.row2.addCheckBox(bounds, 'Graph')

setNegativeButton('Cancel')
setPositiveButton('OK', function() {
    if (dialog.paths.compoundPathCheck.value) allowSelectionType(SELECT_COMPOUND_PATH)
    if (dialog.others.graphCheck.value) allowSelectionType(SELECT_GRAPH)
    if (dialog.types.legacyTextCheck.value) allowSelectionType(SELECT_LEGACY_TEXT)
    if (dialog.others.meshCheck.value) allowSelectionType(SELECT_MESH)
    if (dialog.imports.nonNativeCheck.value) allowSelectionType(SELECT_NON_NATIVE)
    if (dialog.paths.pathCheck.value) allowSelectionType(SELECT_PATH)
    if (dialog.imports.placedCheck.value) allowSelectionType(SELECT_PLACED)
    if (dialog.imports.pluginCheck.value) allowSelectionType(SELECT_PLUGIN)
    if (dialog.imports.rasterCheck.value) allowSelectionType(SELECT_RASTER)
    if (dialog.others.symbolCheck.value) allowSelectionType(SELECT_SYMBOL)
    if (dialog.types.textFrameCheck.value) allowSelectionType(SELECT_TEXT_FRAME)
    selectAll()
})
show()