// Select all items with multiple allowed types.
// When there are active selection, will only select items within those selection.

#target Illustrator
#include '../.lib/commons.js'

var dialog = new Dialog('Select All', 'selecting-items#select-all-f2')
var placedCheck, nonNativeCheck, rasterCheck, pluginCheck
var pathCheck, compoundPathCheck
var textFrameCheck, legacyTextCheck
var symbolCheck, meshCheck, graphCheck

dialog.hgroup(function(main) {
    main.alignChildren = 'fill'
    main.vgroup(function(group) {
        group.alignChildren = 'fill'
        group.vpanel('Imports', function(panel) {
            panel.alignChildren = 'fill'
            placedCheck = panel.checkBox(undefined, 'Links').also(function(it) {
                it.value = preferences.getBoolean('Links', dialog)
            })
            nonNativeCheck = panel.checkBox(undefined, 'Non-Native Arts').also(function(it) {
                it.value = preferences.getBoolean('Non-Native Arts', dialog)
            })
            rasterCheck = panel.checkBox(undefined, 'Images').also(function(it) {
                it.value = preferences.getBoolean('Images', dialog)
            })
            pluginCheck = panel.checkBox(undefined, 'Plugins').also(function(it) {
                it.value = preferences.getBoolean('Plugins', dialog)
            })
        })
        group.vpanel('Types', function(panel) {
            panel.alignChildren = 'fill'
            textFrameCheck = panel.checkBox(undefined, 'Text Frames').also(function(it) {
                it.value = preferences.getBoolean('Text Frames', dialog)
            })
            legacyTextCheck = panel.checkBox(undefined, 'Legacy Texts').also(function(it) {
                it.value = preferences.getBoolean('Legacy Texts', dialog)
            })
        })
    })
    main.vgroup(function(group) {
        group.alignChildren = 'fill'
        group.vpanel('Paths', function(panel) {
            panel.alignChildren = 'fill'
            pathCheck = panel.checkBox(undefined, 'Paths').also(function(it) {
                it.value = preferences.getBoolean('Paths', dialog)
            })
            compoundPathCheck = panel.checkBox(undefined, 'Compound Paths').also(function(it) {
                it.value = preferences.getBoolean('Compound Paths', dialog)
            })
        })
        group.vpanel('Others', function(panel) {
            panel.alignChildren = 'fill'
            symbolCheck = panel.checkBox(undefined, 'Symbols').also(function(it) {
                it.value = preferences.getBoolean('Symbols', dialog)
            })
            meshCheck = panel.checkBox(undefined, 'Meshes').also(function(it) {
                it.value = preferences.getBoolean('Meshes', dialog)
            })
            graphCheck = panel.checkBox(undefined, 'Graphs').also(function(it) {
                it.value = preferences.getBoolean('Graphs', dialog)
            })
        })
    })
})
dialog.setCancelButton()
dialog.setDefaultButton(undefined, function() {
    preferences.setBoolean('Links', placedCheck.value, dialog)
    preferences.setBoolean('Non-Native Arts', nonNativeCheck.value, dialog)
    preferences.setBoolean('Images', rasterCheck.value, dialog)
    preferences.setBoolean('Plugins', pluginCheck.value, dialog)
    preferences.setBoolean('Paths', pathCheck.value, dialog)
    preferences.setBoolean('Compound Paths', compoundPathCheck.value, dialog)
    preferences.setBoolean('Text Frames', textFrameCheck.value, dialog)
    preferences.setBoolean('Legacy Texts', legacyTextCheck.value, dialog)
    preferences.setBoolean('Symbols', symbolCheck.value, dialog)
    preferences.setBoolean('Meshes', meshCheck.value, dialog)
    preferences.setBoolean('Graphs', graphCheck.value, dialog)

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