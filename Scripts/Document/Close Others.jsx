/**
 * Close other tabs without saving.
 */

#target Illustrator
#include '../.lib/commons.js'

check(app.documents.length != 1, 'No other tabs')

for (var i = 0; i < app.documents.length; i++) {
    if (app.documents[i] == app.activeDocument) {
        continue
    }
    documents[i].close(SaveOptions.DONOTSAVECHANGES)
    i--
}