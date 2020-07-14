/**
 * Create trim masks with custom size around the selected path item.
 * The marks are created with clockwise ordering.
 * The selected item will be deleted afterwards.
 */

#target Illustrator
#include '../util/preconditions.jsx'
#include '../util/units.jsx'
#include '../util/trim_marks.jsx'

checkActiveDocument()

const document = app.activeDocument
const selection = document.selection

checkSingleSelection(selection)

const selectedItem = selection[0]

checkTypename(selectedItem, 'PathItem')

const dialog = new Window('dialog', 'Custom trim marks')
const leftBounds = [0, 0, 40, 21]
const rightBounds = [0, 0, 113, 21] // matches Rectangle dialog

dialog.bleedGroup = dialog.add('group')
dialog.bleedText = dialog.bleedGroup.add('statictext', leftBounds, 'Bleed:')
dialog.bleedText.justify = 'right'
dialog.bleedEdit = dialog.bleedGroup.add('edittext', rightBounds, '2.5mm')
dialog.bleedEdit.active = true

dialog.markGroup = dialog.add('group')
dialog.markText = dialog.markGroup.add('statictext', leftBounds, 'Mark:')
dialog.markText.justify = 'right'
dialog.markEdit = dialog.markGroup.add('edittext', rightBounds, '2.5mm')

dialog.buttonGroup = dialog.add('group')
dialog.buttonGroup.add('button', undefined, 'Cancel')
dialog.okButton = dialog.buttonGroup.add('button', undefined, 'OK')
dialog.okButton.onClick = function() {
    createTrimMarks(
        selectedItem,
        parseUnit(dialog.bleedEdit.text),
        parseUnit(dialog.markEdit.text),
        MARK_ALL
    )
    selectedItem.remove()
    dialog.close()
}

dialog.show()