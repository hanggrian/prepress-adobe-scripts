// Select all items with multiple allowed types.
// When there are active selection, will only select items within those selection.

#target Illustrator
#include "../.lib/commons.js"

check(Collections.isNotEmpty(document.pageItems), "No items in this document")
var isFilterMode = Collections.isNotEmpty(selection)

var dialog = new Dialog(R.string.select_all, "selecting-items/#select-all")
var groupCheck, clippingMaskCheck
var pathCheck, compoundPathCheck
var textFrameCheck, legacyTextCheck
var placedCheck, nonNativeCheck, rasterCheck, pluginCheck
var symbolCheck, meshCheck, graphCheck
var recursiveCheck
var config = configs.resolve("select/all")

dialog.hgroup(function(main) {
  main.alignChildren = "fill"
  main.vgroup(function(topGroup) {
    topGroup.alignChildren = "fill"
    topGroup.vpanel(R.string.groups, function(panel) {
      panel.alignChildren = "fill"
      groupCheck = panel.checkBox(undefined, R.string.groups).also(function(it) {
        it.value = config.getBoolean("group")
      })
      clippingMaskCheck = panel.checkBox(undefined, R.string.clipping_masks).also(function(it) {
        it.value = config.getBoolean("group2")
      })
    })
    topGroup.vpanel(getPlural(R.plurals.path, 2), function(panel) {
      panel.alignChildren = "fill"
      pathCheck = panel.checkBox(undefined, getPlural(R.plurals.path, 2)).also(function(it) {
        it.value = config.getBoolean("path")
      })
      compoundPathCheck = panel.checkBox(undefined, getPlural(R.plurals.compound_path, 2)).also(function(it) {
        it.value = config.getBoolean("compound_path")
      })
    })
    topGroup.vpanel(getPlural(R.plurals.text, 2), function(panel) {
      panel.alignChildren = "fill"
      textFrameCheck = panel.checkBox(undefined, getPlural(R.plurals.text, 2)).also(function(it) {
        it.value = config.getBoolean("text")
      })
      legacyTextCheck = panel.checkBox(undefined, getPlural(R.plurals.legacy_text, 2)).also(function(it) {
        it.value = config.getBoolean("legacy_text")
      })
    })
  })
  main.vgroup(function(topGroup) {
    topGroup.alignChildren = "fill"
    topGroup.vpanel(R.string.imports, function(panel) {
      panel.alignChildren = "fill"
      placedCheck = panel.checkBox(undefined, getPlural(R.plurals.link, 2)).also(function(it) {
        it.value = config.getBoolean("placed")
      })
      nonNativeCheck = panel.checkBox(undefined, getPlural(R.plurals.non_native, 2)).also(function(it) {
        it.value = config.getBoolean("nonnative")
      })
      rasterCheck = panel.checkBox(undefined, getPlural(R.plurals.raster, 2)).also(function(it) {
        it.value = config.getBoolean("raster")
      })
      pluginCheck = panel.checkBox(undefined, getPlural(R.plurals.plugin, 2)).also(function(it) {
        it.value = config.getBoolean("plugin")
      })
    })
    topGroup.vpanel(R.string.others, function(panel) {
      panel.alignChildren = "fill"
      symbolCheck = panel.checkBox(undefined, getPlural(R.plurals.symbol, 2)).also(function(it) {
        it.value = config.getBoolean("symbol")
      })
      meshCheck = panel.checkBox(undefined, getPlural(R.plurals.mesh, 2)).also(function(it) {
        it.value = config.getBoolean("mesh")
      })
      graphCheck = panel.checkBox(undefined, getPlural(R.plurals.graph, 2)).also(function(it) {
        it.value = config.getBoolean("graph")
      })
    })
    if (isFilterMode) {
      recursiveCheck = new RecursiveCheck(topGroup).also(function(it) {
        it.alignment = "right"
        it.value = config.getBoolean("recursive")
      })
    }
  })
})
dialog.setCancelButton()
dialog.setDefaultButton(undefined, function() {
  var types = []
  if (compoundPathCheck.value) types.push("CompoundPathItem")
  if (graphCheck.value) types.push("GraphItem")
  if (groupCheck.value || clippingMaskCheck.value) types.push("GroupItem")
  if (legacyTextCheck.value) types.push("LegacyTextItem")
  if (meshCheck.value) types.push("MeshItem")
  if (nonNativeCheck.value) types.push("NonNativeItem")
  if (pathCheck.value) types.push("PathItem")
  if (placedCheck.value) types.push("PlacedItem")
  if (pluginCheck.value) types.push("PluginItem")
  if (rasterCheck.value) types.push("RasterItem")
  if (symbolCheck.value) types.push("SymbolItem")
  if (textFrameCheck.value) types.push("TextFrame")
  selectAll(types, function(item) {
    if (item.typename === "GroupItem") {
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

  config.setBoolean("compound_path", compoundPathCheck.value)
  config.setBoolean("graph", graphCheck.value)
  config.setBoolean("group", groupCheck.value)
  config.setBoolean("group2", clippingMaskCheck.value)
  config.setBoolean("legacy_text", legacyTextCheck.value)
  config.setBoolean("mesh", meshCheck.value)
  config.setBoolean("nonnative", nonNativeCheck.value)
  config.setBoolean("path", pathCheck.value)
  config.setBoolean("placed", placedCheck.value)
  config.setBoolean("plugin", pluginCheck.value)
  config.setBoolean("raster", rasterCheck.value)
  config.setBoolean("symbol", symbolCheck.value)
  config.setBoolean("text", textFrameCheck.value)
  if (isFilterMode) config.setBoolean("recursive", recursiveCheck.value)
})
dialog.show()
