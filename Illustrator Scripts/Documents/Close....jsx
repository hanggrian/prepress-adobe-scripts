#target Illustrator
#include "../.lib/commons.js"

var unsavedLength = Collections.filter(app.documents, function(it) { return !it.saved }).length

var dialog = new AlertDialog("Close Documents", "There are %d documents, %d of them unsaved. Close without saving?"
  .format(app.documents.length, unsavedLength > 0 ? unsavedLength : "none"))
dialog.setCancelButton()
dialog.setDefaultButton("All", function() {
  for (var i = 0; i < app.documents.length; i++) {
    app.documents[i].close(SaveOptions.DONOTSAVECHANGES)
    i--
  }
})
dialog.setYesButton("Others", function() {
  // in Illustrator, active document index is always 0
  for (var i = 1; i < app.documents.length; i++) {
    app.documents[i].close(SaveOptions.DONOTSAVECHANGES)
    i--
  }
}, app.documents.length === 1)
dialog.setHelpButton("Keep Unsaved", function() {
  for (var i = 0; i < app.documents.length; i++) {
    if (!app.documents[i].saved) {
      continue
    }
    app.documents[i].close(SaveOptions.DONOTSAVECHANGES)
    i--
  }
}, app.documents.length === 1 || unsavedLength === 0)
dialog.show()
