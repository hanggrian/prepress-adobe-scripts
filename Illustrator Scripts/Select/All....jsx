// Select all items with multiple allowed types.
// When there are active selection, will only select items within those selection.

//@target illustrator
//@include '../.lib/commons.js'

check(Collections.isNotEmpty(document.pageItems),
  getString(R.string.error_notypes_document, R.string.anything))
var isFilterMode = Collections.isNotEmpty(selection)

var dialog = new Dialog(R.string.select_all, 'selecting-items/#select-all')
var groupCheck, clippingMaskCheck
var pathCheck, compoundPathCheck
var textFrameCheck, legacyTextCheck
var placedCheck, nonNativeCheck, rasterCheck, pluginCheck
var symbolCheck, meshCheck, graphCheck
var recursiveCheck
var prefs = preferences2.resolve('select/all')

dialog.vgroup(function(main) {
  main.hgroup(function(rootPane) {
    rootPane.alignChildren = 'fill'
    rootPane.vgroup(function(leftPane) {
      leftPane.alignChildren = 'fill'
      leftPane.hpanel(R.plurals.group.plural, function(panel) {
        panel.vgroup(function(checkGroup) {
          checkGroup.alignChildren = 'fill'
          groupCheck = checkGroup.checkBox(undefined, R.plurals.group.plural).also(function(it) {
            it.value = prefs.getBoolean('group')
          })
          clippingMaskCheck = checkGroup.checkBox(undefined, R.plurals.clipping_mask.plural)
            .also(function(it) {
              it.value = prefs.getBoolean('group2')
            })
        })
        panel.vgroup(function(imageGroup) {
          imageGroup.alignment = 'top'
          tiedImage(imageGroup, 'ic_item_group', groupCheck)
          tiedImage(imageGroup, 'ic_item_clippingMask', clippingMaskCheck)
        })
      })
      leftPane.hpanel(R.plurals.path.plural, function(panel) {
        panel.vgroup(function(checkGroup) {
          checkGroup.alignChildren = 'fill'
          pathCheck = checkGroup.checkBox(undefined, R.plurals.path.plural).also(function(it) {
            it.value = prefs.getBoolean('path')
          })
          compoundPathCheck = checkGroup.checkBox(undefined, R.plurals.compound_path.plural)
            .also(function(it) {
              it.value = prefs.getBoolean('compound_path')
            })
        })
        panel.vgroup(function(imageGroup) {
          imageGroup.alignment = 'top'
          tiedImage(imageGroup, 'ic_item_path', pathCheck)
          tiedImage(imageGroup, 'ic_item_compoundpath', compoundPathCheck)
        })
      })
      leftPane.hpanel(R.plurals.text.plural, function(panel) {
        panel.vgroup(function(checkGroup) {
          checkGroup.alignChildren = 'fill'
          textFrameCheck = checkGroup.checkBox(undefined, R.plurals.text.plural).also(function(it) {
            it.value = prefs.getBoolean('text')
          })
          legacyTextCheck = checkGroup.checkBox(undefined, R.plurals.legacy_text.plural)
            .also(function(it) {
              it.value = prefs.getBoolean('legacy_text')
            })
        })
        panel.vgroup(function(imageGroup) {
          imageGroup.alignment = 'top'
          tiedImage(imageGroup, 'ic_item_text', textFrameCheck)
          tiedImage(imageGroup, 'ic_item_legacytext', legacyTextCheck)
        })
      })
    })
    rootPane.vgroup(function(rightPane) {
      rightPane.alignChildren = 'fill'
      rightPane.hpanel(R.string.imports, function(panel) {
        panel.vgroup(function(checkGroup) {
          checkGroup.alignChildren = 'fill'
          placedCheck = checkGroup.checkBox(undefined, R.plurals.link.plural).also(function(it) {
            it.value = prefs.getBoolean('placed')
          })
          nonNativeCheck = checkGroup.checkBox(undefined, R.plurals.nonnative.plural)
            .also(function(it) {
              it.value = prefs.getBoolean('nonnative')
            })
          rasterCheck = checkGroup.checkBox(undefined, R.plurals.raster.plural).also(function(it) {
            it.value = prefs.getBoolean('raster')
          })
          pluginCheck = checkGroup.checkBox(undefined, R.plurals.plugin.plural).also(function(it) {
            it.value = prefs.getBoolean('plugin')
          })
        })
        panel.vgroup(function(imageGroup) {
          imageGroup.alignment = 'top'
          tiedImage(imageGroup, 'ic_item_placed', placedCheck)
          tiedImage(imageGroup, 'ic_item_nonnative', nonNativeCheck)
          tiedImage(imageGroup, 'ic_item_raster', rasterCheck)
          tiedImage(imageGroup, 'ic_item_plugin', pluginCheck)
        })
      })
      rightPane.hpanel(R.string.others, function(panel) {
        panel.vgroup(function(checkGroup) {
          checkGroup.alignChildren = 'fill'
          symbolCheck = checkGroup.checkBox(undefined, R.plurals.symbol.plural).also(function(it) {
            it.value = prefs.getBoolean('symbol')
          })
          meshCheck = checkGroup.checkBox(undefined, R.plurals.mesh.plural).also(function(it) {
            it.value = prefs.getBoolean('mesh')
          })
          graphCheck = checkGroup.checkBox(undefined, R.plurals.graph.plural).also(function(it) {
            it.value = prefs.getBoolean('graph')
          })
        })
        panel.vgroup(function(imageGroup) {
          imageGroup.alignment = 'top'
          tiedImage(imageGroup, 'ic_item_symbol', symbolCheck)
          tiedImage(imageGroup, 'ic_item_mesh', meshCheck)
          tiedImage(imageGroup, 'ic_item_graph', graphCheck)
        })
      })
    })
  })
  if (isFilterMode) {
    recursiveCheck = new RecursiveCheck(main).also(function(it) {
      it.alignment = 'right'
      it.value = prefs.getBoolean('recursive')
    })
  }
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

function tiedImage(parent, src, check) {
  var image = parent.image(undefined, src)
  image.addEventListener('click', function() {
    check.value = !check.value
  })
}
