// Quality check all tabs.

#target Illustrator
#include '../.lib/commons.js'

var allOkay = true
for (var i = 0; i < app.documents.length; i++) {
  var document = app.documents[i]
  var errorCount = 0
  var result = 'Issues found in {0}:\n'.format(document.name)

  document.documentColorSpace.let(function(it) {
    if (it !== DocumentColorSpace.CMYK) {
      errorCount++
      result += '• Color space is {0}.\n'.format(it.toString().substringAfter('.'))
    }
  })
  document.rasterEffectSettings.let(function(it) {
    if (it.colorModel !== RasterizationColorModel.DEFAULTCOLORMODEL) {
      errorCount++
      result += '• Color model is {0}.\n'.format(it.colorModel.toString().substringAfter('.'))
    }
    if (it.resolution < 300) {
      errorCount++
      result += '• Resolution is {0}.\n'.format(it.resolution)
    }
  })
  document.rulerUnits.let(function(it) {
    if (it !== RulerUnits.Inches && it !== RulerUnits.Centimeters && it !== RulerUnits.Millimeters) {
      errorCount++
      result += '• Unusual ruler units {0}.\n'.format(it.toString().substringAfter('.'))
    }
  })

  if (errorCount > 0) {
    allOkay = false
    document.activate()
    alert(result.trim(), 'Pre-Flight', true)
  }
}
if (allOkay) {
  alert('No issues found in all documents.', 'Pre-Flight')
}
