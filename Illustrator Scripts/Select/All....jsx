// Select all items with multiple allowed types.
// When there are active selection, will only select items within those selection.

#target Illustrator
#include '../.lib/commons.js'

var dialog = new Dialog('Select All', 'fill')
var placedCheck, nonNativeCheck, rasterCheck, pluginCheck
var pathCheck, compoundPathCheck
var textFrameCheck, legacyTextCheck
var symbolCheck, meshCheck, graphCheck

dialog.main.orientation = 'row'
dialog.vgroup(function(group) {
    group.alignChildren = 'fill'
    group.vpanel('Imports', function(panel) {
        panel.alignChildren = 'fill'
        placedCheck = panel.checkBox(undefined, 'Links', function(it) {
            it.value = preferences.getBoolean(dialog, 'Links')
        })
        nonNativeCheck = panel.checkBox(undefined, 'Non-Native Arts', function(it) {
            it.value = preferences.getBoolean(dialog, 'Non-Native Arts')
        })
        rasterCheck = panel.checkBox(undefined, 'Images', function(it) {
            it.value = preferences.getBoolean(dialog, 'Images')
        })
        pluginCheck = panel.checkBox(undefined, 'Plugins', function(it) {
            it.value = preferences.getBoolean(dialog, 'Plugins')
        })
    })
    group.vpanel('Types', function(panel) {
        panel.alignChildren = 'fill'
        textFrameCheck = panel.checkBox(undefined, 'Text Frames', function(it) {
            it.value = preferences.getBoolean(dialog, 'Text Frames')
        })
        legacyTextCheck = panel.checkBox(undefined, 'Legacy Texts', function(it) {
            it.value = preferences.getBoolean(dialog, 'Legacy Texts')
        })
    })
})
dialog.vgroup(function(group) {
    group.alignChildren = 'fill'
    group.vpanel('Paths', function(panel) {
        panel.alignChildren = 'fill'
        pathCheck = panel.checkBox(undefined, 'Paths', function(it) {
            it.value = preferences.getBoolean(dialog, 'Paths')
        })
        compoundPathCheck = panel.checkBox(undefined, 'Compound Paths', function(it) {
            it.value = preferences.getBoolean(dialog, 'Compound Paths')
        })
    })
    group.vpanel('Others', function(panel) {
        panel.alignChildren = 'fill'
        symbolCheck = panel.checkBox(undefined, 'Symbols', function(it) {
            it.value = preferences.getBoolean(dialog, 'Symbols')
        })
        meshCheck = panel.checkBox(undefined, 'Meshes', function(it) {
            it.value = preferences.getBoolean(dialog, 'Meshes')
        })
        graphCheck = panel.checkBox(undefined, 'Graphs', function(it) {
            it.value = preferences.getBoolean(dialog, 'Graphs')
        })
    })
})

dialog.setNegativeButton('Cancel')
dialog.setPositiveButton(function() {
    preferences.setBoolean(dialog, 'Links', placedCheck.value)
    preferences.setBoolean(dialog, 'Non-Native Arts', nonNativeCheck.value)
    preferences.setBoolean(dialog, 'Images', rasterCheck.value)
    preferences.setBoolean(dialog, 'Plugins', pluginCheck.value)
    preferences.setBoolean(dialog, 'Paths', pathCheck.value)
    preferences.setBoolean(dialog, 'Compound Paths', compoundPathCheck.value)
    preferences.setBoolean(dialog, 'Text Frames', textFrameCheck.value)
    preferences.setBoolean(dialog, 'Legacy Texts', legacyTextCheck.value)
    preferences.setBoolean(dialog, 'Symbols', symbolCheck.value)
    preferences.setBoolean(dialog, 'Meshes', meshCheck.value)
    preferences.setBoolean(dialog, 'Graphs', graphCheck.value)

    var types = []
    if (compoundPathCheck.value) types.push('CompoundPathItem')
    if (graphCheck.value) types.push('GraphItem')
    if (legacyTextCheck.value) types.push('LegacyTextItem')
    if (meshCheck.value) types.push('MeshItem')
    if (nonNativeCheck.value) types.push('NonNativeItem')
    if (pathCheck.value) types.push('PathItem')
    if (placedCheck.value) types.push('PlacedItem')
    if (pluginCheck.value) types.push('PluginItem')
    if (rasterCheck.value) types.push('RasterItem')
    if (symbolCheck.value) types.push('SymbolItem')
    if (textFrameCheck.value) types.push('TextFrame')
    selectAll(types)
})
dialog.show()