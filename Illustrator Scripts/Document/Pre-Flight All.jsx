// Iterate through document to check for its quality.

#target Illustrator
#include '../.lib/commons.js'

var allOkay = true
for (var i = 0; i < app.documents.length; i++) {
    var document = app.documents[i]
    var message = 'Issues found in ' + document.name + ':'
    if (document.documentColorSpace !== DocumentColorSpace.CMYK) {
        message += '\nColor space is ' + document.documentColorSpace.toString().substringAfter('.') + '.'
    }
    if (document.rasterEffectSettings.colorModel !== RasterizationColorModel.DEFAULTCOLORMODEL) {
        message += '\nColor model is ' + document.rasterEffectSettings.colorModel.toString().substringAfter('.') + '.'
    }
    if (document.rasterEffectSettings.resolution < 300) {
        message += '\nResolution is ' + document.rasterEffectSettings.resolution + '.'
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