//@target illustrator
//@include '../.lib/commons.js'

var allOkay = true
Collections.forEach(app.documents, function(document) {
  var errorCount = 0
  var result = getString(R.string.message_preflight_issue, document.name)

  document.documentColorSpace.let(function(it) {
    if (it !== DocumentColorSpace.CMYK) {
      errorCount++
      result += getString(R.string.message_preflight_issue_colorspace,
        it.toString().substringAfter('.'))
    }
  })
  document.rasterEffectSettings.let(function(it) {
    if (it.colorModel !== RasterizationColorModel.DEFAULTCOLORMODEL) {
      errorCount++
      result += getString(R.string.message_preflight_issue_colormodel,
        it.colorModel.toString().substringAfter('.'))
    }
    if (it.resolution < 300) {
      errorCount++
      result += getString(R.string.message_preflight_issue_resolution, it.resolution)
    }
  })
  document.rulerUnits.let(function(it) {
    if (it !== RulerUnits.Inches && it !== RulerUnits.Centimeters && it !==
      RulerUnits.Millimeters) {
      errorCount++
      result += getString(R.string.message_preflight_issue_rulerunits,
        it.toString().substringAfter('.'))
    }
  })

  if (errorCount > 0) {
    allOkay = false
    document.activate()
    alert(result.trim(), getString(R.string.pre_flight), true) // don't use Windows.alert since not suffixed with period
  }
})
if (allOkay) {
  Windows.alert(R.string.message_preflight_allokay, R.string.pre_flight)
}
