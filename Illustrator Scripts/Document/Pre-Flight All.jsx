// Quality check all tabs.

#target Illustrator
#include '../.lib/commons.js'

var allOkay = true
for (var i = 0; i < app.documents.length; i++) {
    var document = app.documents[i]
    var message = 'Issues found in ' + document.name + ':'

    var colorSpace = document.documentColorSpace
    if (colorSpace !== DocumentColorSpace.CMYK) {
        message += '\n• Color space is ' + colorSpace.toString().substringAfter('.') + '.'
    }
    var rasterSettings = document.rasterEffectSettings
    if (rasterSettings.colorModel !== RasterizationColorModel.DEFAULTCOLORMODEL) {
        message += '\n• Color model is ' + rasterSettings.colorModel.toString().substringAfter('.') + '.'
    }
    if (rasterSettings.resolution < 300) {
        message += '\n• Resolution is ' + rasterSettings.resolution + '.'
    }
    var rulerUnits = document.rulerUnits
    if (rulerUnits !== RulerUnits.Inches && rulerUnits !== RulerUnits.Centimeters && rulerUnits !== RulerUnits.Millimeters) {
        message += '\n• Unusual ruler units ' + rulerUnits.toString().substringAfter('.') + '.'
    }

    if (message.includes('\n')) {
        allOkay = false
        document.activate()
        alert(message, 'Pre-Flight', true)
    }
}
if (allOkay) {
    alert('No issues found in all documents.', 'Pre-Flight All')
}