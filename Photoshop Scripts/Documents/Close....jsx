/*
<javascriptresource>
<name>Close Documents...</name>
<category>4</category>
<enableinfo>true</enableinfo>
</javascriptresource>
*/

#target Photoshop
#include '../.lib/commons.js'

var unsavedLength = 0
for (var i = 0; i < app.documents.length; i++) {
  if (!app.documents[i].saved) {
    unsavedLength++
  }
}

var dialog = new AlertDialog('Close Documents', 'There are {0} documents, {1} of them unsaved. Close them without saving?'
  .format(app.documents.length, unsavedLength > 0 ? unsavedLength : 'none'))
dialog.setCancelButton()
dialog.setDefaultButton('All', function() {
  for (var i = 0; i < app.documents.length; i++) {
    app.documents[i].close(SaveOptions.DONOTSAVECHANGES)
    i--
  }
})
dialog.setYesButton('Others', function() {
  // in Photoshop, compare documents
  for (var i = 0; i < app.documents.length; i++) {
    if (app.documents[i] === document) {
      continue
    }
    app.documents[i].close(SaveOptions.DONOTSAVECHANGES)
    i--
  }
})
dialog.setHelpButton('Keep Unsaved', function() {
  for (var i = 0; i < app.documents.length; i++) {
    if (!app.documents[i].saved) {
      continue
    }
    app.documents[i].close(SaveOptions.DONOTSAVECHANGES)
    i--
  }
}, unsavedLength === 0)
dialog.show()