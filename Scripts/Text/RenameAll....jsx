#target Illustrator
#include '../.lib/preconditions.js'

checkActiveDocument()

var document = app.activeDocument

var dialog = new Window('dialog', 'Rename all')
dialog.alignChildren = 'fill'

var textBounds = [0, 0, 90, 21]
var editSmallBounds = [0, 0, 80, 21]
var editLargeBounds = [0, 0, 200, 21]

dialog.buttons = dialog.add('group')
dialog.buttons.alignment = 'right'
dialog.buttons.add('button', undefined, 'Cancel')
dialog.buttons.add('button', undefined, 'OK').onClick = function() {
    dialog.close()
}

dialog.show()
