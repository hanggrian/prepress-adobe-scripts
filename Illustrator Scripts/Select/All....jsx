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
        placedCheck = panel.checkBox(undefined, 'Linked File', function(it) {
            it.value = preferences.getBoolean(dialog, 'Linked File')
        })
        nonNativeCheck = panel.checkBox(undefined, 'Non-Native Art', function(it) {
            it.value = preferences.getBoolean(dialog, 'Non-Native Art')
        })
        rasterCheck = panel.checkBox(undefined, 'Image', function(it) {
            it.value = preferences.getBoolean(dialog, 'Image')
        })
        pluginCheck = panel.checkBox(undefined, 'Plugin', function(it) {
            it.value = preferences.getBoolean(dialog, 'Plugin')
        })
    })
    group.vpanel('Types', function(panel) {
        panel.alignChildren = 'fill'
        textFrameCheck = panel.checkBox(undefined, 'Text Frame', function(it) {
            it.value = preferences.getBoolean(dialog, 'Text Frame')
        })
        legacyTextCheck = panel.checkBox(undefined, 'Legacy Text', function(it) {
            it.value = preferences.getBoolean(dialog, 'Legacy Text')
        })
    })
})
dialog.vgroup(function(group) {
    group.alignChildren = 'fill'
    group.vpanel('Paths', function(panel) {
        panel.alignChildren = 'fill'
        pathCheck = panel.checkBox(undefined, 'Path', function(it) {
            it.value = preferences.getBoolean(dialog, 'Path')
        })
        compoundPathCheck = panel.checkBox(undefined, 'Compound Path', function(it) {
            it.value = preferences.getBoolean(dialog, 'Compound Path')
        })
    })
    group.vpanel('Others', function(panel) {
        panel.alignChildren = 'fill'
        symbolCheck = panel.checkBox(undefined, 'Symbol', function(it) {
            it.value = preferences.getBoolean(dialog, 'Symbol')
        })
        meshCheck = panel.checkBox(undefined, 'Mesh', function(it) {
            it.value = preferences.getBoolean(dialog, 'Mesh')
        })
        graphCheck = panel.checkBox(undefined, 'Graph', function(it) {
            it.value = preferences.getBoolean(dialog, 'Graph')
        })
    })
})

dialog.setNegativeButton('Cancel')
dialog.setPositiveButton(function() {
    preferences.setBoolean(dialog, 'Linked File', placedCheck.value)
    preferences.setBoolean(dialog, 'Non-Native Art', nonNativeCheck.value)
    preferences.setBoolean(dialog, 'Image', rasterCheck.value)
    preferences.setBoolean(dialog, 'Plugin', pluginCheck.value)
    preferences.setBoolean(dialog, 'Path', pathCheck.value)
    preferences.setBoolean(dialog, 'Compound Path', compoundPathCheck.value)
    preferences.setBoolean(dialog, 'Text Frame', textFrameCheck.value)
    preferences.setBoolean(dialog, 'Legacy Text', legacyTextCheck.value)
    preferences.setBoolean(dialog, 'Symbol', symbolCheck.value)
    preferences.setBoolean(dialog, 'Mesh', meshCheck.value)
    preferences.setBoolean(dialog, 'Graph', graphCheck.value)

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