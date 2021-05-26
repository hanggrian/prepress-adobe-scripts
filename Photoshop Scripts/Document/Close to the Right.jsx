// Close tabs to the right without saving.
// This function is impossible to implement on Illustrator because:
// * the first index is always active document.
// * next index is document to the left of active document.
// * no way to know actual position of active document.

/*
<javascriptresource>
<category>3</category>
</javascriptresource>
*/

#target Photoshop
#include '../.lib/commons.js'

check(app.documents.length != 1, 'No other documents')

var documentIndex
for (var i = 0; i < app.documents.length; i++) {
    if (app.documents[i] === document) {
        documentIndex = i
        break
    }
}

if (confirm('Close all documents to the right without saving?', undefined, 'Close to the Right')) {
    for (var i = documentIndex + 1; i < app.documents.length; i++) {
        app.documents[i].close(SaveOptions.DONOTSAVECHANGES)
        i--
    }
}