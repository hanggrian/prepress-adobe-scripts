// Sum up all items recursively.

#target Illustrator
#include "../.lib/commons.js"

checkHasSelection()

var compoundPathCount = 0
var graphCount = 0
var legacyTextCount = 0
var meshCount = 0
var nonNativeCount = 0
var pathCount = 0
var placedCount = 0
var pluginCount = 0
var rasterCount = 0
var symbolCount = 0
var textFrameCount = 0

Collections.forEachItem(selection, function(it) {
  switch (it.typename) {
    case "CompoundPathItem":
      compoundPathCount++
      break;
    case "GraphItem":
      graphCount++
      break;
    case "LegacyTextItem":
      legacyTextCount++
      break;
    case "MeshItem":
      meshCount++
      break;
    case "NonNativeItem":
      nonNativeCount++
      break;
    case "PathItem":
      pathCount++
      break;
    case "PlacedItem":
      placedCount++
      break;
    case "PluginItem":
      pluginCount++
      break;
    case "RasterItem":
      rasterCount++
      break;
    case "SymbolItem":
      symbolCount++
      break;
    case "TextFrame":
      textFrameCount++
      break;
  }
})

var message = "There are "
var prefix = ""

if (selection.length !== maxOf(compoundPathCount, graphCount, legacyTextCount, meshCount,
  nonNativeCount, pathCount, placedCount, pluginCount, rasterCount, symbolCount, textFrameCount)) {
  message += selection.length + " items, containing:"
  prefix = "\n"
}
message += getItemLine(prefix, compoundPathCount, "compound path")
message += getItemLine(prefix, graphCount, "graph")
message += getItemLine(prefix, legacyTextCount, "legacy text")
message += getItemLine(prefix, meshCount, "mesh")
message += getItemLine(prefix, nonNativeCount, "non-native")
message += getItemLine(prefix, pathCount, "path")
message += getItemLine(prefix, placedCount, "link")
message += getItemLine(prefix, pluginCount, "plugin")
message += getItemLine(prefix, rasterCount, "raster")
message += getItemLine(prefix, symbolCount, "symbol")
message += getItemLine(prefix, textFrameCount, "text frame")
alert(message, "Count Objects")

function getItemLine(prefix, count, suffix) {
  if (count === 0) {
    return ""
  }
  var line = "%s%d %s".format(prefix, count, suffix)
  if (count > 1) {
    line += suffix.endsWith("sh") ? "es" : "s"
  }
  return line + "."
}
