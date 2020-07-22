#target Illustrator
#include '.lib/preconditions.jsx'

checkActiveDocument()

var document = app.activeDocument

var dialog = new Window('dialog', 'Close other tabs')

dialog.radioGroup = dialog.add('group')
dialog.radioGroup.alignChildren = 'fill'
dialog.radioGroup.orientation = 'column'
dialog.ignoreRadio = dialog.radioGroup.add('radiobutton', undefined, "Ignore changes")
dialog.ignoreRadio.value = true
dialog.promptRadio = dialog.radioGroup.add('radiobutton', undefined, "Prompt each tab")
dialog.saveRadio = dialog.radioGroup.add('radiobutton', undefined, "Save changes")

dialog.buttonGroup = dialog.add('group')
dialog.buttonGroup.alignment = 'right'
dialog.buttonGroup.add('button', undefined, 'Cancel')
dialog.buttonGroup.add('button', undefined, 'OK').onClick = function() {
    var options
    if (dialog.ignoreRadio.value) {
        options = SaveOptions.DONOTSAVECHANGES
    } else if (dialog.promptRadio.value) {
        options = SaveOptions.PROMPTTOSAVECHANGES
    } else {
        options = SaveOptions.SAVECHANGES
    }

    for (var i = 0; i < app.documents.length; i++) {
        if (app.documents[i] == document) {
            continue
        }
        documents[i].close(options)
        i--
    }

    dialog.close()
}

dialog.show()