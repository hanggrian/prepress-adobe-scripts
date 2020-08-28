/**
 * When confirmed, close other tabs without saving.
 */

#target Illustrator
#include '.lib/core.js'

check(app.documents.length > 1, 'No other tabs')

if (confirm('Close all other documents without saving?', undefined, 'Close other tabs')) {
    for (var i = 0; i < app.documents.length; i++) {
        if (app.documents[i] == document) {
            continue
        }
        documents[i].close(SaveOptions.DONOTSAVECHANGES)
        i--
    }
}