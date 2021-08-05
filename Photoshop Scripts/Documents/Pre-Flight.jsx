/*
<javascriptresource>
<name>Pre-Flight</name>
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
    var sb = new StringBuilder().appendLine('Issues found in ' + document.name + ':')

    var mode = document.mode
    if (mode !== DocumentMode.CMYK) {
        errorCount++
        sb.appendLine('• Mode is ' + mode.toString().substringAfter('.') + '.')
    }
    var resolution = document.resolution
    if (resolution < 300) {
        errorCount++
        sb.appendLine('• Resolution is ' + resolution + '.')
    }
    var bitsPerChannel = document.bitsPerChannel
    if (bitsPerChannel !== BitsPerChannelType.EIGHT) {
        errorCount++
        sb.appendLine('• Bits per channel is ' + bitsPerChannel.toString().substringAfter('.') + '.')
    }

    if (errorCount > 0) {
        allOkay = false
        app.activeDocument = document
        alert(sb.toString().trim(), 'Pre-Flight', true)
    }
}
if (allOkay) {
    alert('No issues found in all documents.', 'Pre-Flight')
}