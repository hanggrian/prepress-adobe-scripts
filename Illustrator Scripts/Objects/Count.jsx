// Sum up all items recursively.

#target Illustrator
#include '../.lib/commons.js'

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

selection.forEachItem(function(it) {
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
            textFrameCount++
            break;
    }
})

var message = 'There are {0} items, containing:'.format(selection.length)
message += getItemLine(compoundPathCount, 'compound path')
message += getItemLine(graphCount, 'graph')
message += getItemLine(legacyTextCount, 'legacy text')
message += getItemLine(meshCount, 'mesh')
message += getItemLine(nonNativeCount, 'non-native')
message += getItemLine(pathCount, 'path')
message += getItemLine(placedCount, 'link')
message += getItemLine(pluginCount, 'plugin')
message += getItemLine(rasterCount, 'raster')
message += getItemLine(symbolCount, 'symbol')
message += getItemLine(textFrameCount, 'text frame')
alert(message, 'Count Objects')

function getItemLine(count, suffix) {
    if (count === 0) {
        return ''
    }
    var line = '\n• ' + count + ' ' + suffix
    if (count > 1) {
        line += suffix.endsWith('sh') ? 'es' : 's'
    }
    return line
}