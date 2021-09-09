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

alert(buildString(function(it) {
    it.appendLine('There are ' + selection.length + ' items, containing:')
    appendCount(it, compoundPathCount, 'compound path')
    appendCount(it, graphCount, 'graph')
    appendCount(it, legacyTextCount, 'legacy text')
    appendCount(it, meshCount, 'mesh')
    appendCount(it, nonNativeCount, 'non-native')
    appendCount(it, pathCount, 'path')
    appendCount(it, placedCount, 'link')
    appendCount(it, pluginCount, 'plugin')
    appendCount(it, rasterCount, 'raster')
    appendCount(it, symbolCount, 'symbol')
    appendCount(it, textFrameCount, 'text frame')
}).trim(), 'Count Objects')

function appendCount(sb, count, suffix) {
    if (count === 0) {
        return
    }
    sb.append('• {0} {1}'.format(count, suffix))
    if (count > 1) {
        sb.append(suffix.endsWith('sh') ? 'es' : 's')
    }
    sb.appendLine('.')
}