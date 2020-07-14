/**
 * Add the same item multiple times according to user input.
 */

#target Illustrator
#include "../preconditions.jsx"
#include '../units.jsx'

checkActiveDocument()

const document = app.activeDocument
const selection = document.selection

checkSingleSelection(selection)

const selectedItem = selection[0]
const width = selectedItem.width
const height = selectedItem.height
const x = selectedItem.position[0]
const y = selectedItem.position[1]

const dialog = new Window('dialog', 'Multiply objects')

dialog.multiplicationPanel = dialog.add('panel', undefined, 'Multiplication')
const multiplicationLeftBounds = [0, 0, 70, 21]
const multiplicationRightBounds = [0, 0, 60, 21]

dialog.horizontalGroup = dialog.multiplicationPanel.add('group')
dialog.horizontalText = dialog.horizontalGroup.add('statictext', multiplicationLeftBounds, 'Horizontal:')
dialog.horizontalText.justify = 'right'
dialog.horizontalEdit = dialog.horizontalGroup.add('edittext', multiplicationRightBounds)
dialog.horizontalEdit.active = true

dialog.verticalGroup = dialog.multiplicationPanel.add('group')
dialog.verticalText = dialog.verticalGroup.add('statictext', multiplicationLeftBounds, 'Vertical:')
dialog.verticalText.justify = 'right'
dialog.verticalEdit = dialog.verticalGroup.add('edittext', multiplicationRightBounds)

dialog.trimPanel = dialog.add('panel', undefined, 'Trim marks')
const trimLeftBounds = [0, 0, 40, 21]
const trimRightBounds = [0, 0, 113, 21] // matches Rectangle dialog

dialog.bleedGroup = dialog.trimPanel.add('group')
dialog.bleedText = dialog.bleedGroup.add('statictext', trimLeftBounds, 'Bleed:')
dialog.bleedText.justify = 'right'
dialog.bleedEdit = dialog.bleedGroup.add('edittext', trimRightBounds, '2.5mm')

dialog.markGroup = dialog.trimPanel.add('group')
dialog.markText = dialog.markGroup.add('statictext', trimLeftBounds, 'Mark:')
dialog.markText.justify = 'right'
dialog.markEdit = dialog.markGroup.add('edittext', trimRightBounds, '2.5mm')

dialog.buttonGroup = dialog.add('group')
dialog.cancelButton = dialog.buttonGroup.add('button', undefined, 'Cancel')
dialog.okButton = dialog.buttonGroup.add('button', undefined, 'OK')
dialog.okButton.onClick = function() {
    app.copy()
    const bleed = parseUnit(dialog.bleedEdit.text)
    const mark = parseUnit(dialog.markEdit.text)

    for (var i = 1; i <= parseInt(dialog.horizontalEdit.text); i++) {
        app.paste()
        selection[0].position = [x + i * (width + bleed), y]
    }

    for (var i = 0; i < parseInt(dialog.verticalEdit.text); i++) {
        
    }

    dialog.close()
}

dialog.show()