// Quality check all tabs.

#target Illustrator
#include '../.lib/commons.js'

var allOkay = true
for (var i = 0; i < app.documents.length; i++) {
    var document = app.documents[i]
    var errorCount = 0
    var sb = new StringBuilder().appendLine('Issues found in ' + document.name + ':')

    var colorSpace = document.documentColorSpace
    if (colorSpace !== DocumentColorSpace.CMYK) {
        errorCount++
        sb.appendLine('• Color space is ' + colorSpace.toString().substringAfter('.') + '.')
    }
    var rasterSettings = document.rasterEffectSettings
    if (rasterSettings.colorModel !== RasterizationColorModel.DEFAULTCOLORMODEL) {
        errorCount++
        sb.appendLine('• Color model is ' + rasterSettings.colorModel.toString().substringAfter('.') + '.')
    }
    if (rasterSettings.resolution < 300) {
        errorCount++
        sb.appendLine('• Resolution is ' + rasterSettings.resolution + '.')
    }
    var rulerUnits = document.rulerUnits
    if (rulerUnits !== RulerUnits.Inches && rulerUnits !== RulerUnits.Centimeters && rulerUnits !== RulerUnits.Millimeters) {
        errorCount++
        sb.appendLine('• Unusual ruler units ' + rulerUnits.toString().substringAfter('.') + '.')
    }

    if (errorCount > 0) {
        allOkay = false
        document.activate()
        alert(sb.toString().trim(), 'Pre-Flight', true)
    }
}
if (allOkay) {
    alert('No issues found in all documents.', 'Pre-Flight')
}