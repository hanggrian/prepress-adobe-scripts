/**
 * When confirmed, close other tabs without saving.
 */

#target Illustrator
#include '.lib/preconditions.js'

checkActiveDocument()
if (app.documents.length == 1) {
    throw 'No other tabs'
}

var document = app.activeDocument

if (Window.confirm('Close all other documents without saving?', undefined, 'Close other tabs')) {
    for (var i = 0; i < app.documents.length; i++) {
        if (app.documents[i] == document) {
            continue
        }
        documents[i].close(SaveOptions.DONOTSAVECHANGES)
        i--
    }
}