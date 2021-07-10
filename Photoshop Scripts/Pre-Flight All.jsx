/*
<javascriptresource>
<category>2</category>
<enableinfo>true</enableinfo>
</javascriptresource>
*/

// Quality check all tabs.

#target Photoshop
#include '.lib/commons.js'

var allOkay = true
for (var i = 0; i < app.documents.length; i++) {
    var document = app.documents[i]
    var message = 'Issues found in ' + document.name + ':'

    var mode = document.mode
    if (mode !== DocumentMode.CMYK) {
        message += '\n• Mode is ' + mode.toString().substringAfter('.') + '.'
    }
    var resolution = document.resolution
    if (resolution < 300) {
        message += '\n• Resolution is ' + resolution + '.'
    }
    var bitsPerChannel = document.bitsPerChannel
    if (bitsPerChannel !== BitsPerChannelType.EIGHT) {
        message += '\n• Bits per channel is ' + bitsPerChannel.toString().substringAfter('.') + '.'
    }

    if (message.includes('\n')) {
        allOkay = false
        app.activeDocument = document
        alert(message, 'Pre-Flight', true)
    }
}
if (allOkay) {
    alert('No issues found in all documents.', 'Pre-Flight All')
}