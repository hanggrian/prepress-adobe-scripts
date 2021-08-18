#target Illustrator
#include '../.lib/commons.js'

check(app.documents.length !== 1, 'No other documents')

var unsavedLength = 0
for (var i = 0; i < app.documents.length; i++) {
    if (!app.documents[i].saved) {
        unsavedLength++
    }
}

var dialog = new AlertDialog('Close Documents', 'There are {0} documents, {1} of them unsaved. Close without saving?'
    .format(app.documents.length, unsavedLength > 0 ? unsavedLength : 'none'))
dialog.setCancelButton()
dialog.setDefaultButton('All', function() {
    for (var i = 0; i < app.documents.length; i++) {
        app.documents[i].close(SaveOptions.DONOTSAVECHANGES)
        i--
    }
})
dialog.setYesButton('Others', function() {
    // in Illustrator, active document index is always 0
    for (var i = 1; i < app.documents.length; i++) {
        app.documents[i].close(SaveOptions.DONOTSAVECHANGES)
        i--
    }
})
dialog.setHelpButton('Saved', function() {
    for (var i = 0; i < app.documents.length; i++) {
        if (!app.documents[i].saved) {
            continue
        }
        app.documents[i].close(SaveOptions.DONOTSAVECHANGES)
        i--
    }
}, unsavedLength === 0)
dialog.show()