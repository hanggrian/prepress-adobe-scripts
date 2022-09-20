/*
<javascriptresource>
<name>Pre-Flight Documents</name>
<category>4</category>
<enableinfo>true</enableinfo>
</javascriptresource>
*/

#target Photoshop
#include "../.lib/commons.js"

var allOkay = true
Collections.forEach(app.documents, function(document) {
  var errorCount = 0
  var result = getString(R.string.message_preflight_issue, document.name)

  document.mode.let(function(it) {
    if (it !== DocumentMode.CMYK) {
      errorCount++
      result += getString(R.string.message_preflight_issue_mode, it.toString().substringAfter("."))
    }
  })
  document.resolution.let(function(it) {
    if (it < 300) {
      errorCount++
      result += getString(R.string.message_preflight_issue_resolution, it)
    }
  })
  document.bitsPerChannel.let(function(it) {
    if (it !== BitsPerChannelType.EIGHT) {
      errorCount++
      result += getString(R.string.message_preflight_issue_bits, it.toString().substringAfter("."))
    }
  })

  if (errorCount > 0) {
    allOkay = false
    app.activeDocument = document
    alert(result.trim(), R.string.pre_flight, true)
  }
})
if (allOkay) {
  Windows.alert(R.string.message_preflight_allokay, R.string.pre_flight)
}
