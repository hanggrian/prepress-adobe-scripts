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

var message = 'There are ' + selection.length + ' items, containing:'
append(compoundPathCount, 'compound path')
append(graphCount, 'graph')
append(legacyTextCount, 'legacy text')
append(meshCount, 'mesh')
append(nonNativeCount, 'non-native')
append(pathCount, 'path')
append(placedCount, 'link')
append(pluginCount, 'plugin')
append(rasterCount, 'raster')
append(symbolCount, 'symbol')
append(textFrameCount, 'text frame')
alert(message, 'Count Objects')

function append(count, suffix) {
    if (count === 0) {
        return
    }
    message += '\n' + count + ' ' + suffix
    if (count > 1) {
        message += message.endsWith('sh') ? 'es' : 's'
    }
    message += '.'
}