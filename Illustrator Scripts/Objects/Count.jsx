//@target illustrator
//@include '../.lib/commons.js'

checkAnySelection()

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
var textCount = 0

Collections.forEachItem(selection, function(it) {
  switch (it.typename) {
    case 'CompoundPathItem':
      compoundPathCount++
      break;
    case 'GraphItem':
      graphCount++
      break;
    case 'LegacyTextItem':
      legacyTextCount++
      break;
    case 'MeshItem':
      meshCount++
      break;
    case 'NonNativeItem':
      nonNativeCount++
      break;
    case 'PathItem':
      pathCount++
      break;
    case 'PlacedItem':
      placedCount++
      break;
    case 'PluginItem':
      pluginCount++
      break;
    case 'RasterItem':
      rasterCount++
      break;
    case 'SymbolItem':
      symbolCount++
      break;
    case 'TextFrame':
      textCount++
      break;
  }
})

var message = getString(R.string.message_count1)
var prefix = ''

if (!isSingleType()) {
  message += selection.length + getString(R.string.message_count2)
  prefix = '\n'
}
message += getItemLine(prefix, compoundPathCount, R.plurals.compound_path)
message += getItemLine(prefix, graphCount, R.plurals.graph)
message += getItemLine(prefix, legacyTextCount, R.plurals.legacy_text)
message += getItemLine(prefix, meshCount, R.plurals.mesh)
message += getItemLine(prefix, nonNativeCount, R.plurals.nonnative)
message += getItemLine(prefix, pathCount, R.plurals.path)
message += getItemLine(prefix, placedCount, R.plurals.link)
message += getItemLine(prefix, pluginCount, R.plurals.plugin)
message += getItemLine(prefix, rasterCount, R.plurals.raster)
message += getItemLine(prefix, symbolCount, R.plurals.symbol)
message += getItemLine(prefix, textCount, R.plurals.text)
alert(message, getString(R.string.count_objects))

function getItemLine(prefix, count, pluralId) {
  if (count === 0) {
    return ''
  }
  return '%s%d %s'.format(prefix, count, getPlural(pluralId, count))
}

function isSingleType() {
  var typeCount = 0
  Collections.forEach([
    compoundPathCount, graphCount, legacyTextCount,
    meshCount, nonNativeCount, pathCount, placedCount, pluginCount,
    rasterCount, symbolCount, textCount], function(it) {
    if (it > 0) {
      typeCount++
    }
  })
  return typeCount === 1
}
