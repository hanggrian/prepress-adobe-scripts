/**
 * Commons are related to libraries using `Document` reference.
 */

#include 'core.js'

check(app.documents.length > 0, 'No active document')

var document = app.activeDocument