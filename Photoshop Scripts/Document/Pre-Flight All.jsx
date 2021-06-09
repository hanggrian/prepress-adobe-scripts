/*
<javascriptresource>
<category>2</category>
</javascriptresource>
*/

// Quality check all tabs.

#target Illustrator
#include '../.lib/commons.js'

var allOkay = true
for (var i = 0; i < app.documents.length; i++) {
    var document = app.documents[i]

    var message = 'Issues found in ' + document.name + ':'
    if (document.mode !== DocumentMode.CMYK) {
        message += '\n• Mode is ' + document.mode.toString().substringAfter('.') + '.'
    }
    if (document.resolution < 300) {
        message += '\n• Resolution is ' + document.resolution + '.'
    }
    if (document.bitsPerChannel !== BitsPerChannelType.EIGHT) {
        message += '\n• Bits per channel is ' + document.bitsPerChannel.toString().substringAfter('.') + '.'
    }

    if (message.includes('\n')) {
        allOkay = false
        app.activeDocument = document
        alert(message, 'Pre-Flight', true)
    }
}
if (allOkay) {
    alert('No issues found in all documents.', 'Pre-Flight')
}