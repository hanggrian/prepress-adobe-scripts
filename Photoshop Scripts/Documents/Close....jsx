/*
<javascriptresource>
<name>Close Documents...</name>
<category>4</category>
<enableinfo>true</enableinfo>
</javascriptresource>
*/

#target Photoshop
#include "../.lib/commons.js"

var unsavedLength = Collections.filter(app.documents, function(it) { return !it.saved }).length

var dialog = new AlertDialog(R.string.close_documents, getString(R.string.confirm_closedocuments,
  app.documents.length, unsavedLength > 0 ? unsavedLength : "none"))
dialog.setCancelButton()
dialog.setDefaultButton(R.string.all, function() {
  for (var i = 0; i < app.documents.length; i++) {
    app.documents[i].close(SaveOptions.DONOTSAVECHANGES)
    i--
  }
})
dialog.setYesButton(R.string.others, function() {
  in Photoshop, compare documents
  for (var i = 0; i < app.documents.length; i++) {
    if (app.documents[i] === document) {
      continue
    }
    app.documents[i].close(SaveOptions.DONOTSAVECHANGES)
    i--
  }
})
dialog.yesButton.enabled = app.documents.length > 1
dialog.setHelpButton(R.string.keep_unsaved, function() {
  for (var i = 0; i < app.documents.length; i++) {
    if (!app.documents[i].saved) {
      continue
    }
    app.documents[i].close(SaveOptions.DONOTSAVECHANGES)
    i--
  }
})
dialog.helpButton.enabled = app.documents.length > 1 && unsavedLength > 0
dialog.show()
