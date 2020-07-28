#target Illustrator
#include '.lib/preconditions.jsx'

checkActiveDocument()

if (app.documents.length == 1) {
    throw 'No other tabs'
}

var document = app.activeDocument

var dialog = new Window('dialog', 'Close other tabs')

dialog.radio = dialog.add('group')
dialog.radio.alignChildren = 'fill'
dialog.radio.orientation = 'column'
var ignoreRadio = dialog.radio.add('radiobutton', undefined, 'Ignore changes')
ignoreRadio.value = true
var promptRadio = dialog.radio.add('radiobutton', undefined, 'Prompt each tab')
var saveRadio = dialog.radio.add('radiobutton', undefined, 'Save changes')

dialog.buttons = dialog.add('group')
dialog.buttons.alignment = 'right'
dialog.buttons.add('button', undefined, 'Cancel')
dialog.buttons.add('button', undefined, 'OK').onClick = function() {
    dialog.close()

    var options
    if (ignoreRadio.value) {
        options = SaveOptions.DONOTSAVECHANGES
    } else if (promptRadio.value) {
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
}

dialog.show()