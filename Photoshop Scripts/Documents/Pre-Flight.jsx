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
  var result = "Issues found in %s:\n".format(document.name)

  document.mode.let(function(it) {
    if (it !== DocumentMode.CMYK) {
      errorCount++
      result += "Mode is %s.\n".format(it.toString().substringAfter("."))
    }
  })
  document.resolution.let(function(it) {
    if (it < 300) {
      errorCount++
      result += "Resolution is %s.\n".format(it)
    }
  })
  document.bitsPerChannel.let(function(it) {
    if (it !== BitsPerChannelType.EIGHT) {
      errorCount++
      result += "Bits per channel is %s.\n".format(it.toString().substringAfter("."))
    }
  })

  if (errorCount > 0) {
    allOkay = false
    app.activeDocument = document
    alert(result.trim(), "Pre-Flight", true)
  }
})
if (allOkay) {
  alert("No issues found in all documents.", "Pre-Flight")
}
