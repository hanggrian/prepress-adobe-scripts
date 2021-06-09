// Quality check all tabs.

#target Illustrator
#include '../.lib/commons.js'

var allOkay = true
for (var i = 0; i < app.documents.length; i++) {
    var document = app.documents[i]
    var rasterSettings = document.rasterEffectSettings

    var message = 'Issues found in ' + document.name + ':'
    if (document.documentColorSpace !== DocumentColorSpace.CMYK) {
        message += '\n• Color space is ' + document.documentColorSpace.toString().substringAfter('.') + '.'
    }
    if (rasterSettings.colorModel !== RasterizationColorModel.DEFAULTCOLORMODEL) {
        message += '\n• Color model is ' + document.rasterEffectSettings.colorModel.toString().substringAfter('.') + '.'
    }
    if (rasterSettings.resolution < 300) {
        message += '\n• Resolution is ' + document.rasterEffectSettings.resolution + '.'
    }

    if (message.includes('\n')) {
        allOkay = false
        document.activate()
        alert(message, 'Pre-Flight', true)
    }
}
if (allOkay) {
    alert('No issues found in all documents.', 'Pre-Flight')
}