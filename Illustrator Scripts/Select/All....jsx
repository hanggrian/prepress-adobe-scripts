// Select all items with multiple allowed types.
// When there are active selection, will only select items within those selection.

#target Illustrator
#include "../.lib/commons.js"

check(Collections.isNotEmpty(document.pageItems), "No items in this document")
var isFilterMode = Collections.isNotEmpty(selection)

var dialog = new Dialog("Select All", "selecting-items/#select-all")
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
    topGroup.vpanel("Groups", function(panel) {
      panel.alignChildren = "fill"
      groupCheck = panel.checkBox(undefined, "Groups").also(function(it) {
        it.value = config.getBoolean("group")
      })
      clippingMaskCheck = panel.checkBox(undefined, "Clipping Masks").also(function(it) {
        it.value = config.getBoolean("group2")
      })
    })
    topGroup.vpanel("Paths", function(panel) {
      panel.alignChildren = "fill"
      pathCheck = panel.checkBox(undefined, "Paths").also(function(it) {
        it.value = config.getBoolean("path")
      })
      compoundPathCheck = panel.checkBox(undefined, "Compound Paths").also(function(it) {
        it.value = config.getBoolean("compound_path")
      })
    })
    topGroup.vpanel("Types", function(panel) {
      panel.alignChildren = "fill"
      textFrameCheck = panel.checkBox(undefined, "Texts").also(function(it) {
        it.value = config.getBoolean("text_frame")
      })
      legacyTextCheck = panel.checkBox(undefined, "Legacy Texts").also(function(it) {
        it.value = config.getBoolean("legacy_text")
      })
    })
  })
  main.vgroup(function(topGroup) {
    topGroup.alignChildren = "fill"
    topGroup.vpanel("Imports", function(panel) {
      panel.alignChildren = "fill"
      placedCheck = panel.checkBox(undefined, "Links").also(function(it) {
        it.value = config.getBoolean("placed")
      })
      nonNativeCheck = panel.checkBox(undefined, "Non-Native Arts").also(function(it) {
        it.value = config.getBoolean("nonnative")
      })
      rasterCheck = panel.checkBox(undefined, "Images").also(function(it) {
        it.value = config.getBoolean("raster")
      })
      pluginCheck = panel.checkBox(undefined, "Plugins").also(function(it) {
        it.value = config.getBoolean("plugin")
      })
    })
    topGroup.vpanel("Others", function(panel) {
      panel.alignChildren = "fill"
      symbolCheck = panel.checkBox(undefined, "Symbols").also(function(it) {
        it.value = config.getBoolean("symbol")
      })
      meshCheck = panel.checkBox(undefined, "Meshes").also(function(it) {
        it.value = config.getBoolean("mesh")
      })
      graphCheck = panel.checkBox(undefined, "Graphs").also(function(it) {
        it.value = config.getBoolean("graph")
      })
    })
    if (isFilterMode) {
      recursiveCheck = new RecursiveCheck(topGroup).also(function(it) {
        it.main.alignment = "right"
        it.main.value = config.getBoolean("recursive")
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
  }, isFilterMode && recursiveCheck.isSelected())

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
  config.setBoolean("text_frame", textFrameCheck.value)
  if (isFilterMode) config.setBoolean("recursive", recursiveCheck.isSelected())
})
dialog.show()
