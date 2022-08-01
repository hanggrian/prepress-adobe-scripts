// Select all items with multiple allowed types.
// When there are active selection, will only select items within those selection.

#target Illustrator
#include '../.lib/commons.js'

var dialog = new Dialog('Select All', 'selecting-items#select-all-f2')
var placedCheck, nonNativeCheck, rasterCheck, pluginCheck
var pathCheck, compoundPathCheck
var textFrameCheck, legacyTextCheck
var symbolCheck, meshCheck, graphCheck
var prefs = preferences2.resolve('select/all')

dialog.hgroup(function(main) {
  main.alignChildren = 'fill'
  main.vgroup(function(group) {
    group.alignChildren = 'fill'
    group.vpanel('Imports', function(panel) {
      panel.alignChildren = 'fill'
      placedCheck = panel.checkBox(undefined, 'Links').also(function(it) {
        it.value = prefs.getBoolean('placed')
      })
      nonNativeCheck = panel.checkBox(undefined, 'Non-Native Arts').also(function(it) {
        it.value = prefs.getBoolean('nonnative')
      })
      rasterCheck = panel.checkBox(undefined, 'Images').also(function(it) {
        it.value = prefs.getBoolean('raster')
      })
      pluginCheck = panel.checkBox(undefined, 'Plugins').also(function(it) {
        it.value = prefs.getBoolean('plugin')
      })
    })
    group.vpanel('Types', function(panel) {
      panel.alignChildren = 'fill'
      textFrameCheck = panel.checkBox(undefined, 'Text Frames').also(function(it) {
        it.value = prefs.getBoolean('text_frame')
      })
      legacyTextCheck = panel.checkBox(undefined, 'Legacy Texts').also(function(it) {
        it.value = prefs.getBoolean('legacy_text')
      })
    })
  })
  main.vgroup(function(group) {
    group.alignChildren = 'fill'
    group.vpanel('Paths', function(panel) {
      panel.alignChildren = 'fill'
      pathCheck = panel.checkBox(undefined, 'Paths').also(function(it) {
        it.value = prefs.getBoolean('path')
      })
      compoundPathCheck = panel.checkBox(undefined, 'Compound Paths').also(function(it) {
        it.value = prefs.getBoolean('compound_path')
      })
    })
    group.vpanel('Others', function(panel) {
      panel.alignChildren = 'fill'
      symbolCheck = panel.checkBox(undefined, 'Symbols').also(function(it) {
        it.value = prefs.getBoolean('symbol')
      })
      meshCheck = panel.checkBox(undefined, 'Meshes').also(function(it) {
        it.value = prefs.getBoolean('mesh')
      })
      graphCheck = panel.checkBox(undefined, 'Graphs').also(function(it) {
        it.value = prefs.getBoolean('graph')
      })
    })
  })
})
dialog.setCancelButton()
dialog.setDefaultButton(undefined, function() {
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

  prefs.setBoolean('placed', placedCheck.value)
  prefs.setBoolean('nonnative', nonNativeCheck.value)
  prefs.setBoolean('raster', rasterCheck.value)
  prefs.setBoolean('plugin', pluginCheck.value)
  prefs.setBoolean('path', pathCheck.value)
  prefs.setBoolean('compound_path', compoundPathCheck.value)
  prefs.setBoolean('text_frame', textFrameCheck.value)
  prefs.setBoolean('legacy_text', legacyTextCheck.value)
  prefs.setBoolean('symbol', symbolCheck.value)
  prefs.setBoolean('mesh', meshCheck.value)
  prefs.setBoolean('graph', graphCheck.value)
})
dialog.show()
