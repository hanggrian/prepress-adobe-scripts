/*
<javascriptresource>
<name>Pre-Flight Documents</name>
<category>4</category>
<enableinfo>true</enableinfo>
</javascriptresource>
*/

// Quality check all tabs.

#target Photoshop
#include '../.lib/commons.js'

var allOkay = true
for (var i = 0; i < app.documents.length; i++) {
  var document = app.documents[i]
  var errorCount = 0
  var result = 'Issues found in {0}:\n'.format(document.name)

  document.mode.let(function(it) {
    if (it !== DocumentMode.CMYK) {
      errorCount++
      result += '• Mode is {0}.\n'.format(it.toString().substringAfter('.'))
    }
  })
  document.resolution.let(function(it) {
    if (it < 300) {
      errorCount++
      result += '• Resolution is {0}.\n'.format(it)
    }
  })
  document.bitsPerChannel.let(function(it) {
    if (it !== BitsPerChannelType.EIGHT) {
      errorCount++
      result += '• Bits per channel is {0}.\n'.format(it.toString().substringAfter('.'))
    }
  })

  if (errorCount > 0) {
    allOkay = false
    app.activeDocument = document
    alert(sb.trim(), 'Pre-Flight', true)
  }
}
if (allOkay) {
  alert('No issues found in all documents.', 'Pre-Flight')
}