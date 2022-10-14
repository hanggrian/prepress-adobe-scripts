// Select all items with multiple allowed types.
// When there are active selection, will only select items within those selection.

#target illustrator
#include '../.lib/commons.js'

check(Collections.isNotEmpty(document.pageItems), getString(R.string.error_notypes_document))
var isFilterMode = Collections.isNotEmpty(selection)

var dialog = new Dialog(R.string.select_all, 'selecting-items/#select-all')
var groupCheck, clippingMaskCheck
var pathCheck, compoundPathCheck
var textFrameCheck, legacyTextCheck
var placedCheck, nonNativeCheck, rasterCheck, pluginCheck
var symbolCheck, meshCheck, graphCheck
var recursiveCheck
var prefs = preferences2.resolve('select/all')

dialog.hgroup(function(main) {
  main.alignChildren = 'fill'
  main.vgroup(function(topGroup) {
    topGroup.alignChildren = 'fill'
    topGroup.vpanel(R.plurals.group.plural, function(panel) {
      panel.alignChildren = 'fill'
      groupCheck = panel.checkBox(undefined, R.plurals.group.plural).also(function(it) {
        it.value = prefs.getBoolean('group')
      })
      clippingMaskCheck = panel.checkBox(undefined, R.plurals.clipping_mask.plural)
        .also(function(it) {
          it.value = prefs.getBoolean('group2')
        })
    })
    topGroup.vpanel(R.plurals.path.plural, function(panel) {
      panel.alignChildren = 'fill'
      pathCheck = panel.checkBox(undefined, R.plurals.path.plural).also(function(it) {
        it.value = prefs.getBoolean('path')
      })
      compoundPathCheck = panel.checkBox(undefined, R.plurals.compound_path.plural)
        .also(function(it) {
          it.value = prefs.getBoolean('compound_path')
        })
    })
    topGroup.vpanel(R.plurals.text.plural, function(panel) {
      panel.alignChildren = 'fill'
      textFrameCheck = panel.checkBox(undefined, R.plurals.text.plural).also(function(it) {
        it.value = prefs.getBoolean('text')
      })
      legacyTextCheck = panel.checkBox(undefined, R.plurals.legacy_text.plural).also(function(it) {
        it.value = prefs.getBoolean('legacy_text')
      })
    })
  })
  main.vgroup(function(topGroup) {
    topGroup.alignChildren = 'fill'
    topGroup.vpanel(R.string.imports, function(panel) {
      panel.alignChildren = 'fill'
      placedCheck = panel.checkBox(undefined, R.plurals.link.plural).also(function(it) {
        it.value = prefs.getBoolean('placed')
      })
      nonNativeCheck = panel.checkBox(undefined, R.plurals.nonnative.plural).also(function(it) {
        it.value = prefs.getBoolean('nonnative')
      })
      rasterCheck = panel.checkBox(undefined, R.plurals.raster.plural).also(function(it) {
        it.value = prefs.getBoolean('raster')
      })
      pluginCheck = panel.checkBox(undefined, R.plurals.plugin.plural).also(function(it) {
        it.value = prefs.getBoolean('plugin')
      })
    })
    topGroup.vpanel(R.string.others, function(panel) {
      panel.alignChildren = 'fill'
      symbolCheck = panel.checkBox(undefined, R.plurals.symbol.plural).also(function(it) {
        it.value = prefs.getBoolean('symbol')
      })
      meshCheck = panel.checkBox(undefined, R.plurals.mesh.plural).also(function(it) {
        it.value = prefs.getBoolean('mesh')
      })
      graphCheck = panel.checkBox(undefined, R.plurals.graph.plural).also(function(it) {
        it.value = prefs.getBoolean('graph')
      })
    })
    if (isFilterMode) {
      recursiveCheck = new RecursiveCheck(topGroup).also(function(it) {
        it.alignment = 'right'
        it.value = prefs.getBoolean('recursive')
      })
    }
  })
})
dialog.setCancelButton()
dialog.setDefaultButton(undefined, function() {
  var types = []
  if (compoundPathCheck.value) types.push('CompoundPathItem')
  if (graphCheck.value) types.push('GraphItem')
  if (groupCheck.value || clippingMaskCheck.value) types.push('GroupItem')
  if (legacyTextCheck.value) types.push('LegacyTextItem')
  if (meshCheck.value) types.push('MeshItem')
  if (nonNativeCheck.value) types.push('NonNativeItem')
  if (pathCheck.value) types.push('PathItem')
  if (placedCheck.value) types.push('PlacedItem')
  if (pluginCheck.value) types.push('PluginItem')
  if (rasterCheck.value) types.push('RasterItem')
  if (symbolCheck.value) types.push('SymbolItem')
  if (textFrameCheck.value) types.push('TextFrame')
  selectAll(types, function(item) {
    if (item.typename === 'GroupItem') {
      if (groupCheck.value && !item.clipped) {
        return true
      }
      if (clippingMaskCheck.value && item.clipped) {
        return true
      }
      return false
    }
    return true
  }, isFilterMode && recursiveCheck.value)

  prefs.setBoolean('compound_path', compoundPathCheck.value)
  prefs.setBoolean('graph', graphCheck.value)
  prefs.setBoolean('group', groupCheck.value)
  prefs.setBoolean('group2', clippingMaskCheck.value)
  prefs.setBoolean('legacy_text', legacyTextCheck.value)
  prefs.setBoolean('mesh', meshCheck.value)
  prefs.setBoolean('nonnative', nonNativeCheck.value)
  prefs.setBoolean('path', pathCheck.value)
  prefs.setBoolean('placed', placedCheck.value)
  prefs.setBoolean('plugin', pluginCheck.value)
  prefs.setBoolean('raster', rasterCheck.value)
  prefs.setBoolean('symbol', symbolCheck.value)
  prefs.setBoolean('text', textFrameCheck.value)
  if (isFilterMode) prefs.setBoolean('recursive', recursiveCheck.value)
})
dialog.show()
